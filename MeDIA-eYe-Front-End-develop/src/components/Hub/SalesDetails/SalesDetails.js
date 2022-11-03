import React, { useState } from 'react';
import './SalesDetails.scss';
import { Link, useHistory } from 'react-router-dom';
import { Chart } from '../../Stats/Chart/Chart';
import { Transfer } from '../../Icons';

export default function SalesDetails() {
  const [nftSoldValues, setNftSoldValues] = useState([
    33, 53, 505, 53, 312, 111, 245, 11, 41, 44, 65, 545, 511, 211, 83, 43, 199,
    53, 505, 41, 44, 65, 545, 511, 211, 83, 33, 53, 505, 41, 44, 65, 545, 511,
    211, 83, 43, 199, 53, 505, 41, 44, 65, 545, 511, 211
  ]);
  const [nftSoldLabels, setNftSoldLabels] = useState([
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sept',
    'Oct',
    'Nov',
    'Dec',
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sept',
    'Oct',
    'Nov',
    'Dec'
  ]);

  const tableContent = [
    {
      month: 'October',
      sales: '$3,041.35',
      buyer: '33',
      seller: '33',
      transaction: '566',
      avg: '$59.95'
    },
    {
      month: 'September',
      sales: '$7,320.00',
      buyer: '77',
      seller: '51',
      transaction: '185',
      avg: '$2,649.00'
    },
    {
      month: 'March',
      sales: '$3,041.35',
      buyer: '33',
      seller: '33',
      transaction: '647',
      avg: '$2,943.00'
    },
    {
      month: 'April',
      sales: '$3,041.35',
      buyer: '33',
      seller: '33',
      transaction: '536',
      avg: '$6,566.00'
    },
    {
      month: 'December',
      sales: '$3,041.35',
      buyer: '33',
      seller: '33',
      transaction: '177',
      avg: '$3,173.00'
    },
    {
      month: 'May',
      sales: '$3,041.35',
      buyer: '33',
      seller: '33',
      transaction: '357',
      avg: '$6,432.00'
    },
    {
      month: 'November',
      sales: '$3,041.35',
      buyer: '33',
      seller: '33',
      transaction: '453',
      avg: '$8,508.00'
    },
    {
      month: 'October',
      sales: '$3,041.35',
      buyer: '33',
      seller: '33',
      transaction: '877',
      avg: '$7,245.00'
    },
    {
      month: 'July',
      sales: '$3,041.35',
      buyer: '33',
      seller: '33',
      transaction: '556',
      avg: '$2,652.00'
    },
    {
      month: 'June',
      sales: '$3,041.35',
      buyer: '33',
      seller: '33',
      transaction: '492',
      avg: '$7,508.00'
    },
    {
      month: 'January',
      sales: '$3,041.35',
      buyer: '33',
      seller: '33',
      transaction: '154',
      avg: '$3,372.00'
    }
  ];

  return (
    <div className="mediaeye-layout-content sale-detail-page">
      <div className="mediaeye-layout-container">
        <div className="mediaeye-layout-section-header text-center m-t-30">
          <h2 className="mediaeye-layout-section-header-heading">
            Ethereum: Sales Data & Graph
          </h2>
        </div>
        <div className="sale-detail-page-inner">
          <div className="sale-detail-page-inner-graph">
            <Chart
              title={'NFT Trade Volume'}
              values={nftSoldValues}
              labels={nftSoldLabels}
            />
          </div>
          <div className="sale-detail-page-inner-content">
            <table>
              <thead>
                <tr>
                  <th>
                    <div className="sale-detail-page-inner-content-headers">
                      <span>Month</span>
                      <Transfer />
                    </div>
                  </th>
                  <th>
                    <div className="sale-detail-page-inner-content-headers">
                      <span>Sales (USD)</span>
                      <Transfer />
                    </div>
                  </th>
                  <th>
                    <div className="sale-detail-page-inner-content-headers">
                      <span> Unique Buyers </span>
                      <Transfer />
                    </div>
                  </th>
                  <th>
                    <div className="sale-detail-page-inner-content-headers">
                      <span>Unique Sellers </span>
                      <Transfer />
                    </div>
                  </th>
                  <th>
                    <div className="sale-detail-page-inner-content-headers">
                      <span>Total Transactions</span>
                      <Transfer />
                    </div>
                  </th>
                  <th>
                    <div className="sale-detail-page-inner-content-headers">
                      <span>Avg Sale (USD)</span>
                      <Transfer />
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {tableContent.map((item) => (
                  <tr>
                    <td className="text-gray">{item.month}</td>
                    <td>{item.sales}</td>
                    <td>{item.buyer}</td>
                    <td>{item.seller}</td>
                    <td>{item.transaction}</td>
                    <td>{item.avg}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
