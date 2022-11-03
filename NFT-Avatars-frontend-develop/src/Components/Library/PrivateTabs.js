import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Library.scss";
import DownArrow from "../../Components/icons/DownArrow";
import Select from "react-select";

const PrivateTabs = () => {
  // const [isOptionsOpen, setIsOptionsOpen] = useState(false);
  // const [selectedOption, setSelectedOption] = useState(0);

  // const options = [
  //   { value: "All", label: "All", className: "menu-item" },
  //   { value: "socials", label: "Socials", className: "menu-item" },
  //   { value: "music", label: "Music", className: "menu-item" },
  // ];

  // const toggleOptions = () => {
  //   setIsOptionsOpen(!isOptionsOpen);
  // };

  return (
    <React.Fragment>
      <div className="library-tabs">
        <div className="library-tabs-inner">
          <button className="btntab">All Content</button>
          <button className="btntab">2D Content</button>
          <button className="btntab">3D Content</button>
        </div>
        <div className="library-tabs-right">
          <button className="btntab">Purchase </button>
          <button className="btntab">Sales History</button>
          {/* <ul className="sortfilter">
            <li>
              <Select options={options} placeholder="Sort By" />
            </li>
          </ul> */}
          <div className="sortfilter">
            <span className="sortgrp"><p className="sortfilter-name">Sort By: All</p><DownArrow /></span>
            <ul className="sortfilter-list">
              <li className="sortfilter-list-name">All</li>
              <li className="sortfilter-list-name">2d</li>
              <li className="sortfilter-list-name">3d</li>
            </ul>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};
export default PrivateTabs;
