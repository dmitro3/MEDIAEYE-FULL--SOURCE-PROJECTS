import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Library.scss";
// import Privatetab from "./PrivateTabs";
import PrivateCard from "./PrivateCard";
import DownArrow from "../../Components/icons/DownArrow";

const PrivateLibrary = () => {

  const [isOpenDropdown, setOpenDropdown] = useState(false);

  const toggleHeaderDropdown = () => setOpenDropdown(!isOpenDropdown);

  const [selectData, setSeletData] = useState("All");
  const searchData = (type) => {
    setSeletData(type);
  }

  return (
    <React.Fragment>
      <div className="medialibrarypage">
        <div className="medialibrarypage-header">
          <div className="medialibrarypage-header-inside">
            {/* <UserCircle /> */}
            <h5 className="medialibrarypage-header-inside-title">
              METAVATAR Private Library
            </h5>
          </div>
        </div>
        <div className="mediaLibrarypage">
            <div className="library-tabs">
            <div className="library-tabs-inner">
              <button className={selectData === "All" ? "btntab active": "btntab"} onClick={() => {searchData("All")}}>All Content</button>
              <button className={selectData === "2D" ? "btntab active": "btntab"} onClick={() => {searchData("2D")}}>2D Content</button>
              <button className={selectData === "3D" ? "btntab active": "btntab"} onClick={() => {searchData("3D")}}>3D Content</button>
            </div>
            <div className="library-tabs-right">
              <Link to="/purchase-history" className="btntab">Purchase History</Link>
              <Link to="/saleshistory" className="btntab">Sales History</Link>

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
                  <li className="sortfilter-list-name" onClick={() => {searchData("2D")}}>2d</li>
                  <li className="sortfilter-list-name" onClick={() => {searchData("3D")}}>3d</li>
                </ul>
                : null }
              </div>
            </div>
          </div>
          <div className="mediaLibrarypage-contentdata">
            <PrivateCard type={selectData} />
          </div>
          <div className="mediaLibrarypage-uploaddata">
            <button className="contentbtn">Upload Content</button>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};
export default PrivateLibrary;
