import React, { useEffect, useState } from 'react';
import TopSellersBlock from '../../TopSellersBlock/TopSellersBlock';
import { useMoralis } from 'react-moralis';
import { useSelector } from 'react-redux';
import { TopSellersJson } from '../../../../utils/JsonData';
import TopBuyer from '../../../ContentMarketplace/Top/TopPlatformUsers/TopBuyer';
import TopSeller from '../../../ContentMarketplace/Top/TopPlatformUsers/TopSeller';
import './TopPlatformUsers.scss';
export default function TopPlatformUsers(props) {
  const [sellers, setSellers] = useState([]);
  const { isInitialized, Moralis } = useMoralis();
  const activeNetwork = useSelector((state) => state.app.activeNetwork);

  const fetchTopUsers = async () => {
    try {
      const params = { chain: activeNetwork };
      const result = await Moralis.Cloud.run('queryTopUsers', params);
      if (result && result?.length > 0) {
        setSellers(result);
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if (isInitialized) {
      fetchTopUsers();
    }
  }, [isInitialized, activeNetwork]);

  return (
    <div className="mediaeye-platform-users">
      <div className="mediaeye-platform-users-header text-center">
        <span className="mediaeye-platform-users-header-heading">
          Top 50 Users
        </span>
      </div>
      {/* <div className="mediaeye-topsellers-row">
        {sellers.map((seller, i) => (
          <TopSellersBlock key={i} seller={seller} />
        ))}
      </div> */}
      <div className="mediaeye-top-users">
        <div className="mediaeye-top-users-category">
          <div className="mediaeye-top-users-category-header">Buyers</div>
          <div className="mediaeye-top-users-category-body">
            <div className="mediaeyefancyScroll">
              <div className="popular-tranding-inner">
                <div className="popular-tranding-inner-buyer">
                  <div className="popular-tranding-inner-buyer-header">
                    <div className="popular-tranding-inner-buyer-header-title no-one">
                      User name
                    </div>
                    <div className="popular-tranding-inner-buyer-header-title">
                      Amount
                    </div>
                    <div className="popular-tranding-inner-buyer-header-title">
                      USD
                    </div>
                    <div className="popular-tranding-inner-buyer-header-title">
                      Purchases
                    </div>
                  </div>
                  <TopSeller days="all" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mediaeye-top-users-category">
          <div className="mediaeye-top-users-category-header">Sellers</div>
          <div className="mediaeye-top-users-category-body">
            <div className="mediaeyefancyScroll">
              <div className="popular-tranding-inner">
                <div className="popular-tranding-inner-buyer">
                  <div className="popular-tranding-inner-buyer-header">
                    <div className="popular-tranding-inner-buyer-header-title no-one">
                      User name
                    </div>
                    <div className="popular-tranding-inner-buyer-header-title">
                      Amount
                    </div>
                    <div className="popular-tranding-inner-buyer-header-title">
                      USD
                    </div>
                    <div className="popular-tranding-inner-buyer-header-title">
                      Sales
                    </div>
                  </div>
                  <TopBuyer days="all" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
