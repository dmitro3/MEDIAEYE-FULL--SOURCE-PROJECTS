import _ from 'underscore';
import './NFTDomains.scss';
import { Link } from 'react-router-dom';
import ItemLoader from '../Common/ItemLoader';
import SelectSearch from 'react-select-search';
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toggleGeneralPopup } from '../../store/app/appSlice';
import { Check, Close, RightSideArrow, Sale, Bulb } from '../Icons';
import { getDomainAvailability, getdomainsuggestions, getfreedomainsuggestions } from '../../blockchain/functions/NftDomain/nftdomain';


const DomainsTags = [
  { id: 1, name: 'crypto', value: 'crypto' },
  { id: 2, name: 'nft', value: 'nft' },
  { id: 3, name: 'x', value: 'x' },
  { id: 4, name: 'wallet', value: 'wallet' },
  { id: 5, name: 'bitcoin', value: 'bitcoin' },
  { id: 6, name: 'dao', value: 'dao' },
  { id: 7, name: '888', value: '888' },
  { id: 8, name: 'zil', value: 'zil' },
  { id: 9, name: 'blockchain', value: 'blockchain' }
];

const allDomainsTags = [
  { id: 1, name: 'All', value: 'all' },
  { id: 2, name: 'crypto', value: 'crypto' },
  { id: 3, name: 'nft', value: 'nft' },
  { id: 4, name: 'x', value: 'x' },
  { id: 5, name: 'wallet', value: 'wallet' },
  { id: 6, name: 'bitcoin', value: 'bitcoin' },
  { id: 7, name: 'dao', value: 'dao' },
  { id: 8, name: '888', value: '888' },
  { id: 9, name: 'zil', value: 'zil' },
  { id: 10, name: 'blockchain', value: 'blockchain' }
];

const NFTDomains = () => {

  const dispatch = useDispatch();
  const [isSelected, setIsSelected] = useState([]);
  const slicedDomainsTags = DomainsTags.slice(0, 4);
  const [showResult, setShowResult] = useState(false);
  const [searchDomain, setSearchDomain] = useState('');
  const [showDomainName, setShowDomainName] = useState('crypto');
  const [activeDomainFilter, setActiveDomainFilter] = useState('all');
  const [showDomainChange, setShowDomainChange] = useState('results');

  const [domainName, setdomainName] = useState();
  const [domaincart, setdomaincart] = useState(false);

  const [allending, setallending] = useState(0);
  const [domainindex, setdomainindex] = useState(0);
  const [allendingdata, setallendingdata] = useState([]);
  const [domaincartdata, setdomaincartdata] = useState([]);

  const [domainsuggestion, setdomainsuggestion] = useState(0);
  const [domainsuggestiondata, setdomainsuggestiondata] = useState([]);
  const [domainsuggestioncart, setdomainsuggestioncart] = useState(false);
  const [domainsuggestioncartdata, setdomainsuggestioncartdata] = useState([]);

  const [freedomainsuggestion, setfreedomainsuggestion] = useState(0);
  const [freedomainsuggestiondata, setfreedomainsuggestiondata] = useState([]);
  const [freedomainsuggestioncart, setfreedomainsuggestioncart] = useState(false);
  const [freedomainsuggestioncartdata, setfreedomainsuggestioncartdata] = useState([]);


  const handleSearch = async (e) => {
    e.preventDefault();
    if (searchDomain) {

      const exten = DomainsTags[0].value;
      setdomainindex(0);
      const domainAvailabilityRes = await getDomainAvailability(searchDomain, exten);
      if (_.isEmpty(domainAvailabilityRes) == false) {
        setdomainName(domainAvailabilityRes)
        setShowResult(!showResult);
      }

      let type = "all"
      const getdomainsuggestionsRes = await getdomainsuggestions(type, searchDomain);
      if (getdomainsuggestionsRes && getdomainsuggestionsRes.length > 0) {
        setdomainsuggestiondata(getdomainsuggestionsRes);
        setdomainsuggestion(1);
      } else {
        setdomainsuggestion(2);
      }

      const getfreedomainsuggestionsres = await getfreedomainsuggestions(searchDomain);
      if (getfreedomainsuggestionsres && getfreedomainsuggestionsres.length > 0) {
        setfreedomainsuggestiondata(getfreedomainsuggestionsres);
        setfreedomainsuggestion(1);
      } else {
        setfreedomainsuggestion(2);
      }

    }
  };

  const hideResult = (e) => {
    if (showResult == true) {
      setIsSelected([]);
      setShowResult(false);
      setSearchDomain('');
      setdomainName(null);
      setdomaincart(false);

      setallending(0);
      setdomainindex(0);
      setallendingdata([]);
      setdomaincartdata([]);

      setdomainsuggestion(0);
      setdomainsuggestiondata([]);
      setdomainsuggestioncart(false);
      setdomainsuggestioncartdata([]);

      setfreedomainsuggestion(0);
      setfreedomainsuggestiondata([]);
      setfreedomainsuggestioncart(false);
      setfreedomainsuggestioncartdata([]);
    };
  };

  const domainSearch = (e) => {
    let slug = e.target.value;
    let newslug = slug.replace(/\s+/g, '-');
    let oldslug = newslug.replaceAll('/', '-');
    slug = oldslug;
    setSearchDomain(slug);
  };

  const handleTags = (key) => {
    let data = {};
    let newSelectedTags = [...isSelected];
    const removeIndex = newSelectedTags.findIndex((item) => item.key === key);
    if (removeIndex != -1) {
      newSelectedTags.splice(removeIndex, 1);
      setIsSelected(newSelectedTags);
      return;
    }
    data.key = key;
    newSelectedTags[newSelectedTags.length] = data;
    setIsSelected(newSelectedTags);
  };

  const isTagsActive = (id) => {
    let newSelectedTags = [...isSelected];
    var a = newSelectedTags.findIndex((ele) => ele.key == id);
    if (a !== -1) {
      return true;
    } else {
      return false;
    }
  };

  const handleDomainChange = async (type) => {
    if (type == 'all') {
      setShowDomainChange('all');
      setallending(0);
      let allendingdataa = [];
      for (let i = 0; i < DomainsTags.length; i++) {
        const exten = DomainsTags[i].value;
        const domainAvailabilityRes = await getDomainAvailability(searchDomain, exten);
        if (_.isEmpty(domainAvailabilityRes) == false) {
          allendingdataa.push(domainAvailabilityRes)
        }
      }
      if (allendingdataa.length > 0) {
        setallending(1);
        setallendingdata(allendingdataa);
      } else {
        setallending(2);
      }
    }
    if (type == 'results') {
      setShowDomainChange('results');
    }
  };

  const changeDomainTags = async (item, i) => {
    const exten = item
    const domainAvailabilityRes = await getDomainAvailability(searchDomain, exten);
    if (_.isEmpty(domainAvailabilityRes) == false) {
      setdomainindex(i);
      setShowDomainName(item);
      setdomainName(domainAvailabilityRes);
    }
  };

  const domainNameAddCart = (domain, indxx) => {
    let cartvalue = [...domaincartdata]
    domain.index = indxx;
    domain.dname = true;
    cartvalue[cartvalue.length] = domain;
    setdomaincart(true);
    setdomaincartdata(cartvalue);
  };

  const domainsuggestionsAddCart = (element) => {
    let cartvalue = [...domainsuggestioncartdata]
    cartvalue[cartvalue.length] = element;
    setdomainsuggestioncart(true);
    setdomainsuggestioncartdata(cartvalue);
  };

  const getbtn = (element, indxx) => {
    let c = 0;
    let a = 0;
    for (let i = 0; i < domaincartdata.length; i++) {
      if (domaincartdata[i]?.index === indxx) {
        c = 1
      } else {
        a = 1
      }
    }
    if (a == c) {
      return (
        <button className="btn green">
          <Check size={'small'} /> ADDED
        </button>
      )
    } else if (c == 1) {
      return (
        <button className="btn green">
          <Check size={'small'} /> ADDED
        </button>
      )
    }
    else {
      return (
        <button className="btn btn-gaming"
          onClick={() => domainNameAddCart(element, indxx)}
        >Add to cart</button>)
    }
  };

  const getdomainsuggestionsbtn = (element) => {
    let c = 0;
    let a = 0;
    for (let i = 0; i < domainsuggestioncartdata.length; i++) {
      if (domainsuggestioncartdata[i]?.name === element.name) {
        c = 1
      } else {
        a = 1
      }
    };
    if (a == c) {
      return (
        <button className="btn green">
          <Check size={'small'} /> ADDED
        </button>
      )
    } else if (c == 1) {
      return (
        <button className="btn green">
          <Check size={'small'} /> ADDED
        </button>
      )
    }
    else {
      return (
        <button className="btn btn-gaming"
          onClick={() => domainsuggestionsAddCart(element)}
        >Add to cart</button>)
    }
  };

  const changeDomainsuggestions = async (opt) => {
    if (activeDomainFilter != opt) {
      let type = ''
      if (opt == 'all') {
        type = 'all';
      } else {
        type = "singal";
      }
      setdomainsuggestion(0);
      const getdomainsuggestionsRes = await getdomainsuggestions(type, searchDomain, opt);
      if (getdomainsuggestionsRes && getdomainsuggestionsRes.length > 0) {
        setActiveDomainFilter(opt);
        setdomainsuggestiondata(getdomainsuggestionsRes);
        setdomainsuggestion(1);
      } else {
        setdomainsuggestion(2);
      }
    }
  };

  const getfreedomainsuggestionsbtn = (element) => {
    let c = 0;
    let a = 0;
    for (let i = 0; i < freedomainsuggestioncartdata.length; i++) {
      if (freedomainsuggestioncartdata[i]?.name === element.name) {
        c = 1
      } else {
        a = 1
      }
    };
    if (a == c) {
      return (
        <button className="btn green">
          <Check size={'small'} /> ADDED
        </button>
      )
    } else if (c == 1) {
      return (
        <button className="btn green">
          <Check size={'small'} /> ADDED
        </button>
      )
    }
    else {
      return (
        <button className="btn btn-gaming"
          onClick={() => freedomainsuggestionsAddCart(element)}
        >Add to cart</button>)
    }
  };

  const freedomainsuggestionsAddCart = (element) => {
    let cartvalue = [...freedomainsuggestioncartdata]
    cartvalue[cartvalue.length] = element;
    setfreedomainsuggestioncart(true);
    setfreedomainsuggestioncartdata(cartvalue);
  };

  const opencartt = () => {
    if (domaincartdata.length > 0 || domainsuggestioncartdata.length > 0 || freedomainsuggestioncartdata.length > 0) {
      window.open(
        `https://unstoppabledomains.com/search?searchTerm=${searchDomain}&ref=mediaeye`,
        '_blank'
      );
    } else {
      dispatch(
        toggleGeneralPopup({
          status: 'success',
          message: 'Empty Cart !!',
          textButton: 'OK',
          size: 'sm'
        })
      );
    }
  };

  const cartbtn = () => {
    return (
      <div
        className="domains-page-content-resultbox-row-right-col-btn btn btn-gaming"
        onClick={opencartt}
      >
        Continue to cart
      </div>
      // <Link
      //   to={{
      //     pathname: "/profile/nftdomains/cart",
      //     state: {
      //       domaincartdata: domaincartdata,
      //       domainsuggestioncartdata: domainsuggestioncartdata,
      //       freedomainsuggestioncartdata: freedomainsuggestioncartdata
      //     }
      //   }}
      //   className="domains-page-content-resultbox-row-right-col-btn btn btn-gaming"
      // >
      //   Continue to cart
      // </Link>
    )

  };

  const domain_suggestionfun = () => {
    try {
      return (
        domainsuggestiondata.map((element, index) => {
          return (
            <div className="domains-page-content-resultbox-row-left-comrow m-t-30 m-b-5" key={index}>
              <div className="domains-page-content-resultbox-row-left-comrow-leftbox">
                <div className="green-available check">
                  <Check size={'small'} />
                </div>
                <div className="domains-page-content-resultbox-row-left-comrow-available">
                  <h5>{element.name}</h5>
                </div>
              </div>
              {
                element?.price ? <h2>$ {element?.price}</h2> : ""
              }
              {domainsuggestioncart ?
                <>
                  {getdomainsuggestionsbtn(element)}
                </>
                :
                <button className="btn btn-gaming"
                  onClick={() => domainsuggestionsAddCart(element)}
                >Add to cart</button>
              }
            </div>
          )
        })
      )
    } catch (e) {
      console.log(e, 'eee')
      setdomainsuggestion(2)
    }
  };

  const free_domain_suggestionfun = () => {
    try {
      return (
        freedomainsuggestiondata.map((element, index) => {
          return (
            <div className="domains-page-content-resultbox-row-left-comrow m-b-5" key={index}>
              <div className="domains-page-content-resultbox-row-left-comrow-leftbox">
                <div className="green-available check">
                  <Check size={'small'} />
                </div>
                <div className="domains-page-content-resultbox-row-left-comrow-available">
                  <h5>{element.name}</h5>
                </div>
              </div>
              {
                element?.price ? <h2>$ {element?.price}</h2> : ""
              }
              {freedomainsuggestioncart ?
                <>
                  {getfreedomainsuggestionsbtn(element)}
                </>
                :
                <button className="btn btn-gaming"
                  onClick={() => freedomainsuggestionsAddCart(element)}
                >Add to cart</button>
              }
            </div>
          )
        })
      )
    } catch (e) {
      console.log(e, 'eee')
      setfreedomainsuggestion(2)
    }
  };


  return (
    <div className="domains-page-content">
      <div className="domains-page-content-header">
        <h2 className="domains-page-content-header-heading">NFT Domains</h2>
      </div>
      {showResult ? null : (
        <>
          <h3 className="domains-page-content-header-heading text-center prpl">
            No Renewal Fees Ever
          </h3>
          <div className="domains-page-content-tags">
            {DomainsTags.map((domain, i) => (
              <div
                className={
                  isTagsActive(domain.id)
                    ? 'domains-page-content-tags-button active'
                    : 'domains-page-content-tags-button'
                }
                key={domain.id}
                onClick={() => handleTags(domain.id)}
              >
                .{domain.name}
              </div>
            ))}
          </div>
          <p className="text-semitransperant text-center">
            Grab yours before it's gone forever. Starting at $5+
          </p>
        </>
      )}
      <div
        className={
          showResult
            ? 'domains-page-content-searchbox auto'
            : 'domains-page-content-searchbox'
        }
      >
        <form
          className="mediaeyeform-group-input"
          id="NFTDomains"
          onSubmit={(e) => handleSearch(e)}
        >
          {showResult ? (
            <input
              type="text"
              className="mediaeyeform-input"
              placeholder="Search for your new domain"
              onChange={(e) => domainSearch(e)}
              value={searchDomain}
              aria-labelledby="NFTDomains"
              disabled={true}
            />
          ) : (
            <input
              type="text"
              className="mediaeyeform-input"
              placeholder="Search for your new domain"
              onChange={(e) => domainSearch(e)}
              value={searchDomain}
              aria-labelledby="NFTDomains"
            />
          )}
          {showResult ? (
            <div className="close" onClick={(e) => hideResult(e)}>
              <Close />
            </div>
          ) : null}
          {showResult ? (
            <div className="search btn-gaming"></div>
          ) : (
            <input type="submit" value="SEARCH" className="btn btn-gaming" />
          )}
        </form>
      </div>
      {showResult ? (
        <div className="domains-page-content-resultbox">
          <div className="domains-page-content-resultbox-header">
            <h4 className="domains-page-content-resultbox-header-heading">
              Endings for {searchDomain}
            </h4>
            <div className="domains-page-content-tags">
              <button
                className={
                  showDomainChange == 'results'
                    ? 'domains-page-content-tags-button active'
                    : 'domains-page-content-tags-button'
                }
                onClick={() => handleDomainChange('results')}
              >
                Results
              </button>
              <button
                className={
                  showDomainChange == 'all'
                    ? 'domains-page-content-tags-button active'
                    : 'domains-page-content-tags-button'
                }
                onClick={() => handleDomainChange('all')}
              >
                All Endings
              </button>
            </div>
          </div>
          <div className="domains-page-content-resultbox-row">

            <div className="domains-page-content-resultbox-row-left">
              {showDomainChange == 'results' ? (
                <>
                  <div className="domains-page-content-resultbox-row-left-toprow">
                    {slicedDomainsTags.map((item, i) => (
                      <div key={i}
                        className={
                          showDomainName == item.name
                            ? 'domains-page-content-resultbox-row-left-toprow-box active'
                            : 'domains-page-content-resultbox-row-left-toprow-box'
                        }
                        onClick={() => changeDomainTags(item.name, i)}
                      >
                        <div>
                          <h5>{item.name}</h5>
                          <p>
                            <div className="green-available check">
                              <Check size={'small'} />
                            </div>
                            {domainindex === i ?
                              domainName?.availability?.price ? <span>${domainName?.availability?.price}</span>
                                :
                                ""
                              : null
                            }
                          </p>
                        </div>
                      </div>
                    ))}
                    <div
                      className="domains-page-content-resultbox-row-left-toprow-box"
                      onClick={() => handleDomainChange('all')}
                    >
                      <div>
                        <h5>
                          <RightSideArrow />
                        </h5>
                        <h6>All endings</h6>
                      </div>
                    </div>
                  </div>
                  <div className="domains-page-content-resultbox-row-left-comrow m-b-20">
                    <div className="domains-page-content-resultbox-row-left-comrow-leftbox">
                      {
                        domainName?.availability?.registered ? "" : <div className="green-available check">
                          <Check size={'small'} />
                        </div>
                      }

                      <div className="domains-page-content-resultbox-row-left-comrow-available">
                        <h5>
                          {domainName?.domain?.name}
                        </h5>
                        {
                          domainName?.availability?.registered ? "" : <div className="green-available text">AVAILABLE</div>
                        }
                      </div>
                    </div>
                    {
                      domainName?.availability?.price ? <h2>$ {domainName?.availability?.price}</h2> : ""
                    }
                    {domaincart ?
                      <>
                        {getbtn(domainName, domainindex)}
                      </>
                      :
                      <button className="btn btn-gaming"
                        onClick={() => domainNameAddCart(domainName, domainindex)}
                      >Add to cart</button>
                    }
                  </div>
                </>
              ) : showDomainChange == 'all' && allending == 1 ? (
                <>
                  {allendingdata.map((element, indxx) => (
                    <div className="domains-page-content-resultbox-row-left-comrow m-b-5" key={indxx}>
                      <div className="domains-page-content-resultbox-row-left-comrow-leftbox">
                        {
                          element?.availability?.registered ? "" : <div className="green-available check">
                            <Check size={'small'} />
                          </div>
                        }
                        <div className="domains-page-content-resultbox-row-left-comrow-available">
                          <h5>
                            {element?.domain?.name}
                          </h5>
                          {
                            element?.availability?.registered ? "" : <div className="green-available text">AVAILABLE</div>
                          }
                        </div>
                      </div>
                      {
                        element?.availability?.price ? <h2>$ {element?.availability?.price}</h2> : ""
                      }

                      {domaincart ?
                        <>
                          {getbtn(element, indxx)}
                        </>
                        :
                        <button className="btn btn-gaming"
                          onClick={() => domainNameAddCart(element, indxx)}
                        >Add to cart</button>
                      }
                    </div>
                  ))}
                </>

              ) : allending == 0 ? (
                <> <ItemLoader /></>
              ) : (
                <div>
                  <h1>No data available</h1>
                </div>
              )}

              <div
                className="domains-page-content-resultbox-header m-t-30"
                style={{ width: '100%' }}
              >
                <h4 className="domains-page-content-resultbox-header-heading">
                  Suggested names
                </h4>
                <div className="mediaeyeform-group-input mediaeyefancyScroll dropdown">
                  <SelectSearch
                    className="mediaeye-selectsearch mediaeye-selectsearch-white-arrow dark-style"
                    size="lg"
                    options={allDomainsTags}
                    value={activeDomainFilter}
                    placeholder={activeDomainFilter}
                    onChange={(opt) => changeDomainsuggestions(opt)}
                  />
                </div>
              </div>
              {
                domainsuggestion == 1 ? (
                  // { cartbtn() }
                  domain_suggestionfun()

                )
                  :
                  domainsuggestion == 0 ?
                    <> <ItemLoader /></>
                    :
                    <div>
                      <h1>No data available</h1>
                    </div>
              }

              <div
                className="domains-page-content-resultbox-header m-t-30 m-b-20"
                style={{ width: '100%' }}
              >
                <h4 className="domains-page-content-resultbox-header-heading">
                  Free Domain Name Suggestions
                </h4>
              </div>
              {
                freedomainsuggestion == 1 ? (
                  free_domain_suggestionfun()
                  // freedomainsuggestiondata.map((element, index) => {
                  //   return (
                  //     <div className="domains-page-content-resultbox-row-left-comrow m-b-5" key={index}>
                  //       <div className="domains-page-content-resultbox-row-left-comrow-leftbox">
                  //         <div className="green-available check">
                  //           <Check size={'small'} />
                  //         </div>
                  //         <div className="domains-page-content-resultbox-row-left-comrow-available">
                  //           <h5>{element.name}</h5>
                  //         </div>
                  //       </div>
                  //       {
                  //         element?.price ? <h2>$ {element?.price}</h2> : ""
                  //       }
                  //       {freedomainsuggestioncart ?
                  //         <>
                  //           {getfreedomainsuggestionsbtn(element)}
                  //         </>
                  //         :
                  //         <button className="btn btn-gaming"
                  //           onClick={() => freedomainsuggestionsAddCart(element)}
                  //         >Add to cart</button>
                  //       }
                  //     </div>
                  //   )
                  // })
                )
                  :
                  freedomainsuggestion == 0 ?
                    <> <ItemLoader /></>
                    :
                    <div>
                      <h1>No data available</h1>
                    </div>
              }
            </div>
            <div className="domains-page-content-resultbox-row-right">
              <div className="domains-page-content-resultbox-row-right-col">
                {cartbtn()}
                <div className="domains-page-content-resultbox-row-right-col-desc m-t-30">
                  <Bulb />
                  <span>
                    All domain purchases are a one-time payment. Unstoppable
                    Domains have no renewal fees.
                  </span>
                </div>
                <div className="domains-page-content-resultbox-row-right-col-desc m-t-10">
                  <Sale />
                  <span>
                    Adding a domain to cart does not prevent others from buying
                    that domain.
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div >
      ) : null
      }
    </div >
  );
};

export default NFTDomains;
