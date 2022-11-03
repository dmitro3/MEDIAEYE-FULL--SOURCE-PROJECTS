import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import SelectSearch from 'react-select-search';
import { GetNetworkIcon } from '../../blockchain/functions/Utils';
import { CloseIcon, Sticker } from '../Icons';
import { WatchlistDataJson } from '../../utils/JsonData';
import './WatchlistMain.scss';
import ConfirmRemove from '../ConfirmPopUp/ConfirmRemove';

const WatchlistMain = (props) => {
  const [activeType, setActiveType] = useState('MEDIA EYE');
  const [WatchlistData, setWatchlistData] = useState(WatchlistDataJson());
  const [openConfirm, setOpenConfirm] = useState(false);
  const [index, setindex] = useState();
  const filterOption = [
    {
      name: 'MEDIA EYE',
      value: 'MEDIA EYE'
    },
    {
      name: 'WORLD WIDE',
      value: 'WORLD WIDE'
    }
  ];
  const toggleConfirmPopup = (i) => {
    setindex(i);
    setOpenConfirm(!openConfirm);
    if (typeof i == 'object') {
      setWatchlistData(i);
    }
  };

  return (
    <>
      <Helmet>
        <meta
          property="og:url"
          content={window.location.origin + '/watchlist'}
        />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Introduction | MEDIA EYE" />
        <meta
          property="og:description"
          content="MEDIA EYE Metadeck, provides creators, businesses, protocols and users a useful introduction to MEDIA EYE Services, tokeneconomics, token meterics, community centric rewards and more.."
        />
        <meta
          property="og:image"
          content={window.location.origin + '/img/meta_tag/watchlist.png'}
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          property="twitter:domain"
          content="mediaeyenft.com/account/watchlist"
        />
        <meta
          property="twitter:url"
          content={window.location.origin + '/watchlist'}
        />
        <meta name="twitter:title" content="Introduction | MEDIA EYE" />
        <meta
          name="twitter:description"
          content="MEDIA EYE Metadeck, provides creators, businesses, protocols and users a useful introduction to MEDIA EYE Services, tokeneconomics, token meterics, community centric rewards and more.."
        />
        <meta
          name="twitter:image"
          content={window.location.origin + '/img/meta_tag/watchlist.png'}
        />
        <title>Introduction | MEDIA EYE</title>
        <meta
          name="description"
          content="MEDIA EYE Metadeck, provides creators, businesses, protocols and users a useful introduction to MEDIA EYE Services, tokeneconomics, token meterics, community centric rewards and more.."
        />
      </Helmet>
      <ConfirmRemove
        openConfirm={openConfirm}
        toggleConfirmPopup={toggleConfirmPopup}
        index={index}
        WatchlistData={WatchlistData}
      />
      <div className="mediaeye-layout-middle watchlist-page-inner">
        <section className="mediaeye-layout-section withspace">
          <div className="mediaeye-layout-container">
            <div className="mediaeye-layout-section-header home-page-topCollectionsSection-header">
              <h2 className="mediaeye-layout-section-header-heading text-center">
                My Watchlist
              </h2>
              {/* <div className="home-page-topCollectionsSection-header-selection">
                <SelectSearch
                  className="mediaeye-selectsearch mediaeye-selectsearch-white-arrow dark-style"
                  size="lg"
                  options={filterOption}
                  value={activeType}
                  onChange={(opt) => setActiveType(opt)}
                />
              </div> */}
            </div>

            <div className="watchlist-page-inner-list">
              <table>
                <thead>
                  <tr>
                    <th className="watchlist-page-inner-list-srno"></th>
                    <th>Collection</th>
                    <th>Total Volume</th>
                    <th>24h %</th>
                    <th>7d %</th>
                    <th>Floor Price</th>
                    <th>Owners</th>
                    <th>Items</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {WatchlistData.map((data, i) => (
                    <tr>
                      <td className="text-gray watchlist-page-inner-list-srno">
                        {i + 1}
                      </td>
                      <td>
                        <div className="watchlist-page-inner-list-collection">
                          <div className="watchlist-page-inner-list-collection-img">
                            <span className="watchlist-page-inner-list-collection-img-sticker">
                              <Sticker />{' '}
                            </span>
                            <div className="watchlist-page-inner-list-collection-img-inner">
                              <img src={data.img} alt="collectUser" />
                            </div>
                          </div>
                          {data.collectionName}
                        </div>
                      </td>
                      <td>
                        <div className="watchlist-page-inner-list-price">
                          <img src={GetNetworkIcon('ETH')} alt="eth" />
                          {data.TotalVolume}
                        </div>
                      </td>
                      <td
                        className={
                          data.oneDay > 0 ? 'text-action' : 'text-danger'
                        }
                      >
                        {data.oneDay > 0 ? '+' : null}
                        {data.oneDay}%
                      </td>
                      <td
                        className={
                          data.sevenDay > 0 ? 'text-action' : 'text-danger'
                        }
                      >
                        {data.sevenDay > 0 ? '+' : null}
                        {data.sevenDay}
                        {data.sevenDay !== '-' ? '%' : null}
                      </td>
                      <td>
                        <div className="watchlist-page-inner-list-price">
                          <img src={GetNetworkIcon('ETH')} alt="eth" />
                          {data.FloorPrice}
                        </div>
                      </td>
                      <td>{data.Owners}</td>
                      <td>{data.Items}</td>
                      <td>
                        <span
                          className="watchlist-page-inner-list-close"
                          onClick={() => toggleConfirmPopup(i)}
                        >
                          <CloseIcon />
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default WatchlistMain;
