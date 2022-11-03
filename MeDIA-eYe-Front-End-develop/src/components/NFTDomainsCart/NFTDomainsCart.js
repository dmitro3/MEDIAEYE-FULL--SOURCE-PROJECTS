import React, { useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { SearchIcon, Trash } from '../Icons';
import './NFTDomainsCart.scss';

const NFTDomainsCart = (props) => {
  const location = useLocation();
  const domaincartdata = location?.state?.domaincartdata;
  const domainsuggestioncartdata = location?.state?.domainsuggestioncartdata;
  const freedomainsuggestioncartdata = location?.state?.freedomainsuggestioncartdata;

  const [datagetstate, setdatagetstate] = useState(0);
  const [allcartdata, setallcartdata] = useState([]);
  const [totalamount, settotalamount] = useState();
  const [livestatus, setlivestatus] = useState("Yes");

  if (datagetstate == 0) {
    setdatagetstate(1);
    const allcart_data = domaincartdata.concat(domainsuggestioncartdata, freedomainsuggestioncartdata);
    setallcartdata(allcart_data);
  };

  const deleteCartItem = (index) => {
    let cartval = [...allcartdata];
    cartval.splice(index, 1);
    setallcartdata(cartval)
  };

  const clearCart = () => {
    let cartval = [...allcartdata];
    cartval.length = 0;
    setallcartdata(cartval)
  };

  useEffect(() => {
    if (datagetstate == 1) {
      let val = 0;
      for (let i = 0; i < allcartdata.length; i++) {
        if (allcartdata[i].dname) {
          val = val + allcartdata[i]?.availability?.price
        } else {
          val = val + allcartdata[i]?.price
        }
      }
      settotalamount(val)
    }
  }, [allcartdata]);

  return (
    <div className="carts-page-content">
      <div className="carts-page-content-header">
        <h2 className="carts-page-content-header-heading">NFT Domains</h2>
      </div>
      <div className="carts-page-content-box">
        <h2 className="carts-page-content-box-head">{allcartdata.length} Item</h2>
        <div className="carts-page-content-box-wrapper">
          <div className="carts-page-content-box-wrapper-left">
            {allcartdata.length > 0 ? (
              allcartdata.map((element, index, array) => {
                return (
                  <div className="carts-page-content-box-wrapper-left-item">
                    <h3>
                      {
                        element?.dname ? <span>{element?.domain?.name}</span> : <span>{element?.name}</span>
                      }
                    </h3>
                    <div className="carts-page-content-box-wrapper-left-item-end">
                      {
                        element?.dname ? <h4>{element?.availability?.price}</h4> : <h4>$ {element?.price}</h4>
                      }
                      <div onClick={() => deleteCartItem(index)}>
                        <Trash />
                      </div>

                    </div>
                  </div>
                )
              })
            ) : (
              <div>
                <h1>No data available</h1>
              </div>
            )}

            < div className="carts-page-content-box-wrapper-left-row">
              <NavLink
                to="/profile/nftdomains"
                className="carts-page-content-box-wrapper-left-row-item"
              >
                <SearchIcon type={'white'} /> Search more domains
              </NavLink>
              <span className="carts-page-content-box-wrapper-left-row-btn" onClick={() => clearCart()}>
                Clear Cart
              </span>
            </div>
          </div>
          <div className="carts-page-content-box-wrapper-right">
            <div className="carts-page-content-box-wrapper-right-head m-b-15">
              <span>Total Due</span>
              <span>{totalamount} $</span>
            </div>
            <div className="carts-page-content-box-wrapper-right-box">
              <span className="text-semitransperant">
                Do you live in the USA?
              </span>
              <div className="radio-custom ">

                <input
                  type="radio"
                  value="Yes"
                  id="Yes"
                  checked={livestatus === "Yes"}
                  onChange={() => setlivestatus("Yes")}
                />
                <label htmlFor="Yes"> Yes</label>

                <input
                  type="radio"
                  value="No"
                  id="No"
                  checked={livestatus === "No"}
                  onChange={() => setlivestatus("No")}
                />
                <label htmlFor="No">No</label>
              </div>
            </div>
            <div className="carts-page-content-box-wrapper-right-checkout btn btn-gaming">
              Checkout
            </div>
          </div>
        </div>
      </div>
    </div >
  );
};

export default NFTDomainsCart;
