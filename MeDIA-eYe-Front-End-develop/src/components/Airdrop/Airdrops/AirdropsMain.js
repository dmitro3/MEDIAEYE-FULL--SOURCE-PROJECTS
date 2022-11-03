import React, { useState } from 'react';
import './Airdrops.scss';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { toggleFeaturePopup } from '../../../store/app/appSlice';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { closeFeaturePopup } from '../../../store/app/appSlice';
import searchbtnicon from '../../../assets/img/search_icon.png';
import SelectSearch from 'react-select-search';
import FeaturedAirdop from '../FeaturedAirdop/FeaturedAirdop';
import AirdropWithBounties from '../AirdropWithBounties/AirdropWithBounties';
import AirdropList from '../AirdropList/AirdropList';
import Tabs from '../../Common/AnimatedTab/Tabs';

const airdrops = Array.from({ length: 6 });
const AirdropsMain = (props) => {
  const dispatch = useDispatch();
  const showFeaturePopup = useSelector((state) => state.app.showFeaturePopup);
  let history = useHistory();
  const [activeTab, setActiveTab] = useState(0);
  const [single, setSingle] = useState('All Phases');
  const tabs = ['All', 'Spotlight', 'Live', 'Scheduled'];

  const onTabChange = (index) => {
    if (activeTab !== index) {
      setActiveTab(index);
    }
  };
  const switchFeaturePopup = (prop) => {
    if (showFeaturePopup) {
      dispatch(closeFeaturePopup());
    } else {
      dispatch(
        toggleFeaturePopup({
          type: 'Spotlight My Airdrop',
          content: {
            attributes: {
              name: 'feature NFT',
              id: prop
              // image: product[0].fullImage,
              // specific: activeSingle ? 'Fixed Price' : 'Auction'
            }
          }
        })
      );
    }
  };

  const allItems = [
    { value: 'All Phases', name: 'All Phases' },
    { value: 'Whitelisting', name: 'Whitelisting' },
    { value: 'Bounties Claiming', name: 'Bounties Claiming' }
  ];

  return (
    <>
      <Helmet>
        <meta
          property="og:url"
          content={window.location.origin + '/airdrops'}
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:title"
          content="Airdrops with Bounties support both NFTs and Tokens | MEDIA EYE"
        />
        <meta
          property="og:description"
          content="Programmatic Airdrop services integrated with with leading social and mass marketing platform, highly cost effective and easy to use."
        />
        <meta
          property="og:image"
          content={window.location.origin + '/img/meta_tag/airdrops.png'}
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta property="twitter:domain" content="mediaeyenft.com/airdrops" />
        <meta
          property="twitter:url"
          content={window.location.origin + '/airdrops'}
        />
        <meta
          name="twitter:title"
          content="Airdrops with Bounties support both NFTs and Tokens | MEDIA EYE"
        />
        <meta
          name="twitter:description"
          content="Programmatic Airdrop services integrated with with leading social and mass marketing platform, highly cost effective and easy to use."
        />
        <meta
          name="twitter:image"
          content={window.location.origin + '/img/meta_tag/airdrops.png'}
        />
        <title>
          Airdrops with Bounties support both NFTs and Tokens | MEDIA EYE{' '}
        </title>
        <meta
          name="description"
          content="Programmatic Airdrop services integrated with with leading social and mass marketing platform, highly cost effective and easy to use."
        />
      </Helmet>
      <div className="feature_airdrop-header">
        <div className="feature_airdrop-header-banner">
          <img
            className="feature_airdrop-header-banner-bgbck"
            src="/img/airdrops/airdrop-banner1.png"
            alt="airdrop banner"
          />
        </div>
      </div>
      <div className="mediaeye-layout-middle">
        <div className="mediaeye-layout-container">
          <div className="mediaeye-tabss">
            <Tabs tabs={tabs} activeTab={activeTab} onTabChange={onTabChange} />
          </div>

          <div className="feature_airdrop_tabpart">
            <div className="content_wrapper">
              <button
                type="button"
                className="btn btn-airdrop"
                onClick={() => history.push('/airdrop/launch')}
              >
                Create Airdrop
              </button>
              <div className="content_wrapper_dropdown">
                <label>
                  <SelectSearch
                    className="mediaeye-selectsearch mediaeye-selectsearch-white-arrow dark-style"
                    size="lg"
                    options={allItems}
                    value={single}
                    onChange={(opt) => setSingle(opt)}
                  />
                </label>
                <div className="mediaeye-searchbar">
                  <label>
                    <input placeholder="Searchs" type="text" />
                  </label>
                </div>
              </div>
            </div>
            {activeTab === 0 ? (
              <>
                <section className="mediaeye-layout-section withspace">
                  <div className="mediaeye-layout-container">
                    <div className="mediaeye-layout-section-header">
                      <h2 className="mediaeye-layout-section-header-heading">
                        Featured Airdrops & Bounties
                      </h2>
                    </div>
                    <div className="mediaeye-layout-container">
                      <FeaturedAirdop />
                    </div>
                  </div>
                </section>

                <section className="mediaeye-layout-section withspace">
                  <div className="mediaeye-layout-container">
                    <div className="mediaeye-layout-section-header">
                      <h2 className="mediaeye-layout-section-header-heading">
                        Live Airdrops & Bounties
                      </h2>
                    </div>
                    <div class="mediaeye-layout-container">
                      <AirdropList category={activeTab} />
                    </div>
                  </div>
                </section>
              </>
            ) : activeTab === 1 ? (
              <section className="mediaeye-layout-section withspace">
                <div className="mediaeye-layout-container">
                  <div className="mediaeye-layout-section-header">
                    <h2 className="mediaeye-layout-section-header-heading">
                      SPOTLIGHT Airdrops & Bounties
                    </h2>
                  </div>
                  <div className="mediaeye-layout-container">
                    <FeaturedAirdop />
                  </div>
                </div>
              </section>
            ) : null}

            {activeTab === 2 ? (
              <section className="mediaeye-layout-section withspace">
                <div className="mediaeye-layout-container">
                  <div className="mediaeye-layout-section-header">
                    <h2 className="mediaeye-layout-section-header-heading">
                      Live Airdrops & Bounties
                    </h2>
                  </div>
                  <div className="mediaeye-layout-container">
                    {airdrops.map(() => (
                      <AirdropWithBounties list={airdrops} />
                    ))}
                  </div>
                </div>
              </section>
            ) : activeTab === 3 ? (
              <section className="mediaeye-layout-section withspace">
                <div className="mediaeye-layout-container">
                  <div className="mediaeye-layout-section-header">
                    <h2 className="mediaeye-layout-section-header-heading">
                      Scheduled Airdrops & Bounties
                    </h2>
                  </div>
                  <div className="mediaeye-layout-container">
                    <AirdropWithBounties />
                  </div>
                </div>
              </section>
            ) : null}
          </div>
        </div>
      </div>
    </>
  );
};

export default AirdropsMain;
