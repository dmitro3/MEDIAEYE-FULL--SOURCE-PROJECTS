import React, { useState } from "react";
import "./ProfilePreferred.scss";
import LinkIcon from "../../icons/LinkIcon";
import Right from "../../icons/Right";
import ShareOptions from "../../Modals/ShareOptions/ShareOptions";

const ProfilePreferred = ({ updateUser }) => {
  const [shareOptions, setShare] = useState(false);

  const toggleShareOptions = () => {
    setShare(!shareOptions);
  };

  const [addActive, setAddActive] = useState();

  const ToggleAdd = (id) => {
    if (addActive === id) {
      setAddActive(null);
    } else {
      setAddActive(id);
    }
  };
  return (
    <React.Fragment>
      <ShareOptions
        shareOptions={shareOptions}
        toggleShareOptions={toggleShareOptions}
      />

      <div className="communities-wrap preferred-wrap">
        <ShareOptions />
        <div className="communities-wrap-header">
          <span className="communities-wrap-header-title">
            Brand Name & Link
          </span>
        </div>
        <div className="communities-wrap-body">
          <div className="communities-wrap-body-row">
            <div className="communities-wrap-body-row-link-box">
              <span>Adidas</span> <LinkIcon />
              <div className="communities-wrap-body-row-link-box-tootltip">
                <span>adidas.com</span> <Right />
              </div>
            </div>

            <button
              className={
                addActive === 1
                  ? "active communities-wrap-body-row-add-btn"
                  : " communities-wrap-body-row-add-btn"
              }
              onClick={() => ToggleAdd(1)}
            >
              {" "}
              {addActive === 1 ? "Added" : "Add"}{" "}
            </button>
            <button
              className="communities-wrap-body-row-add-btn share"
              onClick={() => toggleShareOptions()}
            >
              Share{" "}
            </button>
          </div>

          <div className="communities-wrap-body-row">
            <div className="communities-wrap-body-row-link-box">
              <span>Nike</span> <LinkIcon />
              <div className="communities-wrap-body-row-link-box-tootltip">
                <span>nike.com</span> <Right />
              </div>
            </div>

            <button
              className={
                addActive === 2
                  ? "active communities-wrap-body-row-add-btn"
                  : " communities-wrap-body-row-add-btn"
              }
              onClick={() => ToggleAdd(2)}
            >
              {addActive === 2 ? "Added" : "Add"}{" "}
            </button>
            <button
              className="communities-wrap-body-row-add-btn share"
              onClick={() => toggleShareOptions()}
            >
              Share{" "}
            </button>
          </div>

          <div className="communities-wrap-body-row">
            <div className="communities-wrap-body-row-link-box">
              <span> Apple</span> <LinkIcon />
              <div className="communities-wrap-body-row-link-box-tootltip">
                <span>apple.com</span> <Right />
              </div>
            </div>

            <button
              className={
                addActive === 3
                  ? "active communities-wrap-body-row-add-btn"
                  : " communities-wrap-body-row-add-btn"
              }
              onClick={() => ToggleAdd(3)}
            >
              {addActive === 3 ? "Added" : "Add"}{" "}
            </button>
            <button
              className="communities-wrap-body-row-add-btn share"
              onClick={() => toggleShareOptions()}
            >
              Share{" "}
            </button>
          </div>
        </div>
      </div>
      <button onClick={updateUser} className="btn btn-dark">
        Save
      </button>
    </React.Fragment>
  );
};

export default ProfilePreferred;
