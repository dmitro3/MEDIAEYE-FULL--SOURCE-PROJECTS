import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { useMoralis } from 'react-moralis';
import Switch from 'react-switch';
import { ChainHexString } from '../../blockchain/functions/ChangeChain/ChainHexStrings';
import { queryCollectionsByChain } from '../../blockchain/functions/Collection';
import { Close, Plus } from '../Icons/';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const AddSocialEvents = () => {
  const { user, Moralis } = useMoralis();
  const [selected, setSelected] = useState(-1);
  const [collectionSelectable, setSelectable] = useState(true);
  const [collections, setCollections] = useState([]);
  const activeNetwork = useSelector((state) => state.app.activeNetwork);
  const [collection, setCollection] = useState('none');
  const [activeImages, setActiveImages] = useState([]);
  const [toggleRelatedEvent, setToggleRelatedEvent] = useState(true);
  const [approvedList, setApprovedList] = useState([]);
  const [contentList, setContentList] = useState([]);
  const [activeToken, setActiveToken] = useState(null);
  const [startDate, setStartDate] = useState(new Date());
  const scrollToRef = (ref) => window.scrollTo(0, ref.current.offsetTop);
  const [isLogin, setIsLogin] = useState(
    localStorage.getItem('isLogin') ? localStorage.getItem('isLogin') : 'false'
  );
  const [eventStatus, seteventStatus] = useState(0);
  const [eventNumber, setEventNumber] = useState([]);

  let handleStartDate = new Date();

  const handleActiveToken = async (type) => {
    // deselect all when changing tokens
    let newContentList = [...approvedList];
    newContentList.map((content) => {
      content.isSelected = false;
    });

    setActiveImages([]);
    setContentList([]);
    setActiveToken(type);
  };

  const switchRelatedEvent = () => {
    if (toggleRelatedEvent) {
      setToggleRelatedEvent(false);
      setSelected(-1);
      setSelectable(true);
    } else {
      setToggleRelatedEvent(true);
    }
  };

  const queryCollectionList = async () => {
    const params = {
      chain: ChainHexString(activeNetwork),
      userAddress: user?.attributes?.ethAddress
    };
    const result = await queryCollectionsByChain(Moralis, params);
    setCollections(result);
    if (result.length > 0) {
      // set initial collection
      const initIndex = -1;
      if (initIndex > -1) {
        handleActiveToken(result[initIndex].attributes.collectionType);
        setSelected(initIndex);
        setSelectable(false);
        setCollection(result[initIndex].attributes.collectionAddress);
      }
    }
  };

  useEffect(() => {
    setIsLogin(localStorage.getItem('isLogin'));
    queryCollectionList();
  }, [user, eventNumber]);

  const addEventList = (type, element) => {
    if (type === 'addRelatedEvent') {
      let data = {};
      let newUploadList = [...eventNumber];
      data.time = new Date().toString();
      newUploadList[newUploadList.length] = data;
      setEventNumber(newUploadList);
      seteventStatus(1);
    } else if (type === 'removeRelatedEvent') {
      let newUploadList = [...eventNumber];
      var a = newUploadList.findIndex((ele) => ele.time == element.time);
      newUploadList.splice(a, 1);
      setEventNumber(newUploadList);
    }
  };
  const eventAddFun = (data, type, element) => {
    if (type == 'input') {
      element.EventName = data.target.value;
    } else if (type == 'Link') {
      element.Link = data.target.value;
    } else if (type == 'textarea') {
      element.Description = data.target.value;
    } else {
      element.date = data;
    }
    let newUploadList = [...eventNumber];
    var a = newUploadList.findIndex((ele) => ele.time == element.time);
    newUploadList[a] = element;
    console.log(newUploadList, 'newUploadList');
    setEventNumber(newUploadList);
  };

  return (
    <div className="mediaeye-CreateCampaign-wrapper-card">
      <div className="mediaeye-CreateCampaign-wrapper-card-switch mediaeyeinfo mediaeyeswitch">
        <Switch
          id="toggleEvents"
          className={`mediaeyeswitch-btn mediaeyeswitch-right m-r-15 ${toggleRelatedEvent ? 'active' : ''
            } `}
          checkedIcon={false}
          uncheckedIcon={false}
          onChange={() => {
            switchRelatedEvent();
          }}
          checked={toggleRelatedEvent}
          height={21}
          width={50}
        />
        <label className="TextWhite" htmlFor="toggleEvents">Add Social Media & Streaming Events</label>
      </div>
      <div className="mediaeye-CreateCampaign-wrapper-card-inner">
        <div className="mediaeye-CreateCampaign-wrapper-card-inner-body">
          {toggleRelatedEvent ? (
            <>
              <div className="mediaeye-CreateCampaign-wrapper-card-inner-body-mainleft">
                <div className="mediaeye-CreateCampaign-wrapper-card-inner-body-mainleft-col">
                  <div className="mediaeye-CreateCampaign-wrapper-card-inner-body-mainleft-colleft">
                    <div className="mediaeyeform-group">
                      <label className="mediaeyeform-label" htmlFor="eventName">Event Name</label>
                      <div className="mediaeyeform-group-input">
                        <input
                          id="eventName"
                          type="text"
                          className="mediaeyeform-input"
                          placeholder="My First Event Name"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="mediaeye-CreateCampaign-wrapper-card-inner-body-mainleft-colright">
                    <div className="mediaeyeform-group">
                      <label className="mediaeyeform-label" htmlFor="startingDate">Start Date</label>
                      <div className="mediaeyeform-group-input">
                        <div className="mediaeye-datepicker">
                          <DatePicker
                            id="startingDate"
                            minDate={new Date()}
                            className="mediaeyeform-input"
                            withPortal
                            selected={startDate}
                            onChange={(date) => setStartDate(date)}
                            dateFormat="yyyy-MM-dd"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mediaeye-CreateCampaign-wrapper-card-inner-body-mainleft-colfull">
                  <div className="mediaeyeform-group">
                    <label className="mediaeyeform-label" htmlFor="eventDescription">Description</label>
                    <div className="mediaeyeform-group-input">
                      <div className="mediaeyetextarea">
                        <textarea
                          id="eventDescription"
                          className="mediaeyetextarea-input"
                          rows="5"
                          placeholder="My NFT Description, pattern of narrative development that aims to make vivid a place, object, character, or group. "
                        ></textarea>
                      </div>
                    </div>
                  </div>

                  <div className="mediaeyeform-group m-0">
                    <label className="mediaeyeform-label" htmlFor="eventLink">Link</label>
                    <div className="mediaeyeform-group-input">
                      <input
                        id="eventLink"
                        type="text"
                        className="mediaeyeform-input"
                        placeholder="https://discord.com/"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="mediaeye-CreateCampaign-wrapper-card-inner-body-mainright">
                <div
                  className="mediaeye-event-card mediaeye-event-card-full"
                  onClick={() => addEventList('addRelatedEvent')}
                >
                  <div className="mediaeye-event-card-inner mediaeye-event-card-inner-add">
                    <div className="mediaeye-event-card-inner-add-content">
                      <div className="mediaeye-event-card-inner-add-content-icon">
                        <Plus />
                      </div>
                      <div className="mediaeye-event-card-inner-add-content-text">
                        Add Event
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : null}
        </div>
      </div>
      {eventStatus === 1
        ? eventNumber.map((element, i, array) => (
          <>
            <h1>{element.valength}</h1>
            <div
              className="mediaeye-CreateCampaign-wrapper-card-inner-body-mainleft m-t-30"
              key={i}
            >
              <div
                className="mediaeye-CreateCampaign-close"
                onClick={() => addEventList('removeRelatedEvent', element)}
              >
                <Close />
              </div>
              <div className="mediaeye-CreateCampaign-wrapper-card-inner-body-mainleft-col">
                <div className="mediaeye-CreateCampaign-wrapper-card-inner-body-mainleft-colleft">
                  <div className="mediaeyeform-group">
                    <label className="mediaeyeform-label" htmlFor="eventName">Event Name</label>
                    <div className="mediaeyeform-group-input">
                      <input
                        id="eventName"
                        type="text"
                        className="mediaeyeform-input"
                        placeholder="My First Event Name"
                        value={element.EventName}
                        onChange={(data) =>
                          eventAddFun(data, 'input', element)
                        }
                      />
                    </div>
                  </div>
                </div>
                <div className="mediaeye-CreateCampaign-wrapper-card-inner-body-mainleft-colright">
                  <div className="mediaeyeform-group">
                    <label className="mediaeyeform-label" htmlFor="startDate">Start Date</label>
                    <div className="mediaeyeform-group-input">
                      <div className="mediaeye-datepicker">
                        <DatePicker
                          id="startDate"
                          minDate={new Date()}
                          className="mediaeyeform-input"
                          withPortal
                          selected={element.date ? element.date : startDate}
                          onChange={(data) =>
                            eventAddFun(data, 'date', element)
                          }
                          dateFormat="yyyy-MM-dd"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mediaeye-CreateCampaign-wrapper-card-inner-body-mainleft-colfull">
                <div className="mediaeyeform-group">
                  <label className="mediaeyeform-label" htmlFor="description">Description</label>
                  <div className="mediaeyeform-group-input">
                    <div className="mediaeyetextarea">
                      <textarea
                        id="description"
                        className="mediaeyetextarea-input"
                        rows="5"
                        placeholder="Paste Embed Code"
                        value={element.Description}
                        onChange={(data) =>
                          eventAddFun(data, 'textarea', element)
                        }
                      ></textarea>
                    </div>
                  </div>
                </div>

                <div className="mediaeyeform-group m-0">
                  <label className="mediaeyeform-label" htmlFor="link2">Link</label>
                  <div className="mediaeyeform-group-input">
                    <input
                      id="link2"
                      type="text"
                      className="mediaeyeform-input"
                      value={element.Link}
                      placeholder="https://discord.com/"
                      onChange={(data) => eventAddFun(data, 'Link', element)}
                    />
                  </div>
                </div>
              </div>
            </div>
          </>
        ))
        : null}
    </div>
  );
};

export default AddSocialEvents;
