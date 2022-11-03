import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { useMoralis } from 'react-moralis';
import { useHistory } from 'react-router-dom';
import {
  ContractAddress,
  TokenName,
  ZERO_ADDRESS
} from '../../../blockchain/functions/Addresses';
import {
  claimOffer,
  queryListingFloorByNft,
  queryOffers
} from '../../../blockchain/functions/Marketplace';
import formatAdddress from '../../../utils/formatAdddress';
import { ChainHexString } from '../../../blockchain/functions/ChangeChain/ChainHexStrings';
import ChangeChainRequest from '../../../blockchain/functions/ChangeChain/ChangeChainRequest';
import { useDispatch, useSelector } from 'react-redux';
import {
  closeGeneralPopup,
  toggleGeneralPopup
} from '../../../store/app/appSlice';
import { queryFloorPrice } from '../../../blockchain/functions/Collection';
import { convertPrice, roundString } from '../../../blockchain/functions/Utils';
import { ethers } from 'ethers';
import {
  checkNFTApproval,
  requestNFTApproval
} from '../../../blockchain/functions/ApproveToken';
import { ChainScanerLink } from '../../../blockchain/functions/ChangeChain/ChainNames';

export const ProductOffers = (props) => {
  const { nft, selfOwner } = props;
  const activeNetwork = useSelector((state) => state.app.activeNetwork);
  const { Moralis, user, isInitialized, web3 } = useMoralis();
  const dispatch = useDispatch();
  const [approved, setApproved] = useState(false);
  const [offers, setOffers] = useState([]);
  const [offersNativePrice, setOffersNativePrice] = useState([]);
  const [floorPrice, setFloorPrice] = useState();
  let history = useHistory();
  const getOffers = async () => {
    const result = await queryOffers(Moralis, nft.id);
    // sort offers by price in native
    let offersResult = [];
    let nativePrices = [];
    let combinedArray = []; // for sorting later
    for (let i = 0; i < result.length; i++) {
      let priceInNative = result[i].attributes.price;
      const paymentMethod = result[i].attributes.paymentMethod;
      // convert if needed
      if (paymentMethod !== ZERO_ADDRESS) {
        const params = {
          chainId: nft.chainId,
          price: priceInNative,
          token: TokenName(paymentMethod, nft.chainId),
          native: true
        };
        priceInNative = await convertPrice(Moralis, params);
      }
      nativePrices.push(priceInNative);
      combinedArray.push({ offer: result[i], price: priceInNative });
    }
    // sort offers by descending price
    combinedArray.sort((a, b) => b.price - a.price);
    for (let j = 0; j < combinedArray.length; j++) {
      offersResult.push(combinedArray[j].offer);
      nativePrices[j] = combinedArray[j].price;
    }
    setOffers(offersResult);
    setOffersNativePrice(nativePrices);
  };

  const checkApproved = async () => {
    // check if the amount for token is approved
    let isApproved = await checkNFTApproval(
      Moralis,
      user.attributes.ethAddress,
      nft.collectionType,
      nft.collectionAddress,
      2,
      dispatch
    );
    setApproved(isApproved);
  };

  const getNftFloorPrice = async () => {
    // if there is listing, get floor price by listing
    const listingFloor = await queryListingFloorByNft(Moralis, nft.id);
    if (listingFloor === '0') {
      // if not, get floor price by collection
      const collectionFloor = await queryFloorPrice(
        Moralis,
        nft.collectionAddress,
        nft.chainId
      );
      if (collectionFloor !== '0') setFloorPrice(collectionFloor);
    } else {
      setFloorPrice(listingFloor);
    }
  };

  useEffect(() => {
    if (isInitialized && nft) {
      getOffers();
      getNftFloorPrice();
    }
  }, [isInitialized, nft]);

  useEffect(() => {
    if (
      Moralis.provider &&
      nft &&
      user &&
      selfOwner &&
      ChainHexString(activeNetwork) === nft.chainId
    ) {
      checkApproved();
    }
  }, [web3, nft, user, selfOwner]);

  const getFloorDiff = (offerIndex) => {
    if (floorPrice) {
      // find percentage diff in native
      const priceInNative = offersNativePrice[offerIndex];
      const diff = (Number(priceInNative) / Number(floorPrice) - 1) * 100;
      let diffString = roundString(String(diff), 2);
      if (diff < 0) diffString = diffString.slice(1).concat('% below');
      else diffString = diffString.concat('% above');
      return diffString;
    } else return '---';
  };

  const getExpiryDiff = (dateInSeconds) => {
    const currentTime = moment(Date.now());
    const expiryTime = moment(Number(dateInSeconds.concat('000')));
    const timeDifference = expiryTime.diff(currentTime);
    return moment.duration(timeDifference).humanize(true);
  };

  const handleApproveToken = async () => {
    dispatch(
      toggleGeneralPopup({
        status: 'loading',
        message: 'Processing...',
        size: 'xs',
        autoClose: 'false'
      })
    );
    try {
      const isApproved = await requestNFTApproval(
        Moralis,
        nft.collectionType,
        nft.collectionAddress,
        2
      );
      dispatch(closeGeneralPopup());
      if (isApproved?.status) {
        setApproved(true);
        dispatch(
          toggleGeneralPopup({
            status: 'success',
            title: 'Transaction Successful',
            message: 'For more details view:',
            size: 'sm',
            copyText: isApproved?.transactionHash,
            copyTextLink:
              ChainScanerLink(nft.chainId) +
              '/tx/' +
              isApproved?.transactionHash,
            textButton: 'OK',
            autoClose: 'false'
          })
        );
      } else {
        setApproved(false);
        dispatch(
          toggleGeneralPopup({
            status: 'error',
            title: 'Token Approve Failed',
            message: isApproved?.data?.message
              ? isApproved.data.message
              : isApproved.message
              ? isApproved.message
              : 'Something went wrong. Try again',
            size: 'sm',
            textButton: 'OK'
          })
        );
      }
    } catch (error) {
      dispatch(closeGeneralPopup());
      dispatch(
        toggleGeneralPopup({
          status: 'error',
          message: error?.data?.message ? error.data.message : error.message,
          size: 'sm',
          textButton: 'OK'
        })
      );
    }
  };

  const handleClaimOffer = async (i) => {
    // request switch chain if not on correct
    if (ChainHexString(activeNetwork) !== nft.chainId) {
      ChangeChainRequest(nft.chainId);
    }
    const offer = offers[i];
    // check if approved
    if (approved) {
      dispatch(
        toggleGeneralPopup({
          status: 'loading',
          message: 'Processing...',
          size: 'xs'
        })
      );
      try {
        const result = await claimOffer(Moralis, offer);

        dispatch(closeGeneralPopup());
        if (result?.status) {
          dispatch(
            toggleGeneralPopup({
              status: 'success',
              title: 'Transition is successful',
              message: 'For more details view:',
              size: 'sm',
              copyText: result?.transactionHash,
              copyTextLink:
                ChainScanerLink(nft?.chainId) +
                '/tx/' +
                result?.transactionHash,
              textButton: 'OK',
              autoClose: 'false'
            })
          );
          history.push('/refresh');
        } else {
          if (result?.code === -32603 && result?.data?.code === -32000) {
            dispatch(
              toggleGeneralPopup({
                status: 'error',
                message: 'Metamask Insufficient Balance for Purchase',
                size: 'sm',
                textButton: 'OK'
              })
            );
          } else {
            dispatch(
              toggleGeneralPopup({
                status: 'error',
                message: result?.data?.message
                  ? result.data.message
                  : result.message
                  ? result.message
                  : 'Something went wrong. Try again',
                size: 'sm',
                textButton: 'OK'
              })
            );
          }
        }
      } catch (result) {
        if (result?.code === -32603 && result?.data?.code === -32000) {
          dispatch(
            toggleGeneralPopup({
              status: 'error',
              message: 'Metamask Insufficient Balance for Purchase',
              size: 'sm',
              textButton: 'OK'
            })
          );
        } else {
          dispatch(
            toggleGeneralPopup({
              status: 'error',
              message: result?.data?.message
                ? result.data.message
                : result.message
                ? result.message
                : 'Something went wrong. Try again',
              size: 'sm',
              textButton: 'OK'
            })
          );
        }
      }
    }
  };

  return (
    <>
      <table>
        <thead>
          <tr>
            <th>Unit Price</th>
            <th>Floor</th>
            <th>Expiration</th>
            <th colSpan={selfOwner ? 2 : 1}>From</th>
          </tr>
        </thead>
        {offers?.length === 0 ? (
          <tbody>
            <tr>
              <td className="text-center" colSpan={selfOwner ? 5 : 4}>
                No Offers Yet
              </td>
            </tr>
          </tbody>
        ) : (
          <tbody>
            {offers &&
              offers.map((offer, i) => {
                const price = Moralis.Units.FromWei(offer.attributes.price);
                const priceType = TokenName(
                  offer.attributes.paymentMethod.toLowerCase(),
                  nft.chainId
                );
                const floorDifference = getFloorDiff(i);
                const expiryDifference = getExpiryDiff(offer.attributes.expiry);
                const offerer = formatAdddress(offer.attributes.offerer);
                return (
                  <tr key={i}>
                    <td>
                      <div className="product-page-inner-tabscard-price">
                        <img
                          src={'/img/token/34/' + priceType + '.png'}
                          alt={priceType}
                          className="product-page-inner-content-info-blockchain-icon"
                        />{' '}
                        {price}
                        &nbsp; {priceType}
                      </div>
                    </td>
                    <td className=" text-link">{floorDifference}</td>
                    <td className="text-link">{expiryDifference}</td>
                    <td>{offerer}</td>
                    {selfOwner ? (
                      <td className="text-action">
                        <div
                          className="mediaeye-link cursor-pointer"
                          value={i}
                          onClick={(e) => {
                            if (approved) handleClaimOffer(e.target.value);
                            else handleApproveToken();
                          }}
                        >
                          {approved ? 'Accept' : 'Approve'}
                        </div>
                      </td>
                    ) : null}
                  </tr>
                );
              })}
          </tbody>
        )}
      </table>
    </>
  );
};

export default ProductOffers;
