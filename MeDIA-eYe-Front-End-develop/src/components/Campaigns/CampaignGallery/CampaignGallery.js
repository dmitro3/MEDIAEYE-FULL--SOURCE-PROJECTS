import React, { useEffect, useState, useRef } from 'react';
import './CampaignGallery.scss';
import { useSelector } from 'react-redux';
import ContentMarketplaceHeader from '../../../components/ContentMarketplace/MarketplaceHeader/NftMarketplaceHeader';
import { useMoralis } from 'react-moralis';
import { queryListings } from '../../../blockchain/functions/Marketplace/QueryListings';
import { formatListingNFT } from '../../../utils/FormatListingNFT';
import CampaignGalleryMenu from './CampaignGalleryMenu';
import ExploreBlock from '../../../components/ContentMarketplace/ExploreBlock/ExploreBlock';
import ItemLoader from '../../../components/Common/ItemLoader';
import { ChainHexString } from '../../../blockchain/functions/ChangeChain/ChainHexStrings';
import banner from '../../../assets/img/CreateCampaign/Eminem_NFT.png';

export default function CampaignGallery(props) {
  const { closeNftCollapse } = props;
  //const [allLoaded, setAllLoaded] = useState(false);
  const activeNetwork = useSelector((state) => state.app.activeNetwork);
  const [filters, setMarketFilters] = useState([]);
  const { Moralis, isInitialized } = useMoralis();
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(0);
  // reference to state that can be used in listeners (specifically onScroll)
  const productsRef = useRef(products);
  const pageRef = useRef(page);
  const [loading, setLoading] = useState(true);

  // query once when initialized
  useEffect(() => {
    // run after active network is initialized
    if (!activeNetwork || !isInitialized) return;
    // if products was already empty
    if (!products.length || page === 0) {
      getListings();
    } else {
      // reset products
      setProducts([]);
      setPage(0);
    }
  }, [filters, activeNetwork, isInitialized]);

  useEffect(() => {
    setPage(0);
  }, [filters]);
  // when page changes
  useEffect(() => {
    getListings(page);
  }, [page]);

  useEffect(() => {
    const onScroll = (e) => {
      if (productsRef.current.length > 0) {
        const bottom =
          document.documentElement.scrollTop ===
          document.documentElement.scrollHeight -
            document.documentElement.clientHeight;
        if (bottom) {
          setPage(page + 1);
        }
      }
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const getListings = async () => {
    if (!ChainHexString(activeNetwork)) return;
    setLoading(true);
    const categories =
      filters?.category?.length > 0
        ? filters?.category?.map((category) => {
            return category.value.toLowerCase();
          })
        : null;
    const result = await queryListings(Moralis, {
      status: 'available',
      page: page,
      limit: 8,
      chainId: ChainHexString(activeNetwork),
      categories: categories
    });

    const listings = result[0];
    const nfts = result[1];
    let currProducts = [];
    // add to current product
    if (page > 0) {
      currProducts = [...products];
    }
    for (let i = 0; i < result[0].length; i++) {
      currProducts.push(formatListingNFT(listings[i], nfts[i]));
    }

    // check if there are no more products to load
    //if (!result[0].length) setAllLoaded(true);
    setProducts(currProducts);
    setLoading(false);
  };

  useEffect(() => {
    // update reference to be used to get products in a hook/listener
    productsRef.current = products;
  }, [products]);

  useEffect(() => {
    // update reference to be used to get activeNetwork in a hook/listener
    pageRef.current = page;
  }, [page]);

  return (
    <div
      className="withfulllayout nft-marketplace-page"
      onClick={closeNftCollapse}
    >
      <div className="mediaeye-layout-content">
        <div className="mediaeye-layout-middle">
          <div className="mediaeye-CampaignGallery">
            <img
              className="mediaeye-CampaignGallery-profileBanner"
              src={banner}
              alt="banner"
            />
            <div className="mediaeye-CampaignGallery-tag m-b-10">
              Eminem NFT
              <span className="m-t-30">CAMPAIGN GALLERY</span>
            </div>
          </div>
        </div>
        <div className="mediaeye-layout-middle">
          <CampaignGalleryMenu setMarketFilters={setMarketFilters} />
          <div className="mediaeye-layout-container">
            <div className="mediaeye-nft-row">
              {products.map((product, i) => (
                <ExploreBlock product={product} key={i} />
              ))}
            </div>

            {loading ? <ItemLoader /> : null}
          </div>
        </div>
      </div>
    </div>
  );
}
