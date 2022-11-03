import React, {useState} from 'react';
import "./NftHistory.scss";
import EditPencil from "../icons/EditPencil";
import DownArrow from "../icons/DownArrow.js";

const NftHistory = () => {

  const [isOpen,] = useState(false);
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
            <th>Age</th>
            <th>From</th>
            <th>To</th>
            <th>Token ID</th>
            <th>Token</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <p className='token-value'>1c2e113285690685462324.....</p> 
            </td>
            <td>2022-08-15 13:45:13</td>
            <td><p className='token-value'>1c2e113285690685462324.....</p> </td>
            <td><p className='token-value'>1c2e113285690685462324.....</p> </td>
            <td>11</td>
            <td>Test 3 (123)</td>
          </tr>
          <tr>
            <td>
              <p className='token-value'>1c2e113285690685462324.....</p> 
            </td>
            <td>2022-08-15 13:45:13</td>
            <td><p className='token-value'>1c2e113285690685462324.....</p> </td>
            <td><p className='token-value'>1c2e113285690685462324.....</p> </td>
            <td>11</td>
            <td>Test 3 (123)</td>
          </tr>
          <tr>
            <td>
              <p className='token-value'>1c2e113285690685462324.....</p> 
            </td>
            <td>2022-08-15 13:45:13</td>
            <td><p className='token-value'>1c2e113285690685462324.....</p> </td>
            <td><p className='token-value'>1c2e113285690685462324.....</p> </td>
            <td>11</td>
            <td>Test 3 (123)</td>
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

export default NftHistory;