import React, { useEffect, useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  useParams
} from 'react-router-dom';
import { Web3ReactProvider } from '@web3-react/core';
import { useSelector } from 'react-redux';
import MainAboutUs from './pages/MainAboutUs/MainAboutUs';
import Header from './components/Common/Header/Header';
import Footer from './components/Common/Footer/Footer';
import NoMatch from './pages/NoMatch';
import Refresh from './pages/Refresh';
import Newsletter from './pages/Newsletter';
import NftMarketplace from './pages/NftMarketplace';
import Marketplace from './pages/Marketplace';
import ConnectWallet from './pages/ConnectWallet';
import NewConnectWallet from './pages/NewConnectWallet';
import ConnectWalletMetamaskOnboard from './pages/ConnectWalletMetamaskOnboard';
import Product from './pages/Product';
import CreateProduct from './pages/CreateProduct';
import GenerativeCollectionCreate from './pages/CreateGenerativeCollection';
import Collection from './pages/CreateCollectionProduct';
import EditCollection from './pages/EditCollectionProduct';
import Profile from './pages/Profile';
import ProfileSettings from './pages/ProfileSettings';
import ProfileSupport from './pages/ProfileSupport';
import ProfileSubscription from './pages/ProfileSubscription';
import ProfileNFTDomains from './pages/ProfileNFTDomains';
import ProfileNFTDomainsCart from './pages/ProfileNFTDomainsCart';
import { getLibrary } from './utils/web3';
import SingleCollection from './components/Account/SingleCollection/SingleCollection';
import ProductBundlePage from './pages/ProductBundlePage';
import CharitiesSingle from './pages/CharitiesSingle';
import PutOnMarketplace from './pages/PutOnMarketplace';
import CharitiesPlace from './pages/CharitiesPlace';
import CharitiesRegister from './pages/CharitiesRegister';
import Home from './pages/Home/Home';
import ScrollToTop from './utils/scrollToTop';
import AccountPage from './pages/Account';
import Event from './pages/Event';
import LaunchEvent from './pages/LaunchEvent';
import EditEvent from './pages/EditEvent';
import Hub from './pages/Hub';
import PutOnMarketplaceCreate from './pages/PutOnMarketplaceCreate';
import ProductListOnEventPage from './pages/ProductListOnEventPage';
import Cohort from './pages/Cohort';
import RewardsPool from './pages/RewardsPool';
import Collections from './pages/Collections';
import CreateMintProduct from './pages/CreateMintProduct';
import Modals from './components/Modals/index';
import Airdrops from './pages/Airdrops';
import LaunchPage from './pages/LaunchAirdrop';
import TokenAirdrop from './components/Airdrop/Token/Token';
import EventParticipant from './pages/EventParticipant';
import TermsConditions from './pages/TermsConditions';
import FeatureNft from './components/Features/FeatureNft/FeatureNft';
import FeatureCollection from './components/Features/FeatureCollection/FeatureCollection';
import FeatureEvent from './components/Features/FeatureEvent/FeatureEvent';
import FeatureAirdrop from './components/Features/FeatureAirdrop/FeatureAirdrop';
import ListenerProvider from './context/ListenerContext';
import Landing from './pages/Landing/Landing';
import FeatureListing from './components/Features/FeatureListing/FeatureListing';
import Createavatar from './components/Avatar/createavatar';
import CreateJumboMintProduct from './pages/CreateJumboMintProduct';
import ProfileEyeswap from './pages/ProfileEyeswap';
import Watchlist from './pages/Watchlist';
import TopCollectionAllData from './components/Collections/TopCollectionAllData';
import TopNftSale from './components/TopNftSale/TopNftSale';
import TopNftSaleAllData from './components/TopNftSale/TopNftSaleAllData';
import CryptoPunk from './components/Hub/CryptoPunk/CryptoPunk';
import SalesDetails from './components/Hub/SalesDetails/SalesDetails';
import Airdrop from './pages/Airdrop';
import NewAboutUs from './pages/NewAboutUs';
import Sitemap from './pages/Sitemap';
import CreateCampaign from './pages/CreateCampaign';
import EyeSwapPro from './components/Modals/EyeSwap-Open/EyeSwapPro';
import EyeSwapHome from './components/EyeSwapHome/EyeSwapHome';
import PublicSpotlightPage from './pages/PublicSpotlightPage';
import CampaignDetail from './components/Campaigns/CampaignDetail/CampaignDetail';
import Campaign from './pages/CampaignMain';
import CampaignMain from './pages/CampaignMain';
import EditCampaign from './pages/EditCampaign';
import CampaignGallery from './components/Campaigns/CampaignGallery/CampaignGallery';
import FeatureCampaign from './components/Features/FeatureCampaign/FeatureCampaign';
import LaunchAirdropNew from './pages/LaunchAirdropNew';
import io from 'socket.io-client';
import { baseUrl } from './services/api.service';
import PrivacyPolicy from './pages/PrivacyPolicy';
import DragAndDropSection from './components/GenerativeConcept/DragAndDropSection';
import SetupCollection from './components/GenerativeConcept/SetupCollection';
import CollectionPreview from './components/GenerativeConcept/CollectionPreview/CollectionPreview';
import GenerativeLanding from './components/GenerativeLanding/GenerativeLanding';
import PublishPage from './components/GenerativeLanding/GenerativePublishPage/PublishPage';
const socket = io(baseUrl);

const App = () => {
  const darkTheme = useSelector((state) => state.app.darkTheme);
  const [showDropdash, setShowDropdash] = useState(false);
  const [showWalletCollapse, setShowWalletCollapse] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showMenuDropDown, setShowMenuDropDown] = useState(false);

  useEffect(() => {
    socket.on('connect', () => {
      console.log('connected');
    });
  }, []);

  const toggleMenuDropDown = (value = '') => {
    setShowMenuDropDown(value === showMenuDropDown ? false : value);
    setShowDropdash(false);
    setShowNotifications(false);
    setShowWalletCollapse(false);
  };
  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
    if (!showNotifications) {
      setShowWalletCollapse(false);
      setShowDropdash(false);
      setShowMenuDropDown(false);
    }
  };

  const closeAll = () => {
    setShowWalletCollapse(false);
    setShowDropdash(false);
    setShowNotifications(false);
    setShowMenuDropDown(false);
  };

  const toggleDropdash = () => {
    setShowDropdash(!showDropdash);
    if (!showDropdash) {
      setShowNotifications(false);
      setShowWalletCollapse(false);
      setShowMenuDropDown(false);
    }
  };

  const closeNftCollapse = () => {
    setShowDropdash(false);
    setShowWalletCollapse(false);
    setShowNotifications(false);
    setShowMenuDropDown(false);
  };

  const toggleWalletCollapse = () => {
    setShowWalletCollapse(!showWalletCollapse);
    if (!showWalletCollapse) {
      setShowNotifications(false);
      setShowDropdash(false);
      setShowMenuDropDown(false);
    }
  };

  return (
    <Router>
      <ScrollToTop />
      <ListenerProvider>
        <Web3ReactProvider getLibrary={getLibrary}>
          <div
            className={darkTheme ? 'mediaeye-layout dark' : 'mediaeye-layout'}
          >
            <Modals />
            <Header
              toggleDropdash={toggleDropdash}
              toggleWalletCollapse={toggleWalletCollapse}
              showDropdash={showDropdash}
              showWalletCollapse={showWalletCollapse}
              showNotifications={showNotifications}
              toggleNotifications={toggleNotifications}
              showMenuDropDown={showMenuDropDown}
              toggleMenuDropDown={toggleMenuDropDown}
              closeAll={closeAll}
            />
            <Switch>
              <Route path="/" exact>
                <Home closeNftCollapse={closeNftCollapse} />
              </Route>
              <Route path="/metaverse-landing" exact>
                <Landing closeNftCollapse={closeNftCollapse} />
              </Route>
              <Route path="/about" exact>
                <MainAboutUs closeNftCollapse={closeNftCollapse} />
              </Route>
              <Route path="/new-about-us" exact>
                <NewAboutUs closeNftCollapse={closeNftCollapse} />
              </Route>
              <Route path="/newsletter" exact>
                <Newsletter closeNftCollapse={closeNftCollapse} />
              </Route>
              <Route path="/marketplace" exact>
                <Marketplace closeNftCollapse={closeNftCollapse}></Marketplace>
              </Route>
              <Route path="/marketplace/:page" exact>
                <Marketplace closeNftCollapse={closeNftCollapse}></Marketplace>
              </Route>
              <Route path="/nft-marketplace" exact>
                <NftMarketplace
                  closeNftCollapse={closeNftCollapse}
                ></NftMarketplace>
              </Route>
              <Route path="/feature-nft" exact>
                <FeatureNft closeNftCollapse={closeNftCollapse} />
              </Route>
              <Route path="/feature-collection" exact>
                <FeatureCollection closeNftCollapse={closeNftCollapse} />
              </Route>
              <Route path="/feature-event" exact>
                <FeatureEvent closeNftCollapse={closeNftCollapse} />
              </Route>
              <Route path="/feature-airdrop" exact>
                <FeatureAirdrop closeNftCollapse={closeNftCollapse} />
              </Route>
              <Route path="/avatar/create" exact>
                <Createavatar />
              </Route>
              <Route path="/feature-campaign" exact>
                <FeatureCampaign closeNftCollapse={closeNftCollapse} />
              </Route>
              <Route path="/feature-listing" exact>
                <FeatureListing closeNftCollapse={closeNftCollapse} />
              </Route>
              {/* <Route path="/connect-wallet" exact>
                <ConnectWallet closeNftCollapse={closeNftCollapse} />
              </Route> */}
              <Route path="/connect-wallet" exact>
                <NewConnectWallet closeNftCollapse={closeNftCollapse} />
              </Route>
              <Route path="/connect-wallet-metamask-onboard" exact>
                <ConnectWalletMetamaskOnboard
                  closeNftCollapse={closeNftCollapse}
                />
              </Route>
              <Route path="/feature" exact>
                <Redirect to="/profile/subscription" />
              </Route>
              <Route path="/product/:chain/bundle/:listingId">
                <ProductBundlePage closeNftCollapse={closeNftCollapse} />
              </Route>
              <Route path="/product/:chain/:address/:tokenId">
                <Product closeNftCollapse={closeNftCollapse} />
              </Route>

              <Route path="/edit/collection/:chain/:address" exact>
                <EditCollection
                  closeNftCollapse={closeNftCollapse}
                  darkTheme={darkTheme}
                />
              </Route>

              <Route path="/create" exact>
                <CreateProduct closeNftCollapse={closeNftCollapse} />
              </Route>
              <Route path="/create/collection" exact>
                <Collection
                  closeNftCollapse={closeNftCollapse}
                  darkTheme={darkTheme}
                />
              </Route>
              <Route path="/create/generative/collection" exact>
                <GenerativeCollectionCreate
                  closeNftCollapse={closeNftCollapse}
                  darkTheme={darkTheme}
                />
              </Route>
              <Route path="/create/mint" exact>
                <CreateMintProduct
                  closeNftCollapse={closeNftCollapse}
                  darkTheme={darkTheme}
                />
              </Route>
              <Route path="/create/jumbomint" exact>
                <CreateJumboMintProduct
                  closeNftCollapse={closeNftCollapse}
                  darkTheme={darkTheme}
                />
              </Route>
              <Route path="/profile/payment/methods" exact>
                <ProfileSettings closeNftCollapse={closeNftCollapse} />
              </Route>
              <Route path="/profile/eyeswap" exact>
                <ProfileEyeswap closeNftCollapse={closeNftCollapse} />
              </Route>
              <Route path="/profile/settings" exact>
                <ProfileSettings closeNftCollapse={closeNftCollapse} />
              </Route>
              <Route path="/profile/support" exact>
                <ProfileSupport closeNftCollapse={closeNftCollapse} />
              </Route>
              <Route path="/profile/subscription" exact>
                <ProfileSubscription closeNftCollapse={closeNftCollapse} />
              </Route>
              <Route path="/profile/nftdomains" exact>
                <ProfileNFTDomains closeNftCollapse={closeNftCollapse} />
              </Route>
              <Route path="/profile/nftdomains/cart" exact>
                <ProfileNFTDomainsCart closeNftCollapse={closeNftCollapse} />
              </Route>
              <Route path="/profile" exact>
                <Profile closeNftCollapse={closeNftCollapse} />
              </Route>
              <Route path="/account/:userAddress" exact>
                <AccountPage closeNftCollapse={closeNftCollapse} />
              </Route>
              <Route path="/account/:userAddress/:page" exact>
                <AccountPage closeNftCollapse={closeNftCollapse} />
              </Route>

              <Route path="/collections/:chain/:address">
                <SingleCollection closeNftCollapse={closeNftCollapse} />
              </Route>
              <Route path="/top-collection">
                <TopCollectionAllData closeNftCollapse={closeNftCollapse} />
              </Route>
              <Route path="/top-nft-sale">
                <TopNftSale closeNftCollapse={closeNftCollapse} />
              </Route>
              <Route path="/top-nft-sale-all-data">
                <TopNftSaleAllData closeNftCollapse={closeNftCollapse} />
              </Route>
              <Route path="/crypto-punks">
                <CryptoPunk closeNftCollapse={closeNftCollapse} />
              </Route>
              <Route path="/sale-details">
                <SalesDetails closeNftCollapse={closeNftCollapse} />
              </Route>
              <Route path="/eyeswap-open">
                <EyeSwapPro closeNftCollapse={closeNftCollapse} />
              </Route>
              <Route path="/submit-to-marketplace/create" exact>
                <PutOnMarketplaceCreate closeNftCollapse={closeNftCollapse} />
              </Route>
              <Route path="/submit-to-marketplace" exact>
                <PutOnMarketplace closeNftCollapse={closeNftCollapse} />
              </Route>
              <Route path="/list-on-event" exact>
                <ProductListOnEventPage closeNftCollapse={closeNftCollapse} />
              </Route>
              <Route path="/eyeswap-home" exact>
                <EyeSwapHome closeNftCollapse={closeNftCollapse} />
              </Route>
              <Route path="/charity-place" exact>
                <CharitiesPlace closeNftCollapse={closeNftCollapse} />
              </Route>

              <Route path="/charity/register" exact>
                <CharitiesRegister closeNftCollapse={closeNftCollapse} />
              </Route>
              <Route
                path="/charity-place/:charityDetailname/:charityDetailid"
                exact
              >
                <CharitiesSingle closeNftCollapse={closeNftCollapse} />
              </Route>
              <Route path="/watchlist" exact>
                <Watchlist closeNftCollapse={closeNftCollapse} />
              </Route>
              <Route path="/setup-collection" exact>
                <SetupCollection closeNftCollapse={closeNftCollapse} />
              </Route>
              <Route path="/event" exact>
                <Event closeNftCollapse={closeNftCollapse} />
              </Route>

              <Route path="/event/launch" exact>
                <LaunchEvent closeNftCollapse={closeNftCollapse} />
              </Route>

              <Route path="/event/edit" exact>
                <EditEvent closeNftCollapse={closeNftCollapse} />
              </Route>

              <Route path="/event/participant" exact>
                <EventParticipant closeNftCollapse={closeNftCollapse} />
              </Route>
              <Route path="/uploader">
                <DragAndDropSection closeNftCollapse={closeNftCollapse} />
              </Route>
              <Route path="/hub" exact>
                <Hub closeNftCollapse={closeNftCollapse} />
              </Route>
              <Route path="/airdrops" exact>
                <Airdrops closeNftCollapse={closeNftCollapse} />
              </Route>
              <Route path="/airdrop/launch" exact>
                {/* <LaunchPage closeNftCollapse={closeNftCollapse} /> */}
                <LaunchAirdropNew closeNftCollapse={closeNftCollapse} />
              </Route>
              <Route path="/airdrop/token" exact>
                <TokenAirdrop closeNftCollapse={closeNftCollapse} />
              </Route>
              <Route path="/airdrop/:chain/:airdropId" exact>
                <Airdrop closeNftCollapse={closeNftCollapse} />
              </Route>
              <Route path="/cohort" exact>
                <Cohort closeNftCollapse={closeNftCollapse} />
              </Route>
              <Route path="/setup-collection/preview" exact>
                <CollectionPreview closeNftCollapse={closeNftCollapse} />
              </Route>
              <Route path="/spotlight" exact>
                <PublicSpotlightPage closeNftCollapse={closeNftCollapse} />
              </Route>
              <Route path="/rewards-pool" exact>
                <RewardsPool closeNftCollapse={closeNftCollapse} />
              </Route>
              <Route path="/collections" exact>
                <Collections closeNftCollapse={closeNftCollapse} />
              </Route>
              <Route path="/terms-conditions" exact>
                <TermsConditions closeNftCollapse={closeNftCollapse} />
              </Route>
              <Route path="/sitemap" exact>
                <Sitemap closeNftCollapse={closeNftCollapse} />
              </Route>
              <Route path="/create-campaign" exact>
                <CreateCampaign closeNftCollapse={closeNftCollapse} />
              </Route>
              <Route path="/edit-campaign" exact>
                <EditCampaign closeNftCollapse={closeNftCollapse} />
              </Route>
              <Route path="/campaigns" exact>
                <CampaignMain closeNftCollapse={closeNftCollapse} />
              </Route>
              <Route path="/campaign/launch" exact>
                <CampaignDetail closeNftCollapse={closeNftCollapse} />
              </Route>
              <Route path="/campaign/gallery" exact>
                <CampaignGallery closeNftCollapse={closeNftCollapse} />
              </Route>
              <Route path="/privacy-policy" exact>
                <PrivacyPolicy closeNftCollapse={closeNftCollapse} />
              </Route>
              <Route path="/generative-landing" exact>
                <GenerativeLanding closeNftCollapse={closeNftCollapse} />
              </Route>
              <Route path="/generative-publish" exact>
                <PublishPage closeNftCollapse={closeNftCollapse} />
              </Route>
              <Route path="/refresh" exact>
                <Refresh />
              </Route>
              <Route path="*">
                <NoMatch onClick={closeNftCollapse} />
              </Route>
            </Switch>
            <Footer />
          </div>
        </Web3ReactProvider>
      </ListenerProvider>
    </Router>
  );
};

export default App;
