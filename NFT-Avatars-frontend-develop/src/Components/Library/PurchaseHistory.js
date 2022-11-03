import React, {useState} from 'react'
import "./Library.scss";
import { Link } from "react-router-dom";
import search from '../../assets/images/search.png';
import panda from '../../assets/images/pandaAvatar.png';
import Eth from '../../assets/images/Wallet/ETH.png';
import DownArrow from "../../Components/icons/DownArrow";

const PurchaseHistory = () => {
    const [isOpenDropdown, setOpenDropdown] = useState(false);

    const toggleHeaderDropdown = () => setOpenDropdown(!isOpenDropdown);
  
    const [selectData, setSeletData] = useState("All");
    const searchData = (type) => {
      setSeletData(type);
    }
  return (
    <React.Fragment>
    <div className='mediaProfilepage-wrap'>
    <div className='mediaeyeAvatar-layout-middle'>
     <div className='mediaeyeAvatar-layout-container'>
     <div className='salesHistory'>
     <div className='salesHistory-inner'>
     <h1 className='title'>Purchase History</h1>
     <div className='salesHistory-inner-searchbar'>
     <div className='search-btn'>
     <img className='search-image' src={search} alt=""/>
    <input type="text" placeholder='search' className='search-input'/></div>
    <div className='search-tabs'>
    <Link to="/saleshistory" className="sales-btn">Sales History</Link>
    <div className={isOpenDropdown ? "all-tab active3" : "all-tab"}onClick={toggleHeaderDropdown}>
    <span className='all-date-tab'><p className='all-dates-name'>All Dates{selectData}</p><DownArrow/></span>
    {isOpenDropdown ?
      <ul className="all-tab-list">
        <li className="all-tab-list-name" onClick={() => {searchData("All")}}>All</li>
        <li className="all-tab-list-name" onClick={() => {searchData("2D")}}>2d</li>
        <li className="all-tab-list-name" onClick={() => {searchData("3D")}}>3d</li>
      </ul>
      : null }
    </div> 

    </div>
     
     </div>
     <div className='salesHistory-inner-table'>
     <div className="salesHistory-inner-table-head">
        <table className='salesHistory-head-data'>
            <tbody>
            <tr>
                <td>Library Name</td>
                <td>Library creator</td>
                <td>Sale Date</td>
                <td>Customer</td>
                <td>Library Price</td>
                <td>Qty of Assests</td>
            </tr>
            </tbody>
            </table>
     </div>
     <div className="salesHistory-inner-table-head content-table">
        <table className='salesHistory-content-data'>
            <tbody>
            <tr>
           <td><p className='sale-title'><img src={panda} alt="" />Panda Avatar</p></td>
                <td>Bestie</td>
                <td>2022-09-20 11:47:39</td>
                <td>123KKlasav</td>
                <td><p className='sale-title'><img src={Eth} alt="" className="token-img"/>0.1ETh</p></td>
                <td>10</td>
            </tr>
            <tr>
            <td><p className='sale-title'><img src={panda} alt="" />Panda Avatar</p></td>
                 <td>Bestie</td>
                 <td>2022-09-20 11:47:39</td>
                 <td>123KKlasav</td>
                 <td><p className='sale-title'><img src={Eth} alt="" className="token-img"/>0.1ETh</p></td>
                 <td>10</td>
             </tr>
             <tr>
             <td><p className='sale-title'><img src={panda} alt="" />Panda Avatar</p></td>
                  <td>Bestie</td>
                  <td>2022-09-20 11:47:39</td>
                  <td>123KKlasav</td>
                  <td><p className='sale-title'><img src={Eth} alt="" className="token-img"/>0.1ETh</p></td>
                  <td>10</td>
              </tr>
              <tr>
              <td><p className='sale-title'><img src={panda} alt="" />Panda Avatar</p></td>
                   <td>Bestie</td>
                   <td>2022-09-20 11:47:39</td>
                   <td>123KKlasav</td>
                   <td><p className='sale-title'><img src={Eth} alt="" className="token-img"/>0.1ETh</p></td>
                   <td>10</td>
               </tr>
               <tr>
               <td><p className='sale-title'><img src={panda} alt="" />Panda Avatar</p></td>
                    <td>Bestie</td>
                    <td>2022-09-20 11:47:39</td>
                    <td>123KKlasav</td>
                    <td><p className='sale-title'><img src={Eth} alt="" className="token-img"/>0.1ETh</p></td>
                    <td>10</td>
                </tr>
                <tr>
                <td><p className='sale-title'><img src={panda} alt="" />Panda Avatar</p></td>
                     <td>Bestie</td>
                     <td>2022-09-20 11:47:39</td>
                     <td>123KKlasav</td>
                     <td><p className='sale-title'><img src={Eth} alt="" className="token-img"/>0.1ETh</p></td>
                     <td>10</td>
                 </tr>
                 <tr>
                 <td><p className='sale-title'><img src={panda} alt="" />Panda Avatar</p></td>
                      <td>Bestie</td>
                      <td>2022-09-20 11:47:39</td>
                      <td>123KKlasav</td>
                      <td><p className='sale-title'><img src={Eth} alt="" className="token-img"/>0.1ETh</p></td>
                      <td>10</td>
                  </tr>
            </tbody>
            </table>
     </div>
 
     </div>


     </div>
     </div>
     </div>
    </div>
    
    </div>

    </React.Fragment>
  )
}

export default PurchaseHistory;
