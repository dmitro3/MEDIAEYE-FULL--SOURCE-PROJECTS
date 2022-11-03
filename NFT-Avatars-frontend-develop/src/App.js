import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./Components/common/Header/Header";
import Footer from "./Components/common/Footer/Footer";
import Home from "./Pages/Home";
import Profile from "./Pages/Profile";
import MyProfile from "./Pages/MyProfile";
import CreateAvatar from "./Pages/CreateAvatar";
import CreateAvatar3D from "./Pages/CreateAvatar3D";
import CreateAvatar3D1 from "./Pages/CreateAvatar3D1";
import CreateAvatar2D from "./Pages/CreateAvatar2D";
import { dispatch } from "./Components/Avatar/Avatar3D/dispatch";
import constants from "./Components/Avatar/Avatar3D/constants";
import CreateMeme from "./Components/MemeGenerator/Meme";
import Collection from "./Pages/Collection";
import PrivateLibrary from "./Pages/PrivateLibraries";
import PublicLibrary from "./Pages/PublicLibraries";
import MyNewCollection from "./Pages/MyNewCollection";
import MintCollection from "./Pages/MintCollection";
import AvaMarketplace from "./Pages/AvaMarketplace";

import SalesHistory from "./Components/Library/SalesHistory";
import PurchaseHistory from "./Components/Library/PurchaseHistory";
import PlaceBid from "./Components/Modals/PlaceaBid/PlaceBid";
import MakeOffer from "./Components/Modals/MakeOffer/MakeOffer";
import Checkout from "./Components/Modals/Checkout/Checkout";
import MainNFT from "./Components/MainNFT/MainNFT";
import PurchaseComplete from "./Components/Modals/PurchaseComplete/PurchaseComplete";
import Unlockable from "./Components/Modals/Unlockable/Unlockable";
// import ShowProfiles from "./Components/ShowProfile/ShowProfile";

const App = () => {
  window.renderThumbnail = (category, part) => {
    dispatch(constants.renderThumbnail, {
      thumbnailConfig: { category, part },
    });
  };
  // const [readyPopup, setReady] = useState(false);
  // const toggleReadyPopup = () => {
  //   setReady(!readyPopup);
  // };
  // const [readyUser, setReadyUser] = useState(false);
  // const toggleUserProfile = () => {
  //   setReadyUser(!readyUser);
  // };
  // const [isActive, setActive] = useState("false");
  // const ToggleClass = () => {
  //   setActive(!isActive);
  // };



  return (
    <Router>
      <div className="mediaeyeAvatar-layout">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} exact />
          <Route path="/profile" element={<Profile />} exact />
          <Route path="/my-profile" element={<MyProfile />} exact />
          <Route path="/create-avatar" element={<CreateAvatar />} exact />
          <Route path="/collection" element={<Collection />} exact />
          <Route path="/privatelibrary" element={<PrivateLibrary />} exact />
          <Route path="/publiclibrary" element={<PublicLibrary />} exact />
          <Route
            path="/my-new-collection"
            element={<MyNewCollection />}
            exact
          />
          <Route
            path="/create-avatar/3d"
            element={<CreateAvatar3D1 />}
            exact />

          <Route
            path="/create-avatar/2d"
            element={<CreateAvatar2D />}
            exact />

          <Route
            path="/create-avatar/realstick"
            element={<CreateAvatar3D />}
            exact
          />

          <Route 
          path="/create-avatar/meme" 
          element={<CreateMeme />} 
          exact />
          
          <Route
            path="/mint-to-collection"
            element={<MintCollection />}
            exact
          />
          <Route

            path="/avamarketplace"
            element={<AvaMarketplace />}
            exact
          />

          <Route
            path="/saleshistory"
            element={<SalesHistory />}
            exact
          />
          <Route
            path="/purchase-history"
            element={<PurchaseHistory />} />

          <Route
            path="/place-bid"
            element={<PlaceBid />} />

          <Route
            path="/make-offer"
            element={<MakeOffer />} />

          <Route
            path="/checkout"
            element={<Checkout />} />

          <Route
            path="/main-nft"
            element={<MainNFT />} />

          <Route
            path="/purchase-complete"
            element={<PurchaseComplete />} />

          <Route
            path="/unlockable-content"
            element={<Unlockable />} />

          {/* <Route
            path="/showProfiles"
            element={<ShowProfiles />} /> */}

        </Routes>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
