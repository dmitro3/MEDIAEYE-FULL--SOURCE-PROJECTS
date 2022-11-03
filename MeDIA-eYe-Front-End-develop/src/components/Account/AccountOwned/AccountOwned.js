import React, { useEffect, useState, useRef } from 'react';
import './AccountOwned.scss';
import { Helmet } from 'react-helmet';
import { useMoralis } from 'react-moralis';
import { useHistory, useLocation, Link } from 'react-router-dom';
import MarketplaceBlock from '../../ContentMarketplace/MarketplaceBlock/MarketplaceBlock';
import { queryOwned } from '../../../blockchain/functions/Account/QueryOwned';
import { useSelector } from 'react-redux';
import { ChainHexString } from '../../../blockchain/functions/ChangeChain/ChainHexStrings';
import { useMoralisWeb3Api } from 'react-moralis';
import { queryNFT } from '../../../blockchain/functions/Account';
import { GetDefaultImages } from '../../../blockchain/functions/Utils';

const AccountOwned = (props) => {
  const { Moralis } = useMoralis();
  const { user, isOwner } = props;
  const [search, setSearch] = useState('');
  const [assetData, setAssetData] = useState([]);
  const [owned, setOwned] = useState([]);
  let history = useHistory();
  const activeNetwork = useSelector((state) => state.app.activeNetwork);
  const [page, setPage] = useState(0);
  const [loadMore, setLoadMore] = useState(false);
  const PAGE_LIMIT = 8;
  const [nfts, setNFTs] = useState([]);
  const [single, setSingle] = useState('Single');
  const [activeBtn, setActiveBtn] = useState('all');
  const Web3Api = useMoralisWeb3Api();
  let ListDespDataArray = nfts.map((nft, index) => JSON.parse(nft.metadata));
  let ListDesp = ListDespDataArray.map((AllList, index) => AllList.name);

  const fetchNFTs = async () => {
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
              token_address: dbNFT?.attributes?.collectionAddress,
              token_id: dbNFT?.attributes?.tokenId,
              metadata: JSON.stringify({
                name: dbNFT?.attributes?.name,
                image: dbNFT?.attributes?.image
              })
            });
            if (!validCollections.includes(userNFTs.result[i].token_address)) {
              validCollections.push(userNFTs.result[i].token_address);
            }
          }
        } catch (e) {
          console.log(e);
        }*/
        // check if nft already exists in db
        // check if metadata exists from token_id and token_address
        /*try {
          const options = {
            address: userNFTs.result[i].token_address,
            token_id: userNFTs.result[i].token_id,
            chain: activeNetwork?.toLowerCase()
          };
          const tokenIdMetadata =
            await Moralis.Web3API.token.getTokenIdMetadata(options);
          if (tokenIdMetadata.metadata) {
            validNFTs.push(tokenIdMetadata);
          }
        } catch (e) {
          console.log(e);
        }*/
        // fetch data from ipfs url
        /* try {
          const reso = await fetch(userNFTs.result[i].token_uri, {
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json'
            }
          });
          console.log(await reso.json());
        } catch (e) {
          console.log(e);
        }*/
      }
    }
    setNFTs(validNFTs);
    // get list of collections and add new ones to moralis
    Moralis.Cloud.run('identifyNewCollections', {
      collections: validCollections,
      chainId: ChainHexString(activeNetwork)
    });
  };

  const showNFTs = () => {
    // TODO: check list of collections supported by database

    // only show nfts from that list
    return nfts.map((data, index) => {
      // if data field exists, parse further to get attributes/metadata
      const metadata = data?.metadata ? JSON.parse(data?.metadata) : null;
      return (
        <MarketplaceBlock
          key={index}
          count={data?.amount}
          totalTokens={data?.amount}
          owner={user?.attributes?.ethAddress}
          name={metadata?.name}
          url={metadata?.image}
          nft={{
            attributes: {
              chainId: activeNetwork?.toLowerCase(),
              collectionAddress: data?.token_address,
              tokenId: data?.token_id
            },
            contract_type: data?.contract_type
          }}
          myNft={true}
        ></MarketplaceBlock>
      );
    });
  };

  useEffect(() => {
    if (user && activeNetwork) {
      fetchNFTs();
    }
  }, [activeNetwork, user, page]);

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
    <>
      <Helmet>
        <meta
          property="og:url"
          content={
            window.location.origin +
            '/account/' +
            user?.attributes?.ethAddress +
            '/nfts'
          }
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:title"
          content={user?.attributes?.username + ' NFTs | MEDIA EYE'}
        />
        <meta
          property="og:description"
          content={user?.attributes?.username + ' ' + ListDesp.toString()}
        />
        <meta
          property="og:image"
          content={
            user?.attributes?.profileImage
              ? user.attributes.profileImage._url
              : GetDefaultImages('USER')
          }
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          property="twitter:domain"
          content={
            'mediaeyenft.com/account/' + user?.attributes?.ethAddress + '/nfts'
          }
        />
        <meta
          property="twitter:url"
          content={
            window.location.origin +
            '/account/' +
            user?.attributes?.ethAddress +
            '/nfts'
          }
        />
        <meta
          name="twitter:title"
          content={user?.attributes?.username + ' NFTs | MEDIA EYE'}
        />
        <meta
          name="twitter:description"
          content={user?.attributes?.username + ' ' + ListDesp.toString()}
        />
        <meta
          name="twitter:image"
          content={
            user?.attributes?.profileImage
              ? user.attributes.profileImage._url
              : GetDefaultImages('USER')
          }
        />
        <title>{user?.attributes?.username + ' NFTs | MEDIA EYE'}</title>
        <meta
          name="description"
          content={user?.attributes?.username + ' ' + ListDesp.toString()}
        />
      </Helmet>

      <div className="account-owned-page">
        {isOwner ? (
          <>
            <div className="account-owned-page-headerbtns">
              {nfts.length >= -1 ? (
                <>
                  <button
                    type="button"
                    className="btn btn-info"
                    onClick={() => history.push('/submit-to-marketplace')}
                  >
                    List on marketplace
                  </button>
                  <button
                    type="button"
                    className="btn btn-event"
                    onClick={() => history.push('/campaign/gallery')}
                  >
                    List on Campaign Gallery
                  </button>
                  <button
                    type="button"
                    className="btn btn-featured"
                    onClick={() => history.push('/feature-nft')}
                  >
                    Feature NFT
                  </button>
                </>
              ) : null}
              <button
                type="button"
                className="btn btn-creative"
                onClick={() => history.push('/create')}
              >
                {nfts?.length === 0 ? 'Mint Your First NFT' : 'Mint Nft'}
              </button>
            </div>
          </>
        ) : null}

        <div
          className={
            user?.attributes?.subscriptionLevel === 0
              ? 'account-owned-page-bar text-justify-right'
              : 'account-owned-page-bar text-between'
          }
        >
          <div className="account-owned-page-bar-filter filter-action-row">
            <button
              type="button"
              className={
                activeBtn === 'all'
                  ? 'filter-action-row-btn active'
                  : 'filter-action-row-btn'
              }
              id="all"
              onClick={() => setActiveBtn('all')}
            >
              All
            </button>
            <button
              type="button"
              className={
                activeBtn === 'hasOffers'
                  ? 'filter-action-row-btn active'
                  : 'filter-action-row-btn'
              }
              id="hasOffers"
              onClick={() => setActiveBtn('hasOffers')}
            >
              Has Offers
            </button>
            <button
              type="button"
              className={
                activeBtn === 'purchased'
                  ? 'filter-action-row-btn active'
                  : 'filter-action-row-btn'
              }
              id="purchased"
              onClick={() => setActiveBtn('purchased')}
            >
              Purchased
            </button>
            <button
              type="button"
              className={
                activeBtn === 'created'
                  ? 'filter-action-row-btn active'
                  : 'filter-action-row-btn'
              }
              id="created"
              onClick={() => setActiveBtn('created')}
            >
              Created
            </button>
            {isOwner ? (
              <button
                type="button"
                className={
                  activeBtn === 'hidden'
                    ? 'filter-action-row-btn active'
                    : 'filter-action-row-btn'
                }
                id="hidden"
                onClick={() => setActiveBtn('hidden')}
              >
                Hidden
              </button>
            ) : null}
          </div>

          {/* <div className="account-owned-page-bar-search">
            <div className="mediaeye-searchbar">
              <input placeholder="Search" type="text" />
            </div>
          </div> */}
        </div>
        <div className="account-owned-page-cardss mediaeye-marketplace-row">
          {nfts.length === 0 ? (
            <div className="mediaeyeEmpty">
              <div className="mediaeyeEmpty-message">
                {user?.attributes?.username} doesn't have NFTs yet
              </div>
            </div>
          ) : (
            showNFTs()
          )}
        </div>
      </div>
    </>
  );
};

export default AccountOwned;
