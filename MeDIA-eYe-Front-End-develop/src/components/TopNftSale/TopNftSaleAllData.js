import './TopNftSale.scss';
import { RightSideArrow } from '../Icons';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import SelectSearch from 'react-select-search';
import React, { useEffect, useState } from 'react';
import { toggleGeneralPopup } from '../../store/app/appSlice';
import { getnfts } from '../../blockchain/functions/Hub/hubcollection';

const TopNftSaleAllData = (props) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const location = useLocation();
  const [dataload, setdataload] = useState(0);
  const [flagload, setflagload] = useState(0);
  const [activeDays, setActiveDays] = useState(30);
  const [loaderState, setLoaderState] = useState(0);
  const [topCollections, setTopCollections] = useState([]);
  const [seeAllBtnStatus, setseeAllBtnStatus] = useState(0);
  const [activeCollection, setActiveCollection] = useState('MEDIA EYE');

  const collectionFilter = [
    {
      name: 'MEDIA EYE',
      value: 'MEDIA EYE'
    },
    {
      name: 'WORLD WIDE',
      value: 'WORLD WIDE'
    }
  ];
  const daysFilterOption = [
    {
      name: '24 h',
      value: 1
    },
    {
      name: '7 d',
      value: 7
    },
    {
      name: '30 d',
      value: 30
    },
    {
      name: 'All',
      value: 'all'
    }
  ];
  useEffect(() => {
    if (flagload == 1) {
      setLoaderState(0);
      if (activeCollection === 'MEDIA EYE') {
        handleTopMediaeyeCollections();
      }
      if (activeCollection === 'WORLD WIDE') {
        handleTopWordWideCollections();
      }
    }
  }, [activeDays, activeCollection]);
  useEffect(() => {
    if (location.state.status == 1 && dataload == 0) {
      setActiveCollection(location.state.activeCollection);
      setActiveDays(location.state.activeDays);
      const days = location.state.activeDays;
      if (location.state.activeCollection === 'MEDIA EYE') {
        handleTopMediaeyeCollections(days);
      }
      if (location.state.activeCollection === 'WORLD WIDE') {
        handleTopWordWideCollections(days);
      }
    }
  }, [location]);
  const handleTopMediaeyeCollections = async (days) => {
    try {
      // let daysvalue;
      // if (days) { daysvalue = days } else { daysvalue = activeDays };
      // const topCollections = await queryTopCollections(Moralis, daysvalue);
      // if (topCollections?.length > 0) {
      //           setTopCollections(topCollections);
      //           setdataload(1);
      //           setLoaderState(1);
      // }
    } catch (e) {
      dispatch(
        toggleGeneralPopup({
          status: 'error',
          message: 'Something Went Wrong !!!',
          textButton: 'OK',
          size: 'sm'
        })
      );
    }
  };
  const handleTopWordWideCollections = async (days) => {
    try {
      let daysvalue;
      if (days) {
        daysvalue = days;
      } else {
        daysvalue = activeDays;
      }
      const topCollections = await getnfts(daysvalue);
      if (topCollections?.length > 0) {
        setTopCollections(topCollections);
        setdataload(1);
        setLoaderState(1);
      }
    } catch (e) {
      dispatch(
        toggleGeneralPopup({
          status: 'error',
          message: 'Something Went Wrong !!',
          textButton: 'OK',
          size: 'sm'
        })
      );
    }
  };
  const soldtime = (dateandtime) => {
    if (activeDays == 30 || activeDays == 7) {
      let presntdate = new Date();
      let usedate = new Date(dateandtime);
      const diffTime = Math.abs(presntdate - usedate);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return `${diffDays} days ago`;
    }
    if (activeDays == 1) {
      let presntdate = new Date();
      let usedate = new Date(dateandtime);
      const diffTime = Math.abs(presntdate - usedate) / 1000;
      const hours = Math.floor(diffTime / 3600) % 24;
      return `${hours} hours ago`;
    }
  };
  const pricetoken = (collection) => {
    var token = collection?.paymentToken
    var a = collection?.quote;
    return Math.abs(a[`${token}`].price).toFixed(2);
  }

  return (
    <div className="mediaeye-layout-content top-nft-sale">
      <div className="mediaeye-layout-container">
        <div className="mediaeye-layout-section-header top-nft-sale-header">
          <h2 className="mediaeye-layout-section-header-heading text-center">
            Top NFT Collectible Sale
          </h2>
          <div className="mediaeye-select-poptrend">
            <SelectSearch
              className="mediaeye-selectsearch mediaeye-selectsearch-white-arrow dark-style"
              size="lg"
              options={collectionFilter}
              value={activeCollection}
              onChange={(opt) => setActiveCollection(opt)}
            />
          </div>
          <div className="mediaeye-select-poptrend days-filter">
            <SelectSearch
              className="mediaeye-selectsearch mediaeye-selectsearch-white-arrow dark-style"
              size="lg"
              options={daysFilterOption}
              value={activeDays}
              onChange={(opt) => setActiveDays(opt)}
            />
          </div>
        </div>
        {loaderState == 1 ? (
          <div className="top-nft-sale-inner">
            <table>
              <thead>
                <tr>
                  <th className="top-nft-sale-inner-srno"></th>
                  <th>
                    <span>NFT</span>
                  </th>
                  <th>Sold</th>
                  <th>Price</th>
                  <th className="top-nft-sale-inner-buyerseller">
                    Seller <RightSideArrow /> Buyer
                  </th>
                </tr>
              </thead>
              {activeCollection === 'WORLD WIDE' ? (
                <tbody>
                  {topCollections.map((collection, i) => (
                    <tr key={i}>
                      <td className="text-gray top-nft-sale-inner-srno">
                        {i + 1}
                      </td>
                      <td>
                        <div className="top-nft-sale-inner-collection">
                          <img src={collection?.collectionImageURL} alt="icon" />
                          <div className="top-nft-sale-inner-collection-titles">
                            <span className="text-gray top-nft-sale-inner-collection-titles-text">
                              {collection?.collectionName}
                            </span>
                            <span>
                              {' '}
                              {collection?.tokens[0].attributes.Name}
                            </span>
                          </div>
                        </div>
                      </td>
                      <td>
                        <span className="text-gray">
                          {soldtime(collection?.saleAt)}
                        </span>
                      </td>
                      <td>
                        <div>
                          <span className="m-r-20">
                            $ {Math.abs(collection?.quote?.USD?.price).toFixed(2)}
                          </span>
                          <span>
                            {pricetoken(collection)}
                            {/* {Math.abs(collection?.quote?.ETH?.price).toFixed(2)}{' '} */}
                            {collection?.paymentToken}
                          </span>
                        </div>
                      </td>
                      <td>
                        <div className="top-nft-sale-inner-last">
                          <span>
                            {collection?.sellerAddress?.slice(0, 4)}...
                            {collection?.sellerAddress?.slice(-4)}
                          </span>
                          <RightSideArrow />
                          <span>
                            {collection?.buyerAddress?.slice(0, 4)}...
                            {collection?.buyerAddress?.slice(-4)}
                          </span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              ) : (
                <tbody>
                  <tr>
                    <td className="text-gray top-nft-sale-inner-srno">1</td>
                    <td>
                      <div className="top-nft-sale-inner-collection">
                        <img src="/img/saleIcons/pic1.png" alt="saleIcons" />
                        <div className="top-nft-sale-inner-collection-titles">
                          <span className="text-gray top-nft-sale-inner-collection-titles-text">
                            Baby Wealthy Club
                          </span>
                          <span>Baby Wealthy Club #7597</span>
                        </div>
                      </div>
                    </td>
                    <td>
                      <span className="text-gray">5 hours ago</span>
                    </td>
                    <td>
                      <div>
                        <span className="m-r-20">$ 19,833,650.00</span>
                        <span>1,000.00 BABY</span>
                      </div>
                    </td>
                    <td>
                      <div className="top-nft-sale-inner-last">
                        <span>0xbD...5e35</span>
                        <RightSideArrow />
                        <span> 0x74...a0Ef</span>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td className="text-gray top-nft-sale-inner-srno">2</td>
                    <td>
                      <div className="top-nft-sale-inner-collection">
                        <img src="/img/saleIcons/pic2.png" alt="saleIcons" />
                        <div className="top-nft-sale-inner-collection-titles">
                          <span className="text-gray top-nft-sale-inner-collection-titles-text">
                            Baby Wealthy Club
                          </span>
                          <span>Baby Wealthy Club #7597</span>
                        </div>
                      </div>
                    </td>
                    <td>
                      <span className="text-gray">5 hours ago</span>
                    </td>
                    <td>
                      <div>
                        <span className="m-r-20">$ 19,833,650.00</span>
                        <span>1,000.00 BABY</span>
                      </div>
                    </td>
                    <td>
                      <div className="top-nft-sale-inner-last">
                        <span>0xbD...5e35</span>
                        <RightSideArrow />
                        <span> 0x74...a0Ef</span>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td className="text-gray top-nft-sale-inner-srno">3</td>
                    <td>
                      <div className="top-nft-sale-inner-collection">
                        <img src="/img/saleIcons/pic3.png" alt="saleIcons" />
                        <div className="top-nft-sale-inner-collection-titles">
                          <span className="text-gray top-nft-sale-inner-collection-titles-text">
                            Baby Wealthy Club
                          </span>
                          <span>Baby Wealthy Club #7597</span>
                        </div>
                      </div>
                    </td>
                    <td>
                      <span className="text-gray">5 hours ago</span>
                    </td>
                    <td>
                      <div>
                        <span className="m-r-20">$ 19,833,650.00</span>
                        <span>1,000.00 BABY</span>
                      </div>
                    </td>
                    <td>
                      <div className="top-nft-sale-inner-last">
                        <span>0xbD...5e35</span>
                        <RightSideArrow />
                        <span> 0x74...a0Ef</span>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td className="text-gray top-nft-sale-inner-srno">4</td>
                    <td>
                      <div className="top-nft-sale-inner-collection">
                        <img src="/img/saleIcons/pic4.png" alt="saleIcons" />
                        <div className="top-nft-sale-inner-collection-titles">
                          <span className="text-gray top-nft-sale-inner-collection-titles-text">
                            Baby Wealthy Club
                          </span>
                          <span>Baby Wealthy Club #7597</span>
                        </div>
                      </div>
                    </td>
                    <td>
                      <span className="text-gray">5 hours ago</span>
                    </td>
                    <td>
                      <div>
                        <span className="m-r-20">$ 19,833,650.00</span>
                        <span>1,000.00 BABY</span>
                      </div>
                    </td>
                    <td>
                      <div className="top-nft-sale-inner-last">
                        <span>0xbD...5e35</span>
                        <RightSideArrow />
                        <span> 0x74...a0Ef</span>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td className="text-gray top-nft-sale-inner-srno">5</td>
                    <td>
                      <div className="top-nft-sale-inner-collection">
                        <img src="/img/saleIcons/pic5.png" alt="saleIcons" />
                        <div className="top-nft-sale-inner-collection-titles">
                          <span className="text-gray top-nft-sale-inner-collection-titles-text">
                            Baby Wealthy Club
                          </span>
                          <span>Baby Wealthy Club #7597</span>
                        </div>
                      </div>
                    </td>
                    <td>
                      <span className="text-gray">5 hours ago</span>
                    </td>
                    <td>
                      <div className="top-nft-sale-inner-price">
                        <span className="m-r-20">$ 19,833,650.00</span>
                        <span>1,000.00 BABY</span>
                      </div>
                    </td>
                    <td>
                      <div className="top-nft-sale-inner-last">
                        <span>0xbD...5e35</span>
                        <RightSideArrow />
                        <span> 0x74...a0Ef</span>
                      </div>
                    </td>
                  </tr>
                </tbody>
              )}
            </table>
          </div>
        ) : (
          <>
            <div className="box-3">
              <div className="loader-3">
                <div className="pulse"></div>
                <div className="pulse"></div>
                <div className="pulse"></div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
export default TopNftSaleAllData;
