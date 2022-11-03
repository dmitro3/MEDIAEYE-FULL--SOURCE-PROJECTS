import './CharitySection.scss';
import { element } from 'prop-types';
import { DataArrayTexture } from 'three';
import { useDispatch } from 'react-redux';
import ItemLoader from '../../Common/ItemLoader';
import React, { useEffect, useState } from 'react';
import CharityCard from '../CharityCard/CharityCard';
import InfiniteScroll from 'react-infinite-scroll-component';
import {
  givingBlockOrganizationlist
} from '../../../blockchain/functions/Charity/charitycollection';


const CharitySection = (props) => {
  const chairtyType = props?.type;
  const taxReceipt = props?.taxReceipt;
  const searchInput = props?.searchInput;
  const [hasMore, sethasMore] = useState(true);
  const [dataload, setdataload] = useState(0);
  const [pageNumber, setpageNumber] = useState(1);
  const [datastate, setdatastate] = useState(0);
  const [charityData, setcharityData] = useState([]);
  const [allcharitydata, setallcharitydata] = useState([]);
  const [searchingcharityData, setsearchingcharityData] = useState([]);

  const organizationlist = async () => {
    if (!searchInput) {
      if (chairtyType == 'Giving Block' && taxReceipt == 'All') {
        let dataarr = [];
        allcharitydata.map((element, index) => {
          if (element.isGivingBlock == 'yes') {
            dataarr.push(element);
          }
        });
        setcharityData(dataarr);
        setsearchingcharityData(dataarr);
        setdataload(1);
        setdatastate(1);
      };
      if (taxReceipt == 'yes') {
        let dataarr = [];
        allcharitydata.map((element, index) => {
          if (element.isReceiptEnabled === true) {
            dataarr.push(element);
          }
        });
        setcharityData(dataarr);
        setsearchingcharityData(dataarr);
        setdataload(1);
        setdatastate(1);
      };
      if (taxReceipt == 'no') {
        let dataarr = [];
        allcharitydata.map((element, index) => {
          if (element.isReceiptEnabled === false) {
            dataarr.push(element);
          }
        });
        setcharityData(dataarr);
        setsearchingcharityData(dataarr);
        setdataload(1);
        setdatastate(1);
      };
      if (chairtyType == 'All' && taxReceipt == 'All') {
        const givingBlockOrganizationres = await givingBlockOrganizationlist(pageNumber);
        if (givingBlockOrganizationres && givingBlockOrganizationres.length > 0) {
          setpageNumber(2);
          setcharityData(givingBlockOrganizationres);
          setsearchingcharityData(givingBlockOrganizationres);
          setallcharitydata(givingBlockOrganizationres);
          setdataload(1);
          setdatastate(1);
        } else {
          setdataload(2);
        }
      };
    } else {
      let dataarr = [];
      let search = searchInput.toLowerCase();
      searchingcharityData.map((element, index) => {
        let name = element.name.toLowerCase();
        if (name === search) {
          let a = [element];
          setcharityData(a);
        }
        if (name.includes(search) === true) {
          dataarr.push(element);
        }
      });
      setdatastate(1);
      setcharityData(dataarr);
    };
  };


  useEffect(() => {
    if (!searchInput) {
      setdataload(0);
    }
    organizationlist();
  }, [chairtyType, taxReceipt, searchInput]);

  const fetchData = async () => {
    const givingBlockOrganizationres = await givingBlockOrganizationlist(pageNumber);
    if (givingBlockOrganizationres && givingBlockOrganizationres.length > 0) {
      const a = [...charityData];
      const addgivingkeyarr = a.concat(givingBlockOrganizationres);
      setpageNumber(pageNumber + 1);
      setcharityData(addgivingkeyarr);
      setsearchingcharityData(addgivingkeyarr);
      setallcharitydata(addgivingkeyarr);
      setdataload(1);
    } else {
      sethasMore(false);
    }
  };

  useEffect(() => {
    if (charityData.length <= 0 && datastate == 1) {
      setdataload(2);
      sethasMore(false);
    }
  }, [charityData]);

  return (
    <div>
      <InfiniteScroll
        dataLength={charityData.length}
        next={fetchData}
        hasMore={hasMore}
        loader={<h4>Loading...</h4>}
      >
        <div className="mediaeye-charity-row">
          {dataload == 1 ? (
            charityData.map((charity, i) => (
              <CharityCard charity={charity} key={i} />
            ))
          ) : dataload == 0 ? (
            <> <ItemLoader /></>
          ) : (
            <div>
              <h1>No data available</h1>
            </div>
          )}
        </div>
      </InfiniteScroll>
    </div>
  );
};

export default CharitySection;
