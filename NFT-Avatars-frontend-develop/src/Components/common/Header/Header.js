import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
// import { useSelector, useDispatch } from "react-redux";
import "./Header.scss";
import ReadyPopup from "../../../Components/Modals/AreYouReadyModal/AreYouReadyModal";
import ReadyPopupEnter from "../../../Components/Modals/AreYouReadyModal/AreYouReadyEnter";
import UserProfile from "../../../Components/YourProfile/YourProfile";
// import Telegram from "../../icons/Telegram.js";
// import Twitter from "../../icons/Twitter.js";
// import Discord from "../../icons/Discord.js";
// import Youtube from "../../icons/Youtube.js";
// import Instagram from "../../icons/Instagram.js";
import header_logo from "../../../assets/images/Metavatar_logo.png";
import m_e_circle_logo from "../../../assets/images/m-e-circle-logo.png";
import user_img from "../../../assets/images/profileimg.png";
import DownArrow from "../../icons/DownArrow.js";
import Searchbar from "../../icons/SearchBar.js";
import WalletModal from "../../Modals/WalletModal";
import { useWeb3React } from "@web3-react/core";
import { session } from "../../../utils/session.util";
import { userService } from "../../../services/api.service";

const Header = () => {
  const [readyPopup, setReady] = useState(false);
  const [openWalletDlg, setOpenWalletDlg] = useState();
  const { account } = useWeb3React();

  useEffect(() => {
    const user = session.get("eye-user");
    if (!!user && !!account) {
      const index = user.wallet.findIndex(
        (wallet) => wallet.toLowerCase() === account.toLowerCase()
      );
      if (index === -1) {
        let temp = { ...user };
        temp.wallet.push(account);
        userService.update(temp);
      }
    }
  }, [account]);

  const toggleReadyPopup = () => {
    setReady(!readyPopup);
  };

  const [readyUserProfile, setReadyUserProfile] = useState(false);

  const toggleUserProfile = () => {
    setReadyUserProfile(!readyUserProfile);
  };

  const [isActive, setActive] = useState("false");
  const ToggleClass = () => {
    setActive(!isActive);
  };

  const [EnterPopUp, setEnterReady] = useState(false);

  const toggleReadyEnter = () => {
    setEnterReady(!EnterPopUp);
  };

  const [isOpenDropdown, setOpenDropdown] = useState(false);

  const toggleHeaderDropdown = () => setOpenDropdown(!isOpenDropdown);

  const [showSearch, setshowSearch] = useState(false);
  const onSearchClick = () => setshowSearch(!showSearch);

  return (
    <React.Fragment>
      <ReadyPopup readyPopup={readyPopup} toggleReadyPopup={toggleReadyPopup} />
      <ReadyPopupEnter
        EnterPopUp={EnterPopUp}
        toggleReadyEnter={toggleReadyEnter}
      />
      <WalletModal open={openWalletDlg} onClose={() => setOpenWalletDlg()} />

      <header
        className={
          isActive
            ? "mediaeyeAvatar-layout-header"
            : "active mediaeyeAvatar-layout-header"
        }
      >
        <div className="mediaeyeAvatar-layout-header-container">
          <a href="https://mediaeyenft.com" target="_blank" rel="noreferrer">
            <img
              className="m_e_logo-header"
              src={m_e_circle_logo}
              alt="No img"
            />
          </a>
          <div className="mediaeyeAvatar-layout-header-inner">
            <div className="mediaeyeAvatar-layout-header-inner-logo">
              <Link to="/">
                <img src={header_logo} alt="MetaAvatar" />
              </Link>
            </div>
            <div className="mob-menu">
              <ul className="mediaeyeAvatar-layout-header-inner-nav">
                <li className="mediaeyeAvatar-layout-header-inner-nav-li">
                  <Link
                    className="mediaeyeAvatar-layout-header-inner-nav-li-a "
                    to="#"
                  >
                    aVaBuilder
                  </Link>
                </li>
                <li className="mediaeyeAvatar-layout-header-inner-nav-li">
                  <Link
                    className="mediaeyeAvatar-layout-header-inner-nav-li-a"
                    to="#"
                  >
                    aVaMarketplace
                  </Link>
                </li>
                <li className="mediaeyeAvatar-layout-header-inner-nav-li">
                  <Link
                    className="mediaeyeAvatar-layout-header-inner-nav-li-a"
                    to="#"
                  >
                    about
                  </Link>
                </li>
                <li
                  className="mediaeyeAvatar-layout-header-inner-nav-li headdrop"
                  onClick={toggleHeaderDropdown}
                >
                  <span
                    className={
                      isOpenDropdown
                        ? "mediaeyeAvatar-layout-header-inner-nav-li-a anchor active2"
                        : "mediaeyeAvatar-layout-header-inner-nav-li-a anchor"
                    }
                  >
                    Library <DownArrow />
                  </span>
                  {isOpenDropdown ? (
                    <ul className="dropdown-sub">
                      <Link to="/privatelibrary">
                        <li className="list">Private Library</li>
                      </Link>
                      <Link to="/publiclibrary">
                        <li className="list">Public Library</li>
                      </Link>
                    </ul>
                  ) : null}
                </li>
                <li className="mediaeyeAvatar-layout-header-inner-nav-li headdrop">
                  <span
                    className={
                      showSearch
                        ? "mediaeyeAvatar-layout-header-inner-nav-li-a active"
                        : "mediaeyeAvatar-layout-header-inner-nav-li-a"
                    }
                    onClick={onSearchClick}
                  >
                    <Searchbar />
                  </span>
                  {showSearch ? (
                    <div className="searchbox">
                      <input
                        type="text"
                        className="searchbox-field"
                        placeholder="Search Here"
                      />
                    </div>
                  ) : null}
                </li>
              </ul>
              <div className="network_switcher">
                <div className="network_sircle ETH"></div>

                <span className="active ETH">ETH</span>
                <span className="BSC">BSC</span>
                <span className="FTM">FTM</span>
              </div>
            </div>
            <button
              className="mediaeyeAvatar-layout-header-inner-create-btn"
              onClick={() => toggleReadyPopup()}
            >
              <span>Connect</span>
            </button>
            <button className="mediaeyeAvatar-layout-header-inner-user">
              <img
                className="mediaeyeAvatar-layout-header-inner-user-img"
                onClick={() => toggleUserProfile()}
                src={user_img}
                alt="no img"
              />
              <span className="mediaeyeAvatar-layout-header-inner-user-name">
                VICTORY IS near
              </span>
              {/* header menu */}
              <UserProfile
                readyUserProfile={readyUserProfile}
                toggleUserProfile={toggleUserProfile}
                connectWallet={() => setOpenWalletDlg(true)}
              />
            </button>
            <button
              className="mediaeyeAvatar-layout-header-inner-menu-btn"
              onClick={ToggleClass}
            >
              <span></span>
              <span></span>
              <span></span>
            </button>
            {/* {active == "active" ? <ReadyPopup/> : null} */}
          </div>
        </div>
      </header>
    </React.Fragment>
  );
};

export default Header;
