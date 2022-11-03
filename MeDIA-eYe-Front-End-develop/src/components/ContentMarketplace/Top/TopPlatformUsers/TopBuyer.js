import React, { useEffect, useState } from 'react';
import TopSellersBlock from '../../TopSellersBlock/TopSellersBlock';
import { useMoralis } from 'react-moralis';
import { useSelector } from 'react-redux';
import { TopSellersJson } from '../../../../utils/JsonData';
import './TopPlatformUsers.scss';
export default function TopBuyer(props) {
  const [sellers, setSellers] = useState([]);
  const { isInitialized, Moralis } = useMoralis();
  const activeNetwork = useSelector((state) => state.app.activeNetwork);

  // const fetchTopUsers = async () => {
  //   try {
  //     const params = { chain: activeNetwork };
  //     const result = await Moralis.Cloud.run('queryTopUsers', params);
  //     if (result && result.length > 0) {
  //       setSellers(result);
  //     }
  //   } catch (e) {
  //     console.log(e);
  //   }
  // };

  // useEffect(() => {
  //   if (isInitialized) {
  //     fetchTopUsers();
  //   }
  // }, [isInitialized, activeNetwork]);

  return (
    <div className="mediaeye-platform-users">
      <div className="mediaeye-topsellers-row">
        {sellers.map((seller, i) => (
          <TopSellersBlock key={i} seller={seller} />
        ))}
      </div>
    </div>
  );
}
