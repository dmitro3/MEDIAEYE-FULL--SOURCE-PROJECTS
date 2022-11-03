import React, { useEffect, useRef, useState } from 'react';
import SelectSearch from 'react-select-search';
import './PublicSpotlight.scss';
import { Link, useHistory } from 'react-router-dom';
import SpotlightNft from './SpotlightNft';
import SpotlightCollection from '../Collections/SpotlightCollection';
import SpotlightCampaign from '../Campaigns/SpotlightCampaign';
import SpotlightAirdrop from '../Airdrop/SpotlightAirdrop';
import Tabs from '../Common/AnimatedTab/Tabs';

const PublicSpotlight = () => {
  const [sortBy, setSortBy] = useState([]);
  const history = useHistory();
  const [activeTab, setActiveTab] = useState(0);
  const [sortByValue, setSortByValue] = useState('');
  const tabs = ['All Content', 'NFTs', 'Collections', 'Campaigns', 'Airdrops'];

  useEffect(() => {
    let sortList = [];
    if (activeTab === 1) {
      sortList = [
        { name: 'Price High to Low', value: 'Price High to Low' },
        { name: 'Price Low to High', value: 'Price Low to High' },
        { name: 'New', value: 'New' },
        { name: 'Popular', value: 'Popular' },
        { name: 'Sold', value: 'Sold' }
      ];
    } else if (activeTab === 2) {
      sortList = [
        { name: 'New', value: 'New' },
        { name: 'Popular', value: 'Popular' },
        { name: 'Sales Volume', value: 'Sales Volume' }
      ];
    } else if (activeTab === 4 || activeTab === 3) {
      sortList = [
        { name: 'New', value: 'New' },
        { name: 'Popular', value: 'Popular' },
        { name: 'Live', value: 'Live' }
      ];
    }
    setSortBy(sortList);
  }, [activeTab]);

  const onTabChange = (index) => {
    if (activeTab !== index) {
      setActiveTab(index);
    }
  };

  return (
    <>
      <div className="mediaeye-layout-container">
        <div className="mediaeye-tabss public-spotlight-tabs">
          <Tabs tabs={tabs} activeTab={activeTab} onTabChange={onTabChange} />
        </div>
        <div className="mediaeye-layout-container">
          <div className="public-spotlight-headbar">
            {activeTab === 0 ? (
              <Link to={'feature-nft'} className="btn btn-featured">
                SPOTLIGHT MY CONTENT
              </Link>
            ) : activeTab === 1 ? (
              <Link to={'feature-nft'} className="btn btn-featured">
                SPOTLIGHT NFT
              </Link>
            ) : activeTab === 2 ? (
              <Link to={'feature-collection'} className="btn btn-featured">
                SPOTLIGHT COLLECTION
              </Link>
            ) : activeTab === 3 ? (
              <Link to={'feature-campaign'} className="btn btn-featured">
                SPOTLIGHT CAMPAIGNS
              </Link>
            ) : (
              <Link to={'feature-airdrop'} className="btn btn-featured">
                SPOTLIGHT AIRDROP
              </Link>
            )}
            <div className="public-spotlight-headbar-inner">
              {activeTab != 0 ? (
                <div className="mediaeye-layout-section-header-right-col">
                  <SelectSearch
                    className="mediaeye-selectsearch mediaeye-selectsearch-white-arrow dark-style"
                    size="lg"
                    options={sortBy}
                    value={sortByValue}
                    onChange={(opt) => setSortByValue(opt)}
                    placeholder="Sort by"
                  />
                </div>
              ) : null}
              <form className="mediaeye-searchbar" id="Search_Spotlight">
                <input
                  placeholder="Search"
                  type="text"
                  aria-labelledby="Search_Spotlight"
                />
              </form>
            </div>
          </div>
        </div>
      </div>

      {activeTab === 0 ? (
        <>
          <section className="mediaeye-layout-section withspacetop">
            <div className="mediaeye-layout-container">
              <div className="mediaeye-layout-section-header">
                <h2 className="mediaeye-layout-section-header-heading">NFTs</h2>
              </div>
              <SpotlightNft type="slider" />
            </div>
          </section>

          <section className="mediaeye-layout-section withspacetop">
            <div className="mediaeye-layout-container">
              <div className="mediaeye-layout-section-header">
                <h2 className="mediaeye-layout-section-header-heading">
                  Collections
                </h2>
              </div>
              <SpotlightCollection type="slider" />
            </div>
          </section>

          <section className="mediaeye-layout-section withspacetop">
            <div className="mediaeye-layout-container">
              <div className="mediaeye-layout-section-header">
                <h2 className="mediaeye-layout-section-header-heading">
                  Campaigns
                </h2>
              </div>
              <SpotlightCampaign type="slider" />
            </div>
          </section>

          <section className="mediaeye-layout-section withspacetop">
            <div className="mediaeye-layout-container">
              <div className="mediaeye-layout-section-header">
                <h2 className="mediaeye-layout-section-header-heading">
                  Airdrops
                </h2>
              </div>
              <SpotlightAirdrop type="slider" />
            </div>
          </section>
        </>
      ) : (
        <section className="mediaeye-layout-section withspacetop">
          <div className="mediaeye-layout-container">
            <div className="mediaeye-layout-section-header withfilter">
              <div className="mediaeye-layout-section-header-left">
                <h2 className="mediaeye-layout-section-header-heading">
                  {activeTab === 1 ? (
                    <>SPOTLIGHT NFTs</>
                  ) : activeTab === 2 ? (
                    <>SPOTLIGHT Collections</>
                  ) : activeTab === 3 ? (
                    <>SPOTLIGHT Campaigns</>
                  ) : activeTab === 4 ? (
                    <>SPOTLIGHT Airdrops</>
                  ) : null}
                </h2>
              </div>
            </div>

            {activeTab === 1 ? (
              <SpotlightNft />
            ) : activeTab === 2 ? (
              <SpotlightCollection />
            ) : activeTab === 3 ? (
              <SpotlightCampaign />
            ) : activeTab === 4 ? (
              <SpotlightAirdrop />
            ) : null}
          </div>
        </section>
      )}
    </>
  );
};
export default PublicSpotlight;
