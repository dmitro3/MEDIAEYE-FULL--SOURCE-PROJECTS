import React from "react";
import { Copy, LinkIcon, QRCode } from "../../icons";
import "./ProfileChangeBio.scss";
import Select from "react-select";
const ProfileChangeBio = ({ profile, setProfile, updateUser, handleProfile }) => {
  // const [relationStatus, setRelationStatus] = useState({
  //   label: "Single",
  //   value: "Single",
  // });

  const options = [
    { label: "Single", value: "Single" },
    { label: "In a relationship", value: "In a relationship" },
    { label: "Engaged", value: "Engaged" },
    { label: "Married", value: "Married" },
    { label: "In a civil union", value: "In a civil union" },
    { label: "In an open relationship", value: "In an open relationship" },
    { label: "It`s complicated", value: "It`s complicated" },
    { label: "Divorced", value: "Divorced" },
  ];

  const handleRelationship = (e) => {
    const temp = {...profile};
    temp.relationship = e.value;
    setProfile(temp);
  };

  return (
    <>
      <form className="mediaProfilepage-datacontent-profiledetail-body-form">
        <div className="d-flex text-align-center">
          <input
            name="username"
            value={profile.username}
            onChange={handleProfile}
            type="text"
            placeholder="Username"
          />
          <div className="input-div d-flex text-align-center text-between m-l-20">
            <div className="d-flex text-align-center">
              <LinkIcon angle={"straight"} />
              <span className="m-l-10">bit.ly/3w4hkt</span>
            </div>
            <div className="copy-container">
              <Copy />
              <span>Copy</span>
            </div>
          </div>
        </div>
        <div className="d-flex text-align-center">
          <input
            name="email"
            value={profile.email}
            onChange={handleProfile}
            type="email"
            placeholder="Email"
          />
          <div className="input-div d-flex text-align-center text-between m-l-20">
            <div className="d-flex text-align-center">
              <QRCode />
              <span className="m-l-10">QR Code</span>
            </div>
            <button className="btn btn-square btn-transperant">Generate</button>
          </div>
        </div>
        <textarea
          name="bio"
          value={profile.bio}
          onChange={handleProfile}
          placeholder="Bio"
        ></textarea>
        <div className="m-t-20">
          <Select
            options={options}
            value={profile.relationsship}
            className="mediaeyeAvatar-select"
            classNamePrefix="mediaeyeAvatar-select"
            onChange={(value) => handleRelationship(value)}
            defaultValue={{ label: "Single", value: "Single" }}
          />
        </div>
      </form>
      <div className="d-flex text-align-center">
        <button onClick={updateUser} className="btn btn-dark">
          Save
        </button>
        <button onClick={updateUser} className="btn btn-info m-l-15 m-t-40">
          Verification
        </button>
      </div>
    </>
  );
};

export default ProfileChangeBio;
