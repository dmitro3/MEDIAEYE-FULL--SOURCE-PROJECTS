import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./SideProfile.scss";
import profileimg from "../../assets/images/profileimg.png";
import ShareProfileStock from "../../assets/images/ShareProfileStock.png";
import { session } from "../../utils/session.util";
import { baseUrl, userService } from "../../services/api.service";
import Following from "../Modals/Follow/Following";
import {
  LinkIcon,
  Users,
  Share,
  Setting,
  Telegram,
  Twitter,
  Discord,
  Youtube,
  Instagram,
  DownArrow,
  Copy,
} from "../icons";

const data = [
  { id: 0, label: "Brands" },
  { id: 1, label: "Socials" },
  { id: 2, label: "Music" },
  { id: 3, label: "Platforms" },
  { id: 4, label: "Games" },
  { id: 5, label: "Services" },
  { id: 6, label: "Stores" },
  { id: 7, label: "Artists" },
];

const dropItems = [
  { id: 0, name: "Apple" },
  { id: 0, name: "Adidas" },
  { id: 0, name: "Nike" },
  { id: 1, name: "facebook" },
  { id: 1, name: "youtue" },
  { id: 1, name: "discord" },
  { id: 2, name: "Music1" },
  { id: 2, name: "Music2" },
  { id: 2, name: "Music3" },
  { id: 3, name: "Platforms" },
  { id: 3, name: "Platforms" },
  { id: 3, name: "Platforms" },
  { id: 4, name: "Games" },
  { id: 4, name: "Games" },
  { id: 4, name: "Games" },
  { id: 4, name: "Games" },
  { id: 5, name: "Services" },
  { id: 5, name: "Services" },
  { id: 5, name: "Services" },
  { id: 5, name: "Services" },
  { id: 6, name: "Stores" },
  { id: 6, name: "Stores" },
  { id: 6, name: "Stores" },
  { id: 7, name: "Artists" },
  { id: 7, name: "Artists" },
  { id: 7, name: "Artists" },
];

const SideProfile = () => {
  const [sitem,] = useState([]);
  const [isOpen, setOpen] = useState(false);
  const [items] = useState(data);
  const [selectedItem, setSelectedItem] = useState(null);
  // const [Pref, setPref] = useState("0");
  const toggleDropdown = () => setOpen(!isOpen);
  // const [dropitem, setdropitem] = useState();
  const [showSharePopup, setShowSharePopup] = useState(false);
  const [isActive, setActive] = useState("false");
  const [readyPopup, setReady] = useState(false);
  const [followings, setFollowings] = useState([]);

  // following integration
  const [users, setUsers] = useState([]);

  const [skip, setSkip] = useState(0);



  const [profile, setProfile] = useState();

  useEffect(() => {
    const user = session.get("eye-user");
    setProfile(user);
    console.log(user)
    setFollowings(user.following);
  }, []);

  useEffect(() => {
    async function getUsers () {
      if (skip % 10 === 0 && skip === users.length) {
        const res = await userService.fetch({skip: skip, take: 10});
        setUsers([...users, ...res]);
      }
    }
    getUsers();
  }, [skip]);

  const handleToggle = () => {
    setActive(!isActive);
  };

  const toggleReadyPopup = () => {
    setReady(!readyPopup);
  };

  const handleShare = () => {
    setShowSharePopup(!showSharePopup);
  };

  const handleItemClick = (id) => {
    dropItems.forEach((element) => {
      if (element.id === id) {
        var length = sitem.length;
        sitem[length] = element;
      }
    });
    selectedItem === id ? setSelectedItem(null) : setSelectedItem(id);
  };

  return (
    profile && (
      <React.Fragment>
        <Following followings={followings} setFollowings={setFollowings} setSkip={setSkip} users={users} readyPopup={readyPopup} toggleReadyPopup={toggleReadyPopup}/>
        {showSharePopup ? (
          
          <div className="com-modal sm" onClick={handleShare}>
            <div className="com-modal-ct com-modal-inner">
              <div className="com-modal-inner-header">
                <h2 className="com-modal-inner-header-heading text-center">
                  Share This
                </h2>
              </div>
              <div className="com-modal-inner-content">
                <div className="com-modal-inner-content-text d-flex text-justify-center text-align-center">
                  <div className="LinkIcon d-flex text-align-center m-r-10">
                    <LinkIcon />
                  </div>
                  bit.ly/3w4hkt
                  <span className="d-flex text-align-center m-l-20 copyShare">
                    <Copy /> Copy
                  </span>
                </div>
                <img
                  src={ShareProfileStock}
                  className="share_profile_code"
                  alt="Share Profile"
                />
              </div>
            </div>
          </div>
        ) : null}
        <div
          className={
            isActive
              ? "mediaProfilepage-datacontent-userprofile show"
              : "mediaProfilepage-datacontent-userprofile"
          }
        >
          <div className="mediaProfilepage-header">
            <div
              onClick={handleToggle}
              className="mediaProfilepage-header-inside"
            >
              <DownArrow />
              <h5 className="mediaProfilepage-header-inside-title">
                Your METAVATAR Profile
              </h5>
            </div>
          </div>
          <div className="profileshow">
            <button className="profileshow-setting" onClick={handleShare}>
              <Share />
            </button>
            <div className="profileshow-userimage">
              <img
                src={(!!profile && !!profile.avatar) ? `${baseUrl}/upload/${profile.avatar}` : profileimg}
                className=""
                alt="no img"
              />
            </div>
            <Link to="/profile" className="profileshow-setting">
              <Setting />
            </Link>
          </div>
          <div className="mediaProfilepage-datacontent-userprofile-userdata">
            <div className="mediaProfilepage-datacontent-userprofile-userdata-userPro">
              <h3>
                <span>{profile.username}</span>
              </h3>
              <span className="status on1">Online</span>
              <div className="mediaProfilepage-datacontent-userprofile-userdata-userPro-follow">
                <Users />
                <span>{!!profile && profile.follower.length}</span>
                <span>Followers</span>
              </div>
            </div>
            <div className="mediaProfilepage-datacontent-userprofile-userdata-userfollow">
              <span>Following</span>
              <div className="userfollowing">
                {
                  followings.map((followingUser, i) => (
                    <img src={!!followingUser.avatar? followingUser.avatar:profileimg} className="" alt="user profile" />
                  ))
                }
              </div>
              <div className="follow">
                <button className="btn btn-info" onClick={() => toggleReadyPopup()}>Follow</button>
              </div>
            </div>
            <div className="mediaProfilepage-datacontent-userprofile-userdata-userdesc">
              {profile.bio}
            </div>
            <div className="mediaProfilepage-datacontent-userprofile-userdata-usersocial">
              <h3>Socials</h3>
              <ul className="mediaeyeAvatar-layout-header-inner-social">
                <li className="mediaeyeAvatar-layout-header-inner-social-li">
                  <Link
                    to="#"
                    className="mediaeyeAvatar-layout-header-inner-social-li-a mediaeyeAvatar-layout-header-inner-social-li-a-instagram"
                  >
                    <Instagram />
                  </Link>
                </li>
                <li className="mediaeyeAvatar-layout-header-inner-social-li">
                  <Link
                    to="#"
                    className="mediaeyeAvatar-layout-header-inner-social-li-a mediaeyeAvatar-layout-header-inner-social-li-a-telegram"
                  >
                    <Telegram />
                  </Link>
                </li>
                <li className="mediaeyeAvatar-layout-header-inner-social-li">
                  <Link
                    to="#"
                    className="mediaeyeAvatar-layout-header-inner-social-li-a mediaeyeAvatar-layout-header-inner-social-li-a-twitter"
                  >
                    <Twitter />
                  </Link>
                </li>
                <li className="mediaeyeAvatar-layout-header-inner-social-li">
                  <Link
                    to="#"
                    className="mediaeyeAvatar-layout-header-inner-social-li-a mediaeyeAvatar-layout-header-inner-social-li-a-discord"
                  >
                    <Discord />
                  </Link>
                </li>
                <li className="mediaeyeAvatar-layout-header-inner-social-li">
                  <Link
                    to="#"
                    className="mediaeyeAvatar-layout-header-inner-social-li-a mediaeyeAvatar-layout-header-inner-social-li-a-youtube"
                  >
                    <Youtube />
                  </Link>
                </li>
              </ul>
            </div>
            <div className="mediaProfilepage-datacontent-userprofile-userdata-usercomm">
              <h3>Communities</h3>
              <div className="mediaProfilepage-datacontent-userprofile-userdata-usercomm-inner">
                <span>Apple Fans</span>
                <span>Nike Fans</span>
                <span>Twitch Fans</span>
              </div>
            </div>
            <div className="mediaProfilepage-datacontent-userprofile-userdata-userpref">
              <div className="mediaProfilepage-datacontent-userprofile-userdata-userpref-inner">
                <button
                  className={` ${isOpen && "active"}`}
                  onClick={toggleDropdown}
                >
                  Preferred <DownArrow />
                </button>
                <span>
                  {selectedItem
                    ? items.find((item) => item.id === selectedItem).label
                    : ""}
                </span>
                <div
                  className={`mediaProfilepage-dropdown ${isOpen && "open"}`}
                >
                  {items.map((item, i) => (
                    <div
                      key={i}
                      className="dropdown-item"
                      onClick={(e) => handleItemClick(e.target.id)}
                      id={item.id}
                    >
                      <span
                        className={`dropdown-item-dot ${
                          item.id === selectedItem && "selected"
                        }`}
                      ></span>
                      {item.label}
                    </div>
                  ))}
                </div>
              </div>

              <div className="mediaProfilepage-datacontent-userprofile-userdata-usercomm-inner">
                {sitem.map((item, i) => (
                  <span key={i}>{item.name}</span>
                ))}
              </div>
            </div>
            <div className="mediaProfilepage-datacontent-userprofile-userdata-userdetail">
              <div className="mediaProfilepage-datacontent-userprofile-userdata-userdetail-row">
                <span>Avatars</span>
                <span>6</span>
              </div>
              <div className="mediaProfilepage-datacontent-userprofile-userdata-userdetail-row">
                <span>Collections</span>
                <span>13</span>
              </div>
              <div className="mediaProfilepage-datacontent-userprofile-userdata-userdetail-row">
                <span>NFTs</span>
                <span>143</span>
              </div>
              <div className="mediaProfilepage-datacontent-userprofile-userdata-userdetail-row">
                <span>Following</span>
                <span>113 068</span>
              </div>
              <div className="mediaProfilepage-datacontent-userprofile-userdata-userdetail-row">
                <span>Referrals</span>
                <span>12 068</span>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    )
  );
};

export default SideProfile;
