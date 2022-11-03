import React, {useState} from 'react';
import "./DefiHistory.scss";
import EditPencil from "../icons/EditPencil";
import etherscan from "../../assets/images/Wallet/etherscan.png";

const DefiHistory = () => {

  const activity = [
    { action: "changed profile name", date: "09.06.2022", time: "17:50" },
  ];

  const [items] = useState(activity);
  // const [selectedItem, setSelectedItem] = useState(null);

  let [eventNumber,] = useState(0);

  // const handleItemClick = (id) => {
  //   selectedItem == id ? setSelectedItem(null) : setSelectedItem(id);

  //   setEventNumber(eventNumber + 5);
  // };
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
      <div className='defi-history'>
        <table className="defi-history-table-header">
          <tbody className='defi-history-table-header-body'>
            <tr>
              <td>DeFi Project</td>
              <td>Lend</td>
              <td> </td>
              <td>Borrow</td>
              <td></td>
              <td></td>
            </tr>
           </tbody>
          </table>
        <div className='defi-history-table-body'>
          <table className="defi-history-table-body-main">            
            <tbody className='defi-history-table-body-main-indata'>
            <tr>
                <td>
                  rASKO 
                </td>
                <td>10 000 000</td>
                <td> </td>
                <td>10 000 000 </td>
                <td></td>
                <td><img src={etherscan} className='' alt="etherscan"/></td>
              </tr>
              <tr>
                <td>
                  rASKO 
                </td>
                <td>10 000 000</td>
                <td> </td>
                <td>10 000 000 </td>
                <td></td>
                <td><img src={etherscan} className='' alt="etherscan"/></td>
              </tr>
              <tr>
                <td>
                  rASKO 
                </td>
                <td>10 000 000</td>
                <td> </td>
                <td>10 000 000 </td>
                <td></td>
                <td><img src={etherscan} className='' alt="etherscan"/></td>
              </tr>
              <tr>
                <td>
                  rASKO 
                </td>
                <td>10 000 000</td>
                <td> </td>
                <td>10 000 000 </td>
                <td></td>
                <td><img src={etherscan} className='' alt="etherscan"/></td>
              </tr>
              <tr>
                <td>
                  rASKO 
                </td>
                <td>10 000 000</td>
                <td> </td>
                <td>10 000 000 </td>
                <td></td>
                <td><img src={etherscan} className='' alt="etherscan"/></td>
              </tr>
              <tr>
                <td>
                  rASKO 
                </td>
                <td>10 000 000</td>
                <td> </td>
                <td>10 000 000 </td>
                <td></td>
                <td><img src={etherscan} className='' alt="etherscan"/></td>
              </tr>
              <tr>
                <td>
                  rASKO 
                </td>
                <td>10 000 000</td>
                <td> </td>
                <td>10 000 000 </td>
                <td></td>
                <td><img src={etherscan} className='' alt="etherscan"/></td>
              </tr>
              <tr>
                <td>
                  rASKO 
                </td>
                <td>10 000 000</td>
                <td> </td>
                <td>10 000 000 </td>
                <td></td>
                <td><img src={etherscan} className='' alt="etherscan"/></td>
              </tr>
              <tr>
                <td>
                  rASKO 
                </td>
                <td>10 000 000</td>
                <td> </td>
                <td>10 000 000 </td>
                <td></td>
                <td><img src={etherscan} className='' alt="etherscan"/></td>
              </tr>
              <tr>
                <td>
                  rASKO 
                </td>
                <td>10 000 000</td>
                <td> </td>
                <td>10 000 000 </td>
                <td></td>
                <td><img src={etherscan} className='' alt="etherscan"/></td>
              </tr>
              <tr>
                <td>
                  rASKO 
                </td>
                <td>10 000 000</td>
                <td> </td>
                <td>10 000 000 </td>
                <td></td>
                <td><img src={etherscan} className='' alt="etherscan"/></td>
              </tr>
              
              {test()}
            </tbody>
            
          </table>
        </div>
        <div className='defi-history-table-footer'>
          <table className="defi-history-table-footer-body">
            <tbody className='defi-history-table-footer-body-main'>
              <tr>
                <td>TOTAL</td>
                <td>60 000 000</td>
                <td></td>
                <td>60 000 000</td>
                <td></td>
                <td></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}

export default DefiHistory;