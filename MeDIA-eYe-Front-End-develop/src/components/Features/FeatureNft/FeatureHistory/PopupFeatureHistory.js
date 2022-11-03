import React, { useEffect, useState } from 'react';
import bnc from '../../../../assets/img/bnc.png';
import { CloseIcon } from '../../../Icons';
import './PopupFeatureHistory.scss';
import droparrow from '../../../../assets/img/faq_arrow.png';
import { UrlJsonRpcProvider } from '@ethersproject/providers';
import listProfile from '../../../../assets/img/list-profile.png';
import { array } from 'prop-types';

import { FeatureHistoryJson } from '../../../../utils/JsonData';

export default function PopupFeatureHistory(props) {
  const [historyDropdownid, setHistoryDropdownid] = useState('');
  const listdata = FeatureHistoryJson();

  const showHistoryDropdown = (id) => {
    setHistoryDropdownid(id === historyDropdownid ? '' : id);
  };

  const historyDropdownContent = () => {
    return (
      <div className="history-dropdown">
        <div className="history-dropdown-row">
          <div className="history-dropdown-row-left">
            <span>Type</span>
          </div>
          <div className="history-dropdown-row-right">
            <span>Collection</span>
          </div>
        </div>
        <div className="history-dropdown-row">
          <div className="history-dropdown-row-left">
            <span>Start Date</span>
          </div>
          <div className="history-dropdown-row-right">
            <span>26/04/22</span>
          </div>
        </div>
        <div className="history-dropdown-row">
          <div className="history-dropdown-row-left">
            <span>End Date</span>
          </div>
          <div className="history-dropdown-row-right">
            <span>13/05/22</span>
          </div>
        </div>
        <div className="history-dropdown-row">
          <div className="history-dropdown-row-left">
            <span>Total Cost</span>
          </div>
          <div className="history-dropdown-row-right">
            <div className="costTag">
              <img src={bnc} alt="BNC" />
              <span className="historyName">0.25 BNB</span>
            </div>
          </div>
        </div>
        <div className="history-dropdown-row">
          <div className="history-dropdown-row-left">
            <span>Statusss</span>
          </div>
          <div className="history-dropdown-row-right">
            <span className="statusstag">In Progress</span>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div
      className={
        props.openFeatureHistory ? 'mediaeye-popup active' : 'mediaeye-popup'
      }
    >
      <div className="mediaeye-popup-wrapper feature-history-popup scrolled">
        <div className="mediaeye-popup-content">
          <div className="mediaeye-popup-content-inner feature-history-popup-inner">
            <div className="feature-history-page-inner-title">
              <div className="mediaeye-popup-close" onClick={props.togglePopup}>
                <CloseIcon />
              </div>
              <div className="mediaeye-popup-content-inner-header">
                <div className="mediaeye-popup-content-inner-header-title">
                  <span>Spotlight History</span>
                </div>
              </div>
            </div>
            <div className="feature-history-popup-inner-headings">
              <span>Name</span>
              <div className="feature-history-popup-inner-headings-content">
                <span className="typeClass">Type</span>
                <span>Start Date</span>
                <span>End Date</span>
                <span>Total Cost</span>
                <span>Status</span>
              </div>
            </div>
            <div className="feature-history-popup-inner-historyData mediaeyefancyScroll">
              <div className="feature-history-popup-inner-historyData-containsAllData">
                {listdata.map((item) => (
                  <div
                    className="feature-history-popup-inner-historyData-containsAllData-innerContent"
                    key={item.id}
                  >
                    <div
                      className="feature-history-popup-inner-historyData-containsAllData-innerContent-cover"
                      onClick={() => showHistoryDropdown(item.id)}
                    >
                      <div className="costTag feature-history-popup-inner-historyData-containsAllData-innerContent-cover-group1">
                        <img src={listProfile} alt="ListProfile" />
                        <span className="historyName">{item.name}</span>
                      </div>
                      <div className="feature-history-popup-inner-historyData-containsAllData-innerContent-cover-group2">
                        <span>{item.type}</span>
                        <span>{item.startDate}</span>
                        <span>{item.endDate}</span>
                        <div className="costTag">
                          <img src={bnc} alt="BNC" />
                          <span>{item.cost}</span>
                        </div>
                        <span className="statusstag2">{item.status}</span>
                      </div>
                      <div className="setDropdown">
                        <img
                          className={
                            item.id === historyDropdownid ? 'rotate-arrow' : ''
                          }
                          src={droparrow}
                          alt="Arrow"
                        />
                      </div>
                    </div>

                    {item.id === historyDropdownid
                      ? historyDropdownContent()
                      : null}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
