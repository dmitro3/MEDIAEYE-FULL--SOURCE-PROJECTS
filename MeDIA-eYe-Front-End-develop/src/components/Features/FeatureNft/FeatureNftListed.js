import React, { useEffect, useState } from 'react';
import ExploreBlock from '../../ContentMarketplace/ExploreBlock/ExploreBlock';
import { useMoralisWeb3Api, useMoralis } from 'react-moralis';
import { useSelector } from 'react-redux';
import { ChainHexString } from '../../../blockchain/functions/ChangeChain/ChainHexStrings';
import { TokenAddress } from '../../../blockchain/functions/Addresses';
import { roundString } from '../../../blockchain/functions/Utils';
import { queryFeaturedNFTListings } from '../../../blockchain/functions/Feature/QueryFeaturedNFTListings';
import { formatListingNFT } from '../../../utils/FormatListingNFT';

export default function FeatureNftListed(props) {
  const { checkOwner } = props;
  const [userNFTs, setUserNFTs] = useState([]);
  const Web3Api = useMoralisWeb3Api();
  const { Moralis, user, isInitialized } = useMoralis();
  const activeNetwork = useSelector((state) => state.app.activeNetwork);
  const [eyeBalance, setEyeBalance] = useState(null);

  useEffect(() => {
    async function getNFTs(options) {
      return await Web3Api.account.getNFTs(options);
    }

    async function getFeaturedNFTs() {
      const [listings, nfts] = await queryFeaturedNFTListings(
        Moralis,
        activeNetwork,
        checkOwner
      );
      let currProducts = [];
      for (let i = 0; i < listings?.length; i++) {
        currProducts.push(formatListingNFT(listings[i], nfts[i]));
      }
      return currProducts;
    }

    if (isInitialized && user && activeNetwork) {
      const options = {
        address: user?.attributes?.ethAddress,
        chain: ChainHexString(activeNetwork)
      };
      getFeaturedNFTs().then((featured) => {
        getNFTs(options).then((nfts) => {
          let result = nfts.result;
          featured.map((feature) => {
            let collectionAddress = feature?.attributes?.collectionAddress;
            let tokenId = feature?.attributes?.tokenId;
            result = result.filter(
              (nft) =>
                nft.token_address !== collectionAddress &&
                nft.token_id !== tokenId
            );
          });
          setUserNFTs(result);
        });
      });
    }
  }, [user, activeNetwork, isInitialized]);

  // useEffect(() => {
  //   const getBalances = async () => {
  //     // const web3 = await Moralis.enableWeb3();
  //     const chainHex = activeNetwork;
  //     const payload = { chain: activeNetwork.toLowerCase() };
  //     const balances = await Moralis.Web3API.account.getTokenBalances(payload);

  //     const tokenAddress = TokenAddress('EYE', chainHex);
  //     const eyeBalance = balances.find(
  //       (token) => token.token_address === tokenAddress.toLowerCase()
  //     );
  //     if (eyeBalance) {
  //       setEyeBalance(
  //         roundString(Moralis.Units.FromWei(eyeBalance.balance), 4)
  //       );
  //     } else {
  //       setEyeBalance(0);
  //     }
  //   };
  //   if (activeNetwork) {
  //     getBalances();
  //   }
  // }, [activeNetwork]);

  return (
    <>
      {userNFTs.length === 0 ? (
        <div className="featuredCards-noData-txt">
          <span>You have no Marketplace Listings yet.</span>
        </div>
      ) : (
        <div className="mediaeye-nft-row">
          {userNFTs.map((product, i) => (
            <React.Fragment key={i}>
              {props?.selectListedNftCard ? (
                <ExploreBlock
                  Spotlight={true}
                  product={{
                    id: 'listing' + i,
                    collectionAddress: [product?.token_address],
                    collectionType: product?.contract_type,
                    description: [JSON.parse(product?.metadata)?.description],
                    title: [JSON.parse(product?.metadata)?.name],
                    img: [JSON.parse(product?.metadata)?.image],
                    seller: product?.owner_of,
                    chainId: activeNetwork,
                    tokenId: [product?.token_id],
                    size: 'single'
                  }}
                  key={i}
                  selectCard={props.selectListedNftCard}
                  selectedCard={props?.selectedCard}
                />
              ) : (
                <ExploreBlock Spotlight={true} product={product} key={i} />
              )}
            </React.Fragment>
          ))}
        </div>
      )}
    </>
  );
}
