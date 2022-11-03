import React, {useState} from 'react';
// import { Link } from "react-router-dom";
import "./WalletHistory.scss";
// import AddUser from "../icons/AddUser";
import EditPencil from "../icons/EditPencil";
// import LinkIcon from "../icons/LinkIcon";
import DownArrow from "../icons/DownArrow.js";

const WalletHistory = () => {

  const [isOpen] = useState(false);
  // const toggleDropdown = () => setOpen(!isOpen);

  const activity = [
    { action: "changed profile name", date: "09.06.2022", time: "17:50" },
  ];

  const [items] = useState(activity);
  const [selectedItem, setSelectedItem] = useState(null);

  let [eventNumber, setEventNumber] = useState(0);

  const handleItemClick = (id) => {
    selectedItem === id ? setSelectedItem(null) : setSelectedItem(id);

    setEventNumber(eventNumber + 5);
  };
  const test = () => {
    return [...Array(eventNumber)].map((e, i) => (
      <>
        {items.map((item) => (
          <tr>
            <td>
              <EditPencil /> {item.action}
            </td>
            <td>{item.date}</td>
            <td>{item.time}</td>
          </tr>
        ))}
      </>
    ));
  };

  return (
    <>
      <table className="activity-table">
        <thead>
          <tr>
            <th>Txn Hash</th>
            <th>Method</th>
            <th>Block</th>
            <th>Date Time (UTC)</th>
            <th>From</th>
            <th>To</th>
            <th>Value</th>
            <th>Txn Fee</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <p className='token-value'>1c2e113285690685462324.....</p> 
            </td>
            <td>Claim</td>
            <td>15346353</td>
            <td>2022-08-15 13:45:13</td>
            <td><p className='token-value'>1c2e113285690685462324.....</p> </td>
            <td><p className='token-value'>1c2e113285690685462324.....</p> </td>
            <td>0 Ether</td>
            <td>0.‍00213579 </td>
          </tr>
          <tr>
            <td>
              <p className='token-value'>1c2e113285690685462324.....</p> 
            </td>
            <td>Claim</td>
            <td>15346353</td>
            <td>2022-08-15 13:45:13</td>
            <td><p className='token-value'>1c2e113285690685462324.....</p> </td>
            <td><p className='token-value'>1c2e113285690685462324.....</p> </td>
            <td>0 Ether</td>
            <td>0.‍00213579 </td>
          </tr>
          <tr>
            <td>
              <p className='token-value'>1c2e113285690685462324.....</p> 
            </td>
            <td>Claim</td>
            <td>15346353</td>
            <td>2022-08-15 13:45:13</td>
            <td><p className='token-value'>1c2e113285690685462324.....</p> </td>
            <td><p className='token-value'>1c2e113285690685462324.....</p> </td>
            <td>0 Ether</td>
            <td>0.‍00213579 </td>
          </tr>
          
          
          {test()}
        </tbody>
      </table>
      <div
        className={`mediaProfilepage-datacontent-profiledetail-body-activitybox-previous ${
          isOpen && "active"
        }`}
      >
        {items.map((item) => (
          <button
            className="mediaProfilepage-datacontent-profiledetail-body-activitybox-previous-prevdrop"
            onClick={(e) => handleItemClick(e.target.id)}
            id={item.id}
          >
            Previous activities <DownArrow />
          </button>
        ))}
      </div>
    </>
  )
}

export default WalletHistory;