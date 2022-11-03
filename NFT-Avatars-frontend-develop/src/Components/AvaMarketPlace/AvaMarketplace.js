import React, { useState } from 'react';
import "./AvaMarketplace.scss";
import ETH from "../../assets/images/Wallet/eth-small.png";
import Heart from "../../assets/images/Wallet/heart.png";
import DemoCard from "../../assets/images/demo-market.png";
import CardUser from '../CardUser/CardUser';
import { MultiSelect } from "react-multi-select-component";
import Select from 'react-select'
// import { components } from 'react-select';
// import { sassFalse } from 'sass';

const options = {
  options1: [
    { label: "Collections", value: "Collections" },
    { label: "Single", value: "Single" },
    { label: "Bundle", value: "Bundle" },
  ],
  options2: [
    { label: "Fixed Bid", value: "Fixed Bid" },
    { label: "Auction", value: "Auction" },
    { label: "Offer", value: "Offer" },
  ],
  options3: [
    { label: "Crazy Apes S...", value: "Crazy Apes S..." },
    { label: "Crazy Apes S...", value: "Crazy Apes S..." },
    { label: "Mutant Apes...", value: "Mutant Apes..." },
    { label: "Okay Bears", value: "Okay Bears" },
    { label: "BEANZ Official", value: "BEANZ Official" },
    { label: "Doodles", value: "Doodles" },
    { label: "Meebits", value: "Meebits" },
  ],
  options4: [
    { label: "Stars", value: "Stars" },
    { label: "Pets", value: "Pets" },
    { label: "Brands", value: "Brands" },
    { label: "Influencers", value: "Influencers" },
    { label: "Sports", value: "Sports" },
    { label: "Entertainment", value: "Entertainment" },
  ],
  options5: [
    { label: "ETH", value: "ETH" },
    { label: "BSC", value: "BSC" },
    { label: "FTM", value: "FTM" },
  ],
  sort: [
    { label: "Price High to Low", value: "High to Low" },
    { label: "Price Low to High", value: "Low to High" },
    { label: "New", value: "New" },
    { label: "Sold", value: "Sold" },
  ],

};

const AvaMarketplace = () => {

  const [items, setItems] = useState([]);
  const [sales, setSales] = useState([]);
  const [collection, setCollection] = useState([]);
  const [category, setCategory] = useState([]);
  const [chain, setChain] = useState([]);
  // const [sort, setSort] = useState([]);
  // const [selected, setSelected] = useState([]);
  const allItems = (selected, _options) => {
    return selected.length
      ? selected.map(({ label }) => "✔️ " + label)
      : "All items";
  };
  const salesType = (selected, _options) => {
    return selected.length
      ? selected.map(({ label }) => "✔️ " + label)
      : "Sales Type";
  };
  const collections = (selected, _options) => {
    return selected.length
      ? selected.map(({ label }) => "✔️ " + label)
      : "Collections";
  };
  const categorys = (selected, _options) => {
    return selected.length
      ? selected.map(({ label }) => "✔️ " + label)
      : "Category";
  };
  const chains = (selected, _options) => {
    return selected.length
      ? selected.map(({ label }) => "✔️ " + label)
      : "Chains";
  };
  // const sortBy = (selected, _options) => {
  //   return selected.length
  //     ? selected.map(({ label }) => "✔️ " + label)
  //     : "Sort By";
  // };



  return (
    <>
      <div className='mediaProfilepage-wrap'>
        <div className='mediaeyeAvatar-layout-middle'>
          <div className='mediaeyeAvatar-layout-container'>
            <div className='avaMarketplace'>
              <div className='avaMarketplace-inner'>
                <h1 className='title'>aVaMARKETPLACE</h1>
                <div className='avaMarketplace-inner-filter'>
                  <div className='dropdown-item'>
                    <MultiSelect
                      options={options.options1}
                      value={items}
                      valueRenderer={allItems}
                      onChange={setItems}
                      labelledBy="All items"
                      isOpen={true}
                      disableSearch={true}
                    />
                    
                    <MultiSelect
                      options={options.options2}
                      value={sales}
                      valueRenderer={salesType}
                      onChange={setSales}
                      labelledBy="Sales Type"
                      
                      disableSearch={true}
                      hasSelectAll={false}
                      
                    />
                    <MultiSelect
                      options={options.options3}
                      value={collection}
                      valueRenderer={collections}
                      onChange={setCollection}
                      labelledBy="Collections"
                      className="select-search"
                      isOpen={true}
                    />
                    <MultiSelect
                      options={options.options4}
                      value={category}
                      valueRenderer={categorys}
                      onChange={setCategory}
                      labelledBy="Category"
                      // isOpen={false}
                      disableSearch={true}
                      hasSelectAll={false}
                    />
                    <MultiSelect
                      options={options.options5}
                      value={chain}
                      valueRenderer={chains}
                      onChange={setChain}
                      labelledBy="Chains"
                      // isOpen={false}
                      disableSearch={true}
                      hasSelectAll={false}
                    />
                  </div>
                  <div className='sort-items'>
                  <Select options={options.sort}
                  classNamePrefix="sort-item"
                  defaultValue={{label:"Sort by"}}
                  isSearchable={false}
                  // menuIsOpen={true}
                   />
                  </div>
                </div>
                <div className='filter-data'>
                    {
                      sales.length >0 ?
                      sales.map((item)=> {
                        return(
                          <>
                          <div className='filter-data-box'>
                          <span className='filter-data-box-title'>Sales:</span>
                          <span className='filter-data-box-value'>{item.value}</span>
                          </div>
                          </>
                        )
                      })
                      :
                      null
                    } 

                    {
                      items.length >0 ?
                      items.map((item)=> {
                        return(
                          <>
                          <div className='filter-data-box'>
                          <span className='filter-data-box-title'>All items:</span>
                          <span className='filter-data-box-value'>{item.value}</span>
                          </div>
                          </>
                        )
                      })
                      :
                      null
                    } 
                    {
                      collection.length >0 ?
                      collection.map((item)=> {
                        return(
                          <>
                          <div className='filter-data-box'>
                          <span className='filter-data-box-title'>Collections:</span>
                          <span className='filter-data-box-value'>{item.value}</span>
                          </div>
                          </>
                        )
                      })
                      :
                      null
                    } 
                    {
                      category.length >0 ?
                      category.map((item)=> {
                        return(
                          <>
                          <div className='filter-data-box'>
                          <span className='filter-data-box-title'>Category:</span>
                          <span className='filter-data-box-value'>{item.value}</span>
                          </div>
                          </>
                        )
                      })
                      :
                      null
                    } 
                    {
                      chain.length >0 ?
                      chain.map((item)=> {
                        return(
                          <>
                          <div className='filter-data-box'>
                          <span className='filter-data-box-title'>Chain:</span>
                          <span className='filter-data-box-value'>{item.value}</span>
                          </div>
                          </>
                        )
                      })
                      :
                      null
                    } 
                  
                </div>
                <div className='avaMarketplace-inner-data'>
                  
                  <CardUser/>
                  <div className='marketplace-card'>
                    <div className='marketplace-card-inner'>
                      <img src={DemoCard} className='marketplace-card-proimg' alt="ava-market" />
                      <div className='marketplace-card-inner-detail'>
                        <p className='name'>Bored Ape Yacht Club</p>
                        <p className='valhas'>#8500</p>
                        <div className='social-rate'>
                          <h5 className='likes'><img src={Heart} className='' alt='heart' />1,2k</h5>
                          <div className=''>
                            <h5 className='title'>Price</h5>
                            <h5 className='likes'><img src={ETH} className='' alt="eth" /> 54</h5>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className='marketplace-card'>
                    <div className='marketplace-card-inner'>
                      <img src={DemoCard} className='marketplace-card-proimg' alt="ava-market" />
                      <div className='marketplace-card-inner-detail'>
                        <p className='name'>Bored Ape Yacht Club</p>
                        <p className='valhas'>#8500</p>
                        <div className='social-rate'>
                          <h5 className='likes'><img src={Heart} className='' alt='heart' />1,2k</h5>
                          <div className=''>
                            <h5 className='title'>Price</h5>
                            <h5 className='likes'><img src={ETH} className='' alt="eth" /> 54</h5>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className='marketplace-card'>
                    <div className='marketplace-card-inner'>
                      <img src={DemoCard} className='marketplace-card-proimg' alt="ava-market" />
                      <div className='marketplace-card-inner-detail'>
                        <p className='name'>Bored Ape Yacht Club</p>
                        <p className='valhas'>#8500</p>
                        <div className='social-rate'>
                          <h5 className='likes'><img src={Heart} className='' alt='heart' />1,2k</h5>
                          <div className=''>
                            <h5 className='title'>Price</h5>
                            <h5 className='likes'><img src={ETH} className='' alt="eth" /> 54</h5>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className='marketplace-card'>
                    <div className='marketplace-card-inner'>
                      <img src={DemoCard} className='marketplace-card-proimg' alt="ava-market" />
                      <div className='marketplace-card-inner-detail'>
                        <p className='name'>Bored Ape Yacht Club</p>
                        <p className='valhas'>#8500</p>
                        <div className='social-rate'>
                          <h5 className='likes'><img src={Heart} className='' alt='heart' />1,2k</h5>
                          <div className=''>
                            <h5 className='title'>Price</h5>
                            <h5 className='likes'><img src={ETH} className='' alt="eth" /> 54</h5>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AvaMarketplace;