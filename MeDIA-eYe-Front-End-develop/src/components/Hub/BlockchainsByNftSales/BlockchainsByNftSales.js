import React, { useState } from 'react';
import SelectSearch from 'react-select-search';
import './BlockchainsByNftSales.scss';
import { useHistory } from 'react-router-dom';

export default function BlockchainsByNftSales() {
  const history = useHistory();
  const [activeHour, setActiveHour] = useState('24 h');

  const hourOptions = [
    {
      name: '24 h',
      value: '24 h'
    },
    {
      name: '7 d',
      value: '7 d'
    },
    {
      name: '30 d',
      value: '30 d'
    },
    {
      name: 'All',
      value: 'All'
    }
  ];

  return (
    <div className="blockchains-bynftsales">
      <div className="blockchains-bynftsales-header">
        <span>Blockchains by NFT Sales Volume</span>
        <div className="mediaeye-select-poptrend days-filter">
          <SelectSearch
            className="mediaeye-selectsearch mediaeye-selectsearch-white-arrow dark-style"
            size="lg"
            options={hourOptions}
            value={activeHour}
            onChange={(opt) => setActiveHour(opt)}
          />
        </div>
      </div>
      <div className="mediaeyefancyScroll">
        <div className="blockchains-bynftsales-inner">
          <table>
            <thead>
              <tr>
                <th className="blockchains-bynftsales-inner-srno"></th>
                <th>Blockchain</th>
                <th>Sales</th>
                <th>Change (24h)</th>
                <th>Buyers</th>
                <th>Txns</th>
              </tr>
            </thead>
            <tbody>
              <tr onClick={() => history.push('/sale-details')}>
                <td className="blockchains-bynftsales-inner-srno">1</td>
                <td>
                  <div className="blockchains-bynftsales-inner-network">
                    <img src="img/token/34/ETH.png" alt="ETH" />
                    <span>Ethereum</span>
                  </div>
                </td>
                <td>$ 19,012.7</td>
                <td className="text-action">+56.055%</td>
                <td>556</td>
                <td>16,856</td>
              </tr>
              <tr onClick={() => history.push('/sale-details')}>
                <td className="blockchains-bynftsales-inner-srno">2</td>
                <td>
                  <div className="blockchains-bynftsales-inner-network">
                    <img src="img/token/polygon.png" alt="Polygon" />
                    <span>Polygon</span>
                  </div>
                </td>
                <td>$ 19,012.7</td>
                <td className="text-danger">-56.055%</td>
                <td>556</td>
                <td>1,856</td>
              </tr>
              <tr onClick={() => history.push('/sale-details')}>
                <td className="blockchains-bynftsales-inner-srno">3</td>
                <td>
                  <div className="blockchains-bynftsales-inner-network">
                    <img src="img/token/BNB.png" alt="BNB" />
                    <span>Binance</span>
                  </div>
                </td>
                <td>$ 19,012.7</td>
                <td className="text-gray">---</td>
                <td>556</td>
                <td>56</td>
              </tr>
              <tr onClick={() => history.push('/sale-details')}>
                <td className="blockchains-bynftsales-inner-srno">4</td>
                <td>
                  <div className="blockchains-bynftsales-inner-network">
                    <img src="img/token/FTM.png" alt="FTM" />
                    <span>Fantom</span>
                  </div>
                </td>
                <td>$ 19,012.7</td>
                <td className="text-danger">-56.055%</td>
                <td>556</td>
                <td>22,856</td>
              </tr>
              <tr onClick={() => history.push('/sale-details')}>
                <td className="blockchains-bynftsales-inner-srno">5</td>
                <td>
                  <div className="blockchains-bynftsales-inner-network">
                    <img src="img/token/near.png" alt="Token" />
                    <span>Near</span>
                  </div>
                </td>
                <td>$ 19,012.7</td>
                <td className="text-action">+56.055%</td>
                <td>556</td>
                <td>6</td>
              </tr>
              <tr onClick={() => history.push('/sale-details')}>
                <td className="blockchains-bynftsales-inner-srno">1</td>
                <td>
                  <div className="blockchains-bynftsales-inner-network">
                    <img src="img/token/34/ETH.png" alt="ETH" />
                    <span>Ethereum</span>
                  </div>
                </td>
                <td>$ 19,012.7</td>
                <td className="text-action">+56.055%</td>
                <td>556</td>
                <td>16,856</td>
              </tr>
              <tr onClick={() => history.push('/sale-details')}>
                <td className="blockchains-bynftsales-inner-srno">2</td>
                <td>
                  <div className="blockchains-bynftsales-inner-network">
                    <img src="img/token/polygon.png" alt="Polygon" />
                    <span>Polygon</span>
                  </div>
                </td>
                <td>$ 19,012.7</td>
                <td className="text-danger">-56.055%</td>
                <td>556</td>
                <td>1,856</td>
              </tr>
              <tr onClick={() => history.push('/sale-details')}>
                <td className="blockchains-bynftsales-inner-srno">3</td>
                <td>
                  <div className="blockchains-bynftsales-inner-network">
                    <img src="img/token/BNB.png" alt="BNB" />
                    <span>Binance</span>
                  </div>
                </td>
                <td>$ 19,012.7</td>
                <td className="text-gray">---</td>
                <td>556</td>
                <td>56</td>
              </tr>
              <tr onClick={() => history.push('/sale-details')}>
                <td className="blockchains-bynftsales-inner-srno">4</td>
                <td>
                  <div className="blockchains-bynftsales-inner-network">
                    <img src="img/token/FTM.png" alt="FTM" />
                    <span>Fantom</span>
                  </div>
                </td>
                <td>$ 19,012.7</td>
                <td className="text-danger">-56.055%</td>
                <td>556</td>
                <td>22,856</td>
              </tr>
              <tr onClick={() => history.push('/sale-details')}>
                <td className="blockchains-bynftsales-inner-srno">5</td>
                <td>
                  <div className="blockchains-bynftsales-inner-network">
                    <img src="img/token/near.png" alt="Token" />
                    <span>Near</span>
                  </div>
                </td>
                <td>$ 19,012.7</td>
                <td className="text-action">+56.055%</td>
                <td>556</td>
                <td>6</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
