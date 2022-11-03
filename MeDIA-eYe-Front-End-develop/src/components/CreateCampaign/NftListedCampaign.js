import React, { useEffect, useState } from 'react';
import ExploreBlock from '../ContentMarketplace/ExploreBlock/ExploreBlock';
import { useMoralisWeb3Api, useMoralis } from 'react-moralis';
import { useSelector } from 'react-redux';
import { Swiper, SwiperSlide } from 'swiper/react/swiper-react';
import { Pagination } from 'swiper';
import { ChainHexString } from '../../blockchain/functions/ChangeChain/ChainHexStrings';
import { TokenAddress } from '../../blockchain/functions/Addresses';
import { roundString } from '../../blockchain/functions/Utils';
import { queryFeaturedNFTListings } from '../../blockchain/functions/Feature/QueryFeaturedNFTListings';
import { formatListingNFT } from '../../utils/FormatListingNFT';

const settingsnft = {
  slidesPerView: 1,
  grabCursor: true,
  modules: [Pagination],
  pagination: {
    el: '.mediaeye-CreateCampaign-nft-pagination',
    enable: true,
    clickable: true
  },
  breakpoints: {
    889: {
      slidesPerView: 3
    },
    1181: {
      slidesPerView: 3
    },
    1280: {
      slidesPerView: 4
    }
  }
};

export default function NftListedCampaign(props) {
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
      <div className="mediaeye-nft-slide">
        {userNFTs.length > 0 ? (
          <>
            <Swiper {...settingsnft} className="mediaeye-nft-pagination m-t-30">
              {userNFTs.map((product, i) => (
                <SwiperSlide key={i}>
                  {props?.selectListedNftCard ? (
                    <ExploreBlock
                      product={{
                        id: 'listing' + i,
                        collectionAddress: [product?.token_address],
                        collectionType: product?.contract_type,
                        description: [
                          JSON.parse(product?.metadata)?.description
                        ],
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
                </SwiperSlide>
              ))}
            </Swiper>
            <div className="m-t-30 mediaeye-swiper-pagination mediaeye-swiper-pagination-center withscroll mediaeye-CreateCampaign-nft-pagination"></div>{' '}
          </>
        ) : (
          <div className="text-center">
            <h1 className="text-semitransperant m-b-30 text-medium">
              You have no NFTs yet
            </h1>
            <button className="btn btn-transperant btn-lg">CREATE NFT</button>
          </div>
        )}
      </div>
    </>
  );
}
