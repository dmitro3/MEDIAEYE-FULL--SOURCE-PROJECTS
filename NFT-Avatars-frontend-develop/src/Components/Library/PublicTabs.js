import React, { useState } from "react";
import "./Library.scss";
import DownArrow from "../../Components/icons/DownArrow";
// import Select from "react-select";

const PublicTabs = () => {
  const [isOpenDropdown, setOpenDropdown] = useState(false);

  const toggleHeaderDropdown = () => setOpenDropdown(!isOpenDropdown);

  const [selectData, setSeletData] = useState("All");
  const searchData = (type) => {
    setSeletData(type);
  }
  return (
    <React.Fragment>
      <div className="library-tabs">
        <div className="library-tabs-inner">
          <button className="btntab" onClick={() => {searchData("All")}}>All Content</button>
          <button className="btntab" onClick={() => {searchData("2D")}}>2D Content</button>
          <button className="btntab" onClick={() => {searchData("3D")}}>3D Content</button>
        </div>
        <div className="library-tabs-right">
          {/* <button className="btntab">Purchase History</button> */}
          {/* <ul className="sortfilter">
            <li>
              <Select options={options} placeholder="Sort By" />
            </li>
          </ul> */}
          <div className = {isOpenDropdown ? "sortfilter active2" : "sortfilter"} onClick={toggleHeaderDropdown}>
            <span className="sortgrp"><p className="sortfilter-name">Sort By: {selectData}</p><DownArrow/></span>
            {isOpenDropdown ?
            <ul className="sortfilter-list">
              <li className="sortfilter-list-name" onClick={() => {searchData("All")}}>All</li>
              <li className="sortfilter-list-name" onClick={() => {searchData("2d")}}>2d</li>
              <li className="sortfilter-list-name" onClick={() => {searchData("3d")}}>3d</li>
            </ul>
            : null }
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};
export default PublicTabs;
