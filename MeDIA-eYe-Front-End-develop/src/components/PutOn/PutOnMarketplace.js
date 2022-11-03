import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import PutOnBlock from './PutOnBlock/PutOnBlock';
import { Link } from 'react-router-dom';
import ReactTooltip from 'react-tooltip';
import { useMoralis } from 'react-moralis';
import { ExploreBlockPlug } from '../Icons/Plugs';
import { useDispatch } from 'react-redux';
import { toggleGeneralPopup } from '../../store/app/appSlice';
import Loader from '../Loader/Loader';
import { useMoralisWeb3Api } from 'react-moralis';
import { ChainHexString } from '../../blockchain/functions/ChangeChain/ChainHexStrings';
import { queryNFT } from '../../blockchain/functions/Account';

const PutOnMarketplace = (props) => {
  const dispatch = useDispatch();
  const activeNetwork = useSelector((state) => state.app.activeNetwork);
  const { user, Moralis } = useMoralis();
  const [activeImages, setActiveImages] = useState([]);
  const [search, setSearch] = useState('');
  const [disabledButton, setDisabledButton] = useState(false);
  const [owned, setOwned] = useState([]);
  const [assetData, setAssetData] = useState([]);
  const [fixedButtons, setFixedButtons] = useState(true);
  const [errorMessageSingl, setErrorMessageSingl] = useState(
    'Available only for one NFT'
  );
  const [errorMessageBunding, setErrorMessageBunding] = useState(
    'Available only for two or more NFTs that were created by you'
  );
  const PAGE_LIMIT = 8;
  const [page, setPage] = useState(0);
  const [loadMore, setLoadMore] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const Web3Api = useMoralisWeb3Api();

  const fetchOwnedNFTs = async () => {
    if (!activeNetwork) return;
    const options = {
      address: user?.attributes?.ethAddress,
      chain: ChainHexString(activeNetwork)
    };
    let userNFTs = await Web3Api.account.getNFTs(options);
    let validNFTs = [];
    let validCollections = []; // get unique collections to pass to Moralis
    for (let i = 0; i < userNFTs.result.length; i++) {
      if (userNFTs.result[i].metadata) {
        validNFTs.push(userNFTs.result[i]);
        if (!validCollections.includes(userNFTs.result[i].token_address)) {
          validCollections.push(userNFTs.result[i].token_address);
        }
      } else {
        /*
        try {
          const dbNFT = await queryNFT(Moralis, {
            colAddress: userNFTs.result[i].token_address,
            tokenId: userNFTs.result[i].token_id,
            chainId: ChainHexString(activeNetwork)
          });
          if (dbNFT) {
            validNFTs.push({
              amount: userNFTs.result[i].amount,
              token_address: dbNFT.attributes.collectionAddress,
              token_id: dbNFT.attributes.tokenId,
              metadata: JSON.stringify({
                name: dbNFT.attributes.name,
                image: dbNFT.attributes.image,
                animation_url: dbNFT?.attributes?.animation_url
              })
            });
            if (!validCollections.includes(userNFTs.result[i].token_address)) {
              validCollections.push(userNFTs.result[i].token_address);
            }
          }
        } catch (e) {
          console.log(e);
        }
        */
      }
    }
    setOwned(validNFTs);
    setLoading(false);
    // get list of collections and add new ones to moralis
    Moralis.Cloud.run('identifyNewCollections', {
      collections: validCollections,
      chainId: ChainHexString(activeNetwork)
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (user && activeNetwork) {
      //queryOwnedList();
      fetchOwnedNFTs();
    }
  }, [activeNetwork, user, page]);

  const handleScroll = (e) => {
    let offset;
    if (window.screen.width > 575) {
      offset = 250;
    } else {
      offset = 550;
    }
    if (
      document.body.clientHeight <
      window.scrollY + window.innerHeight + offset
    ) {
      setFixedButtons(false);
    }
    if (
      document.body.clientHeight >
      window.scrollY + window.innerHeight + offset
    ) {
      setFixedButtons(true);
    }
  };

  useEffect(() => {
    let arr = activeImages.slice();
    let ifCrerator = arr.some((val) => val?.creator === false);
    if (activeImages.length === 1) {
      setErrorMessageSingl(null);
      setErrorMessageBunding(
        'Available only for two or more NFTs that were created by you'
      );
      setDisabledButton(true);
    } else if (activeImages.length < 1) {
      setDisabledButton(true);
      setErrorMessageBunding(
        'Available only for two or more NFTs that were created by you'
      );
      setErrorMessageSingl('Available only for one NFT');
    } else if ((activeImages.length > 1) & ifCrerator) {
      setDisabledButton(true);
      setErrorMessageBunding(
        'Available only for NFTs that were created by you'
      );
      setErrorMessageSingl('Available only for one NFT');
    } else {
      setErrorMessageBunding(null);
      setDisabledButton(false);
      setErrorMessageSingl('Available only for one NFT');
    }
    if (activeImages.length > 10) {
      dispatch(
        toggleGeneralPopup({
          status: 'error',
          message: 'Please Select no more than 10 NFTs',
          textButton: 'OK',
          size: 'sm'
        })
      );
    }
  }, [activeImages]);

  useEffect(() => {
    ReactTooltip.rebuild();
  }, [errorMessageBunding]);

  useEffect(() => {
    ReactTooltip.rebuild();
  }, [errorMessageSingl]);

  const addImage = (e, address, tokenId, totalOwned) => {
    let id = e.target.id;
    let activeImage;
    let arr = activeImages.slice();

    if (e.target.checked === true && activeImages.length < 10) {
      activeImage = owned.find(
        (val) => val.token_address === address && val.token_id === tokenId
      );

      // add totalOwned to image
      activeImage.totalOwned = totalOwned;
      if (user?.attributes?.subscriptionLevel > 0) {
        arr.push(activeImage);
      } else {
        arr = [activeImage];
        if (activeImages?.length > 0) {
          dispatch(
            toggleGeneralPopup({
              status: 'info',
              message: 'Level 1 or Level 2 Subscription required for Bundling',
              textButton: 'OK',
              autoClose: 'false',
              size: 'sm'
            })
          );
        }
      }
      setActiveImages(arr);
    } else {
      if (activeImages.length >= 10) {
        dispatch(
          toggleGeneralPopup({
            status: 'error',
            message: 'Please select no more than 10 NFTs',
            textButton: 'OK',
            size: 'sm'
          })
        );
      }
      let filterArr = arr.filter(
        (val) => !(val.token_address === address && val.token_id === tokenId)
      );
      setActiveImages(filterArr);
    }
  };

  const searchChange = () => {
    const value = search.trim().toLowerCase();
    const currentList = owned.filter((asset) =>
      asset.attributes.nft.attributes.name.toLowerCase().includes(value)
    );

    if (value === '') {
      return setOwned(assetData);
    }

    if (currentList.length > 0) {
      return setOwned(currentList);
    }
    return setOwned([]);
  };

  useEffect(async () => {
    searchChange();
  }, [search]);

  const handlePagination = () => {
    setPage(page + 1);
  };

  return (
    <div className="marketplace-page-inner">
      <div className="mediaeye-layout-middle">
        <div className="mediaeye-layout-container">
          <div className="mediaeye-layout-container-header">
            <div className="mediaeye-layout-container-header-heading">
              <h2>List Your NFTs on Marketplace</h2>
            </div>
          </div>
        </div>
        <section className="mediaeye-layout-section withspace">
          <div className="mediaeye-layout-container">
            <div className="mediaeye-marketplace-row">
              {!isLoading && (!owned || owned.length === 0) ? (
                <>
                  <ExploreBlockPlug />
                  <ExploreBlockPlug />
                  <ExploreBlockPlug />
                  <ExploreBlockPlug />
                </>
              ) : null}

              {owned.map((owned, i) => (
                <PutOnBlock
                  product={owned}
                  selectedCard={activeImages}
                  key={i}
                  addImage={addImage}
                />
              ))}
            </div>
            {isLoading ? <Loader className="text-center" /> : null}
            {owned.length >= PAGE_LIMIT && loadMore ? (
              <div className="text-center m-t-20">
                <button
                  onClick={handlePagination}
                  className="btn btn-info btn-sm btn-more"
                >
                  {' '}
                  Load More
                </button>
              </div>
            ) : null}
          </div>
        </section>
      </div>
      <div
        className={
          fixedButtons ? 'mediaeyepage-bottom isfixed' : 'mediaeyepage-bottom'
        }
      >
        <div className="mediaeye-layout-container">
          <div className="mediaeyepage-bottom-inner">
            <div className="mediaeyepage-bottom-inner-item">
              {activeImages.length === 1 ? (
                <Link
                  className="btn btn-lg btn-single"
                  to={{
                    pathname: '/submit-to-marketplace/create',
                    state: { activeImages }
                  }}
                >
                  SINGLE
                </Link>
              ) : (
                <button type="button" className="btn btn-lg btn-disable">
                  SINGLE
                </button>
              )}
            </div>
            <div className="mediaeyepage-bottom-inner-item">
              {disabledButton ? (
                <button type="button" className="btn btn-lg btn-disable">
                  BUNDLE
                </button>
              ) : activeImages.length <= 10 ? (
                <Link
                  className="btn btn-lg btn-bundle"
                  onClick={(e) => {
                    if (activeImages.length > 10) {
                      dispatch(
                        toggleGeneralPopup({
                          status: 'error',
                          message: 'Please select no more than 10 NFTs',
                          textButton: 'OK',
                          size: 'sm'
                        })
                      );

                      e.preventDefault();
                    } else {
                      dispatch(
                        toggleGeneralPopup({
                          status: 'info',
                          message:
                            'Note that if you want to create a bundle, both NFTs need to have the same royalty rate so they can be approved',
                          textButton: 'OK',
                          size: 'sm'
                        })
                      );
                    }
                  }}
                  to={{
                    pathname: '/submit-to-marketplace/create',
                    state: { activeImages }
                  }}
                >
                  BUNDLE
                </Link>
              ) : (
                <button type="button" className="btn btn-lg btn-disable">
                  BUNDLE
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PutOnMarketplace;
