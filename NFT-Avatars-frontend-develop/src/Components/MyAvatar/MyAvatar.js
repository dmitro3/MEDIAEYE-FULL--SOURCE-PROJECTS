import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./MyAvatar.scss";
import AddIcon from "../icons/Add_icon";
import { avatarService, baseUrl } from "../../services/api.service";

const MyAvatar = () => {
  const [avatars, setAvatars] = useState([]);

  useEffect(() => {
    async function getAvatars() {
      const res = await avatarService.fetch();
      setAvatars(res);
    }
    getAvatars();
  }, []);
  const navigate = useNavigate();
  const navigateToAvatar = () => {
    navigate("/create-avatar");
  };
  const navigateTocollection = () => {
    navigate("/collection");
  };

  return (
    <React.Fragment>
      <div className="pd-35">
        <button className="btn btn-info" onClick={navigateTocollection}>
          Create Collection
        </button>
      </div>
      <div className="mediaProfilepage-datacontent-profiledetail-body-avatarbox">
        {
          avatars.map((avatar, i) => (
            <div key={i} className="useravatar">
              <img src={`${baseUrl}/upload/${avatar.filename}`} className="" alt="user profile img" />
              {/* <span>Lorem Ipsums</span> */}
            </div>
          ))
        }
        <div className="useravatar">
          <button className="useravatar-create" onClick={navigateToAvatar}>
            <AddIcon />
          </button>
          <span>Create New</span>
        </div>
      </div>
      {/* <div className='center pd-50 pu-50'><button className='btn btn-info'>Mint NFT</button></div> */}
    </React.Fragment>
  );
};

export default MyAvatar;
