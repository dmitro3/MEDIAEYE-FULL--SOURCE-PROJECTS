import React, {useState} from 'react';
import "./VotingHistory.scss";
// import AddUser from "../icons/AddUser";
import EditPencil from "../icons/EditPencil";
// import LinkIcon from "../icons/LinkIcon";
import DownArrow from "../icons/DownArrow.js";

const VotingHistory = () => {

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
            <th>Rank</th>
            <th>Proposals Voted</th>
            <th>Vote Weight</th>
            <th></th>
            <th>Total Votes</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <p className='token-value'><span className='token-num'>1</span> 1c2e113285690685462324.....</p> 
            </td>
            <td>12</td>
            <td>6.783%</td>
            <td>Delegate</td>
            <td>15 000 00 votes</td>
          </tr>
          <tr>
            <td>
              <p className='token-value'><span className='token-num'>1</span> 1c2e113285690685462324.....</p> 
            </td>
            <td>12</td>
            <td>6.783%</td>
            <td>Delegate</td>
            <td>15 000 00 votes</td>
          </tr>
          <tr>
            <td>
              <p className='token-value'><span className='token-num'>1</span> 1c2e113285690685462324.....</p> 
            </td>
            <td>12</td>
            <td>6.783%</td>
            <td>Delegate</td>
            <td>15 000 00 votes</td>
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

export default VotingHistory;