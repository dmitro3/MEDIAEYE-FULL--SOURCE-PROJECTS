import React, { useState } from "react";
import "./ProfileCommunities.scss";
import AddIcon from "../../icons/Add_icon";
import Right from "../../icons/Right";
import DownArrow from "../../icons/DownArrow";

const options = [{ label: "Admin" }, { label: "Member" }, { label: "Owner" }];

const ProfileCommunities = ({ communities, handleCommunities, updateUser }) => {
  const [isOpen, setOpen] = useState(false);
  const toggleDropdown1 = (index) => {
    if (index === 0) return;
    setOpen(index);
  };

  const handleItemClick = (index, status) => {
    let temp = [...communities];
    temp[index].status = status;
    handleCommunities(temp);
    setOpen();
  };

  const addEventList = () => {
    let temp = [...communities];
    temp.push({
      link: "",
      status: "Member",
    });
    handleCommunities(temp);
  };

  // handle change link
  const handleChangeLink = (index, event) => {
    let temp = [...communities];
    temp[index].link = event.target.value;
    handleCommunities(temp);
  };

  return (
    <React.Fragment>
      <div className="communities-wrap">
        <div className="communities-wrap-header">
          <span className="communities-wrap-header-title">Title & Link</span>
          <span className="communities-wrap-header-title">Status</span>
        </div>
        <div className="communities-wrap-body">
          {communities.map((community, i) => (
            <div key={i} className="communities-wrap-body-row">
              <input
                disabled={i === 0}
                style={{ outline: "none" }}
                value={community.link}
                onChange={(e) => handleChangeLink(i, e)}
                className="communities-wrap-body-row-link-box"
              />
              <div className="communities-wrap-body-row-dropdown">
                <button
                  className={` ${isOpen === i && "active"}`}
                  onClick={() => toggleDropdown1(i)}
                >
                  {!!community.status ? community.status : "Status"}
                  <DownArrow />
                </button>
                <span></span>
                <div
                  className={`communities-wrap-body-row-dropdown-items ${
                    isOpen === i && "open"
                  }`}
                >
                  {options.map((item) => (
                    <div
                      key={item}
                      className="dropdown-item"
                      onClick={(e) => handleItemClick(i, item.label)}
                    >
                      <span
                        className={`dropdown-item-dot ${
                          item.label === community.status && "selected"
                        }`}
                      ></span>
                      {item.label}
                    </div>
                  ))}
                </div>
              </div>

              <div className="communities-wrap-body-row-check">
                <input
                  className="communities-wrap-body-row-check-input"
                  type="checkbox"
                  id="com_row_2"
                />{" "}
                <label htmlFor="com_row_2">
                  <Right />
                </label>
              </div>
              <button
                className="communities-wrap-body-row-add-btn"
                onClick={addEventList}
              >
                <AddIcon />
                Add
              </button>
            </div>
          ))}
        </div>
      </div>
      <button onClick={updateUser} className="btn btn-dark">
        Save
      </button>
    </React.Fragment>
  );
};

export default ProfileCommunities;
