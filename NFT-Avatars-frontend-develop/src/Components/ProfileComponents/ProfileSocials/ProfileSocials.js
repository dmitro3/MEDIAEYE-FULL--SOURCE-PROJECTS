import React, {  useState } from "react";
import { Link } from "react-router-dom";
import "./ProfileSocials.scss";
import Twitter from "../../icons/Twitter";
import Instagram from "../../icons/Instagram";
import Discord from "../../icons/Discord";
import Youtube from "../../icons/Youtube";
import Telegram from "../../icons/Telegram";
import Facebook from "../../icons/Facebook";
import Reddit from "../../icons/Reddit";
import Comment from "../../icons/Comment";
import Flickr from "../../icons/Flickr";
import Cross from "../../icons/CrossIcon";
import InstaModal from "../../Modals/SocialPopUp/InstaModal";
import TelegramModal from "../../Modals/SocialPopUp/TelegramModal";

const ProfileSocials = ({ userSocial, handleSocial, updateUser }) => {
  // get social label

  const socialLabel = (stype) => {
    const socialType = stype.toLowerCase();
    if (socialType === "twitter") {
      return <Twitter />;
    } else if (socialType === "instagram") {
      return <Instagram />;
    } else if (socialType === "facebook") {
      return <Facebook />;
    } else if (socialType === "discord") {
      return <Discord />;
    } else if (socialType === "youtube") {
      return <Youtube />;
    } else if (socialType === "telegram") {
      return <Telegram />;
    } else if (socialType === "comment") {
      return <Comment />;
    } else if (socialType === "reddit") {
      return <Reddit />;
    } else if (socialType === "flickr") {
      return <Flickr />;
    }
  };

  const social = [
    {
      username: "Twitter UserName",
      visible: false,
      name: "Twitter",
    },
    {
      username: "Instagram UserName",
      visible: false,
      name: "Instagram",
    },
    {
      username: "Facebook UserName",
      visible: false,
      name: "Facebook",
    },
    {
      username: "Reddit UserName4",
      visible: false,
      name: "Reddit",
    },
    {
      username: "Discord UserName",
      visible: false,
      name: "Discord",
    },
    {
      username: "Youtube UserName",
      visible: false,
      name: "Youtube",
    },
    {
      username: "Telegram UserName",
      visible: false,
      name: "Telegram",
    },
    {
      username: "Comment UserName",
      visible: false,
      name: "Comment",
    },
    {
      username: "Flickr UserName",
      visible: false,
      name: "Flickr",
    },
  ];

  const [items] = useState(social);

  const handleItemClick = (id) => {
    handleSocial([...userSocial, social[id]]);
    if (id === 1) {
      toggleinstaModal();
    } else if (id === 6) {
      toggletelegramModal();
    }
  };

  const handleRemove = (i) => {
    let data = [...userSocial];
    data.splice(i, 1);
    handleSocial(data);
  };

  const [instaModal1, setinstaModal] = useState(false);

  const toggleinstaModal = () => {
    setinstaModal(!instaModal1);
  };
  const [telegramModal1, settelegramModal] = useState(false);

  const toggletelegramModal = () => {
    settelegramModal(!telegramModal1);
  };

  // handle change social username
  const handleUsername = (index, e) => {
    let tempSocial = [...userSocial];
    tempSocial[index].username = e.target.value;
    handleSocial(tempSocial);
  };

  // handle visible
  const handleVisible = (index, val) => {
    let tempSocial = [...userSocial];
    tempSocial[index].visible = val;
    handleSocial(tempSocial);
  };

  const test = () => {
    // return [...Array(eventNumber)].map((e, i) => (
    return userSocial.map((item, i) => (
      <li className="connecting-accounts-social-detail-li">
        <button
          className="connecting-accounts-social-detail-li-close"
          onClick={() => {
            handleRemove(i);
          }}
        >
          <Cross />
        </button>
        <div className="connecting-accounts-social-detail-li-icon">
          {socialLabel(item.name)}
        </div>
        <div className="connecting-accounts-social-detail-li-detail">
          <input
            onChange={(e) => handleUsername(i, e)}
            style={{
              outline: "none",
              background: "rgba(255, 255, 255, 0.1)",
              color: "white",
            }}
            value={item.username}
            className="connecting-accounts-social-detail-li-detail-name"
          />
          <span className="connecting-accounts-social-detail-li-detail-social-name">
            {item.name}
          </span>
          <div
            style={{ cursor: "pointer" }}
            onClick={() => handleVisible(i, !item.visible)}
            className="connecting-accounts-social-detail-li-detail-display"
          >
            <span>Display in profile</span>
            <input
              className="connecting-accounts-social-detail-li-detail-display-input"
              type="checkbox"
              checked={item.visible}
              readOnly
            />
            <label
              className="connecting-accounts-social-detail-li-detail-display-toggle"
              htmlFor={item.id}
            >
              <span></span>
            </label>
          </div>
        </div>
      </li>
    ));
  };

  return (
    <React.Fragment>
      <div className="connecting-accounts">
        <label className="connecting-accounts-label">Connecting accounts</label>
        <ul className="connecting-accounts-social">
          {items.map((item, i) => (
            // <li className='connecting-accounts-social-li' onClick={e => handleItemClick(e.target.id)} id={item.id}>
            <li
              className="connecting-accounts-social-li"
              onClick={() => {
                handleItemClick(i);
              }}
            >
              {/* <li className="connecting-accounts-social-li" onClick={() => {toggleinstaModal();}}> */}
              <Link to="#" className="connecting-accounts-social-li-a">
                {" "}
                {socialLabel(item.name)}{" "}
              </Link>
            </li>
          ))}
        </ul>
        <InstaModal
          instaModal1={instaModal1}
          toggleinstaModal={toggleinstaModal}
          userSocial={userSocial}
          handleSocial={handleSocial}
        />
        <TelegramModal
          telegramModal1={telegramModal1}
          toggletelegramModal={toggletelegramModal}
          userSocial={userSocial}
          handleSocial={handleSocial}
        />
        <ul className="connecting-accounts-social-detail">{test()}</ul>
      </div>
      <button onClick={updateUser} className="btn btn-dark">
        Save
      </button>
    </React.Fragment>
  );
};

export default ProfileSocials;
