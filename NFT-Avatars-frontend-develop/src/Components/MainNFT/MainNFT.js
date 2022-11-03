import React, { useState } from 'react';
import "./MainNFT.scss";
import DemoImg from "../../assets/images/demo-market.png";
import Heart from "../../assets/images/Wallet/heart.png";
import Eth from "../../assets/images/Wallet/ETH.png";
import Donations from "../../assets/images/Wallet/donation.png";
import Angle from "../../assets/images/Angle.png";
import Description from "../../assets/images/descript.png";
import Details from "../../assets/images/details.png";
import Property from "../../assets/images/property.png";
import Star from "../../assets/images/star.png";
import Stats from "../../assets/images/graph.png";
import Card from "../../assets/images/card.png";
import Copy from "../../assets/images/copy.png";
import Item from "../../assets/images/al-item.png";
import Locks from '../../assets/images/lock.png';
import Tooltip from '../../assets/images/exclamation.png';
import Tag from '../../assets/images/Tag.png';
import Exclaim from '../../assets/images/exclaim.png';
import Bid from '../../assets/images/userVoice.png';
import Mint from '../../assets/images/checkbox.png';
import Clocks from '../../assets/images/Clock.png';
import NftCard from "../CardUser/CardUser";
import Select from 'react-select';
import Shares from "../icons/Share";
import Flags from "../icons/Flag";
import Close from "../icons/Close";
import ItemCard from "../../assets/images/item-demo.png";

import Slider from "react-slick";
import { MultiSelect } from "react-multi-select-component";

const Accordion = ({ title, children, img }) => {
  const [isOpen, setOpen] = useState(false);

  return (
    <div className="accordion-wrapper">
      <div className={`accordion-head ${isOpen ? "open" : ""}`} onClick={() => setOpen(!isOpen)}>
        <div className='accordion-head-inner'>
          <div className='accordian-icon'>
            <img src={img} alt="" />
          </div>
          <div className={`accordion-head-inner-title `}>
            {title}
          </div>
        </div>
        <img src={Angle} className="angle" alt="Angle" />
      </div>
      <div className={`accordion-item ${!isOpen ? "collapsed" : ""}`}>
        <div className="accordion-content">{children}</div>
      </div>
    </div>
  );
};

const options = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' }
]

const MainNFT = () => {
  const [filterOptions,] = useState([
    { id: 1, value: 'Listings', label: 'Listings' },
    { id: 2, value: 'Offers', label: 'Offers' },
    { id: 3, value: 'Bids', label: 'Bids' },
    { id: 4, value: 'Sales', label: 'Sales' },
    { id: 5, value: 'Transfer', label: 'Transfer' }
  ]);
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    className: 'slider-main',
    centerPadding: '60px',
    breakpoints: {
      1024: {
          slidesPerView: 4
      },
      600: {
          slidesPerView: 3
      },
      400: {
          slidesPerView: 2
      }
  },
    // responsive: [{
    //   breakpoint: {
    //     1024: { slidesPerView: 4, spaceBetween: 20 },
    //     600: { slidesPerView: 3, spaceBetween: 15 },
    //     425: { slidesPerView: 2, spaceBetween: 10 }
    //   }
    // },]
    // responsive: [{breakpoint: 1024,},{breakpoint: 600,},{breakpoint: 480,},{breakpoint: 375,}]
  };

  const [filters, setFilters] = useState([]);

  const deleteItem = (getID) => {
    // setFilterOptions(filterOptions.filter((single) => single.id !== getID));
    setFilters(filters.filter((single) => single.id !== getID));
  };

  const handleRemoveFieldsAll = (event) => {
    setFilters([]);
  };

  const filterall = (selected, _options) => {
    return selected.length
      ? selected.map(({ label }) => "✔️ " + label)
      : "Filters";
  };

  return (
    <div className='mediaProfilepage-wrap'>
      <div className='mediaeyeAvatar-layout-middle'>
        <div className='mediaeyeAvatar-layout-container'>
          <div className='main-nft'>
            <div className='main-nft-data'>
              <div className='main-nft-data-sideprofile'>
                <img src={DemoImg} className="nft-user" alt="user-img" />
                <div className='nft-social'>
                  <div className='nft-social-account'>
                    <p className='title'><img src={Heart} className='' alt="heart" />12 367</p>
                    <p className='title'><img src={Eth} className='icon' alt="heart" />Ethereum</p>
                  </div>
                  <div className='nft-social-account'>
                    <p className='title'><img src={Donations} className='' alt="heart" /><span>Donations:</span> CARE Ceska republika, 10%</p>
                  </div>
                </div>
                <div className='nft-sidebar-item'>
                  <h5 className='title'>10 items</h5>
                  <div className='nft-sidebar-item-inner'>
                    <img src={ItemCard} className="side-card" alt="card" />
                    <img src={ItemCard} className="side-card" alt="card" />
                    <img src={ItemCard} className="side-card" alt="card" />
                    <img src={ItemCard} className="side-card" alt="card" />
                    <img src={ItemCard} className="side-card" alt="card" />
                    <img src={ItemCard} className="side-card" alt="card" />
                    <img src={ItemCard} className="side-card" alt="card" />
                  </div>
                </div>
                <div className='nft-accordian'>
                  <div className="wrapper">
                    <Accordion title="Description" img={Description}>
                      Sunlight reaches Earth's atmosphere and is scattered in all directions by
                      all the gases and particles in the air. Blue light is scattered more than
                      the other colors because it travels as shorter, smaller waves. This is why
                      we see a blue sky most of the time.
                    </Accordion>
                    <Accordion title="Details" img={Details}>
                      <div className='list'>
                        <p className='list-key'>Network Chain<span className='list-key-value'>BSC</span></p>
                      </div>
                      <div className='list'>
                        <p className='list-key'>NFT Token Type<span className='list-key-value'>721</span></p>
                      </div>
                      <div className='list'>
                        <p className='list-key'>Content Type<span className='list-key-value'>Gif</span></p>
                      </div>
                      <div className='list'>
                        <p className='list-key'>Contract address<span className='list-key-value'><span className='list-key-value-token'>13435657657</span><img src={Copy} alt="copy" /></span></p>
                      </div>
                      <div className='list'>
                        <p className='list-key'>Token ID<span className='list-key-value'>123</span></p>
                      </div>
                      <div className='list'>
                        <p className='list-key'>Number of tokens created<span className='list-key-value'>1</span></p>
                      </div>
                      <div className='list'>
                        <p className='list-key'>Royalty Rate<span className='list-key-value'>10%</span></p>
                      </div>
                    </Accordion>
                    <Accordion title="Properties" img={Property}>
                      A black hole is an area of such immense gravity that nothing -- not even
                      light -- can escape from it.
                    </Accordion>
                    <Accordion title="Levels" img={Star}>
                      A black hole is an area of such immense gravity that nothing -- not even
                      light -- can escape from it.
                    </Accordion>
                    <Accordion title="Stats" img={Stats}>
                      A black hole is an area of such immense gravity that nothing -- not even
                      light -- can escape from it.
                    </Accordion>
                    <Accordion title="About {Collection Name}" img={Card}>
                      A black hole is an area of such immense gravity that nothing -- not even
                      light -- can escape from it.
                    </Accordion>
                  </div>
                </div>
              </div>
              <div className='main-nft-data-detail'>
                <div className='nft-data-head'>
                  <div className='nft-data-head-title'>
                    <h4 className='list-name'>Bored Ape #8307</h4>
                    <div className='nft-social'>
                      <div className='nft-social-inner'>
                        <button className='btn-social'><Shares /></button>
                        <button className='btn-social'><Flags /></button>
                      </div>
                    </div>
                  </div>
                  <div className='nft-data-head-detail'>
                    <div className='nft-data-head-detail-sort'>
                      <p className='title'>Collections:<span className='value'>Bored Ape Yacht Club</span></p>
                      <p className='title'>Owner:<span className='value'>StainedApe</span></p>
                      <span className='items'><img src={Item} className="" alt="al-item" /><span className='value'>1/1</span></span>
                    </div>
                    <div className='nft-data-head-detail-link'>
                      <div className='nft-data-head-detail-link-inner'>
                        <button className='btn-nft'>Burn NFT</button>
                        {/* <button className='btn-nft'>Cancel Listing</button> */}
                        <button className='btn-market'>List on Marketplace</button>
                      </div>
                    </div>
                  </div>
                  <div className='nft-data-head-content'>
                    <div className='nft-data-head-content-inner'>
                      <img src={Locks} className="" alt="lock" />
                      <h6 className='title'>Unlockable Content</h6>
                      <img src={Tooltip} className="" alt="hint" />
                    </div>
                  </div>
                  <div className='nft-data-head-timeline'>
                    <h4 className='title'><img src={Clocks} className="" alt="time" />Auction ends in</h4>
                    <div className='nft-data-head-timeline-inner'>
                      <div className='time'>
                        <p className='time-num'>2</p>
                        <span className='time-name'>Days</span>
                      </div>
                      <div className='time'>
                        <p className='time-num'>10</p>
                        <span className='time-name'>Hours</span>
                      </div>
                      <div className='time'>
                        <p className='time-num'>50</p>
                        <span className='time-name'>Min</span>
                      </div>
                      <div className='time'>
                        <p className='time-num'>46</p>
                        <span className='time-name'>Sec</span>
                      </div>
                    </div>
                  </div>
                  <div className='nft-data-head-price'>
                    {/* <div className='nft-data-head-price-inner'>
                      <h6 className='title'>Current Price</h6> 
                       <div className='wallet'>
                          <div className='wallet-inner'>
                            <img src={Eth} className='wallet-inner-icon' alt="wallet"/>
                            <p className='wallet-inner-value'>71,50</p>  
                            <p className='wallet-inner-price'>($114 620,80)</p>  
                          </div> 
                          <div className='wallet-inner'>
                            <img src={Dollar} className='wallet-inner-icon' alt="wallet"/>
                            <p className='wallet-inner-value'>71,50</p>  
                            <p className='wallet-inner-price'>($114 620,80)</p>  
                          </div> 
                       </div>     
                      <div className='wallet-option'>
                        <button className='btn-buy'>Buy Now</button>  
                        <button className='btn-offer'>Make Offer</button>  
                      </div>     
                    </div> */}
                    <div className='nft-data-head-price-bid'>
                      <div className='nft-data-head-price-bid-inner'>
                        <h6 className='title'>Current Price</h6>
                        <div className='walbid'>
                          <div className='walbid-inner'>
                            <img src={Eth} className="walbid-inner-icon" alt="bid-icon" />
                            <p className='walbid-inner-price'>10</p>
                          </div>
                          <p className='walbid-value'>($20 620,80)</p>
                        </div>
                        <button className='btn-bid'>Place Bid</button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='nft-data-table'>
                  <div className='nft-accordian'>
                    <div className="wrapper">
                      <Accordion title="Listings">
                        <div className='nft-table'>
                          <table className='nft-table-head'>
                            <thead>
                              <tr>
                                <th className='data-set'>Unit Price</th>
                                <th className='data-set'>USD</th>
                                <th className='data-set'>Qty</th>
                                <th className='data-set'>Floor Difference</th>
                                <th className='data-set'>Expiration</th>
                                <th className='data-set'>From</th>
                                <th className='data-set'></th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <td className='data-set'><p className='unit-name'><img src={Eth} className="unit-wallet" alt="" />10 ETH</p></td>
                                <td className='data-set'>$12 534,36</td>
                                <td className='data-set'>1</td>
                                <td className='data-set'>10% bellow</td>
                                <td className='data-set'>29 days</td>
                                <td className='data-set'>123KKlasav</td>
                                <td className='data-set'><button className='btn-buy'>Buy</button></td>
                              </tr>
                            </tbody>
                          </table>

                        </div>
                      </Accordion>
                      <Accordion title="Offers">
                        <div className='nft-table'>
                          <table className='nft-table-head'>
                            <thead>
                              <tr>
                                <th className='data-set'>Unit Price</th>
                                <th className='data-set'>USD</th>
                                <th className='data-set'>Qty</th>
                                <th className='data-set'>Expiration</th>
                                <th className='data-set'>From</th>
                                <th className='data-set'>
                                <Select options={options}
                                  isSearchable={false}
                                    // menuIsOpen={true}
                                  placeholder="Sort By" /></th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <td className='data-set'><p className='unit-name'><img src={Eth} className="unit-wallet" alt="" />ETH</p></td>
                                <td className='data-set'>$12 534,36</td>
                                <td className='data-set'>7</td>
                                <td className='data-set'>29 days</td>
                                <td className='data-set'>123KKlasav</td>
                                <td className='data-set'>Accept</td>
                              </tr>
                            </tbody>
                          </table>

                        </div>
                      </Accordion>
                    </div>
                  </div>
                </div>
                <div className='nft-data-items'>
                  <h6 className='title'>10 items</h6>
                  <div className='nft-data-items-inner'>
                    <div className='item-card'>
                      <img src={DemoImg} className="item-card-img" alt="" />
                      <div className='item-card-detail'>
                        <p className='item-card-detail-name'>Elon Musk Astronaut</p>
                        <h5 className='item-card-detail-id'>Elon Musk Astronaut #2</h5>
                      </div>
                      <p>x1</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className='main-nft-activity'>
              <div className='main-nft-activity-inner'>
                <div className='nft-accordian'>
                  <div className="wrapper">
                    <Accordion title="Description" >
                      <div className='nft-activity'>
                        <div className='nft-activity-filter'>
                          <MultiSelect
                            options={filterOptions}
                            isMulti
                            controlShouldRenderValue={false}
                            placeholder="Filter"
                            className="nft-activity-filter-dropdown"
                            value={filters}
                            onChange={setFilters}
                            disableSearch={true}
                            valueRenderer={filterall}

                          />
                          <div className='filter-data'>
                            {
                              filters.length > 0 ?
                                filters.map((item) => {
                                  return (
                                    <>
                                      <div className='filter-data-box'>
                                        <span className='filter-data-box-filter'>{item.value}</span>
                                        <button type="button" className='filter-data-box-close' onClick={() => deleteItem(item.id)}><Close /></button>
                                      </div>
                                    </>
                                  )
                                })
                                :
                                null
                            }
                            {
                              filters.length > 0 ? <button className='filter-data-clear' onClick={() => handleRemoveFieldsAll()}>Clear All</button> : null
                            }

                          </div>
                        </div>
                        <div className='nft-activity-table'>
                          <table className='item-activity'>
                            <thead>
                              <tr>
                                <th className='head'>Event</th>
                                <th className='head'>Price</th>
                                <th className='head'>Quantity</th>
                                <th className='head'>From</th>
                                <th className='head'>To</th>
                                <th className='head'>Date</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <td className='items'><p className='title'><img src={Tag} className='title-icon' alt="" />List</p></td>
                                <td className='items'><p className='title'><img src={Eth} className='title-icon' alt="" />0,09</p></td>
                                <td className='items'><p className='title'>1</p></td>
                                <td className='items'><p className='title'><span className='title-name'>Elon Musk</span></p></td>
                                <td className='items'><p className='title'><span className='title-name'>Awesomes</span></p></td>
                                <td className='items'><p className='title'>8 days ago</p></td>
                              </tr>
                              <tr>
                                <td className='items'><p className='title'><img src={Exclaim} className='title-icon' alt="" />Offer<span className='valid'>Expired</span></p></td>
                                <td className='items'><p className='title'><img src={Eth} className='title-icon' alt="" />0,09</p></td>
                                <td className='items'><p className='title'>1</p></td>
                                <td className='items'><p className='title'><span className='title-name'>Elon Musk</span></p></td>
                                <td className='items'><p className='title'><span className='title-name'>Awesomes</span></p></td>
                                <td className='items'><p className='title'>8 days ago</p></td>
                              </tr>
                              <tr>
                                <td className='items'><p className='title'><img src={Bid} className='title-icon' alt="" />Bid</p></td>
                                <td className='items'><p className='title'><img src={Eth} className='title-icon' alt="" />0,09</p></td>
                                <td className='items'><p className='title'>1</p></td>
                                <td className='items'><p className='title'><span className='title-name'>Elon Musk</span></p></td>
                                <td className='items'><p className='title'><span className='title-name'>Awesomes</span></p></td>
                                <td className='items'><p className='title'>8 days ago</p></td>
                              </tr>
                              <tr>
                                <td className='items'><p className='title'><img src={Tag} className='title-icon' alt="" />List</p></td>
                                <td className='items'><p className='title'><img src={Eth} className='title-icon' alt="" />0,09</p></td>
                                <td className='items'><p className='title'>1</p></td>
                                <td className='items'><p className='title'><span className='title-name'>Elon Musk</span></p></td>
                                <td className='items'><p className='title'><span className='title-name'>Awesomes</span></p></td>
                                <td className='items'><p className='title'>8 days ago</p></td>
                              </tr>
                              <tr>
                                <td className='items'><p className='title'><img src={Mint} className='title-icon' alt="" />Minted</p></td>
                                <td className='items'><p className='title'><img src={Eth} className='title-icon' alt="" />0,09</p></td>
                                <td className='items'><p className='title'>1</p></td>
                                <td className='items'><p className='title'><span className='title-name'>Elon Musk</span></p></td>
                                <td className='items'><p className='title'><span className='title-name'>Awesomes</span></p></td>
                                <td className='items'><p className='title'>8 days ago</p></td>
                              </tr>
                              <tr>
                                <td className='items'><p className='title'><img src={Tag} className='title-icon' alt="" />List</p></td>
                                <td className='items'><p className='title'><img src={Eth} className='title-icon' alt="" />0,09</p></td>
                                <td className='items'><p className='title'>1</p></td>
                                <td className='items'><p className='title'><span className='title-name'>Elon Musk</span></p></td>
                                <td className='items'><p className='title'><span className='title-name'>Awesomes</span></p></td>
                                <td className='items'><p className='title'>8 days ago</p></td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </Accordion>
                  </div>
                </div>
              </div>
            </div>
            <div className='main-nft-slider'>
              <div className="nftmarketplace-header-poster">
                <h4 className='title'>More From This Collection</h4>
                <Slider {...settings}>
                  <div className='card'>
                    <NftCard />
                  </div>
                  <div className='card'>
                    <NftCard />
                  </div>
                  <div className='card'>
                    <NftCard />
                  </div>
                  <div className='card'>
                    <NftCard />
                  </div>
                  <div className='card'>
                    <NftCard />
                  </div>
                  <div className='card'>
                    <NftCard />
                  </div>
                </Slider>
              </div>
              {/* <div className="mediaeye-swiper-pagination withscroll mediaeye-product-more-pagination"></div>              */}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MainNFT;