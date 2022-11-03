import React, { useEffect, useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory, Link, useParams } from 'react-router-dom';
import {
  Share,
  Verticale,
  Copy,
  Facebook,
  Twitter,
  HeartLike
} from '../../Icons/';

import './CharityCard.scss';
import { TwitterShareButton, FacebookShareButton } from 'react-share';

const CharityCard = (props) => {
  const { charity, onClickAction, active, isFeatured } = props;
  const { charityDetailname, charityDetailid } = useParams();
  let pathName;
  let State = {};
  if (charity?.type == "Giving Block") {
    let slug = charity?.name;
    let newslug = slug.replace(/\s+/g, '-');
    let oldslug = newslug.replaceAll('/', '-');
    slug = oldslug;
    pathName = `/charity-place/${slug}/${charity?.orgId}`
    State.organizationId = charity?.orgId;
    State.organizationType = charity?.type;
  } else {
    let slug = charity?.irdRegisterName;
    let newslug = slug.replace(/\s+/g, '-');
    let oldslug = newslug.replaceAll('/', '-');
    slug = oldslug;
    pathName = `/charity-place/${slug}/${charity?._id}`
    State.organizationId = charity?._id;
    State.organizationType = charity?.type;
  }

  const [url, setUrl] = useState();
  const [showCardAction, setShowCardAction] = useState(false);
  const [showCardActionmenu, setShowCardActionmenu] = useState(false);
  const cardRef = useRef(null);
  const [dimensionHeight, setDimensionHeight] = useState(0);

  useEffect(() => {
    setDimensionHeight(
      cardRef.current.clientWidth - (cardRef.current.clientWidth / 8) * 3
    );
  });
  const openCartionActionDropdown = (type) => {
    if (showCardActionmenu === type) {
      setShowCardActionmenu('');
    } else {
      setShowCardActionmenu(type);
    }
  };
  useEffect(() => {
    let hosturl = window.location.href.split(window.location.pathname);
    setUrl(`${hosturl[0]}/charity-place/charity-detail-page`);
  });

  const cardActionbox = () => {
    return (
      <div
        className="mediaeye-charity-card-inner-action"
        onClick={(event) => event.preventDefault()}
      >
        <div className="mediaeye-charity-card-inner-action-header">
          <div
            className={
              showCardActionmenu === 'share'
                ? 'mediaeye-charity-card-inner-action-header-btn active'
                : 'mediaeye-charity-card-inner-action-header-btn'
            }
            onClick={() => openCartionActionDropdown('share')}
          >
            <Share />
          </div>
          <div
            onClick={() => openCartionActionDropdown('action')}
            className="mediaeye-charity-card-inner-action-header-btn"
          >
            <HeartLike />
          </div>
        </div>

        {showCardActionmenu === 'share' ? (
          <div
            className="mediaeye-charity-card-inner-action-body"
            onClick={() => openCartionActionDropdown('')}
          >
            <div
              className="mediaeye-charity-card-inner-action-body-row"
              onClick={() => {
                navigator.clipboard.writeText(url);
              }}
            >
              <div className="mediaeye-charity-card-inner-action-body-row-icon">
                <Copy type="white" />
              </div>
              Copy Link
            </div>
            <TwitterShareButton
              className="mediaeye-charity-card-inner-action-body-row"
              url={url}
            >
              <div className="mediaeye-charity-card-inner-action-body-row-icon">
                {' '}
                <Twitter />{' '}
              </div>{' '}
              Share on Twitter
            </TwitterShareButton>
            <FacebookShareButton
              className="mediaeye-charity-card-inner-action-body-row"
              url={url}
            >
              <div className="mediaeye-charity-card-inner-action-body-row-icon">
                <Facebook type="circle" />
              </div>
              Share on Facebook
            </FacebookShareButton>
          </div>
        ) : null}
      </div>
    );
  };
  return (
    <>
      <div className="mediaeye-charity-card">
        <Link
          ref={cardRef}
          className="mediaeye-charity-card-inner"
          to={{
            pathname: pathName,
            state: State
          }}
          type={isFeatured === true ? 'featured' : 'simple'}
          onMouseLeave={() => {
            setShowCardAction(false);
            setShowCardActionmenu('');
          }}
          onMouseEnter={() => setShowCardAction(true)}
        >
          <div className="mediaeye-charity-card-inner-imgbox">
            <div className="mediaeye-charity-card-inner-imgbox-slide">
              <img
                className="mediaeye-charity-card-inner-imgbox-slide-img"
                src={charity?.type == "Giving Block" ? charity?.logo : charity?.charityLogo.filePath}
                alt="The Giving Block Charity Logo"
              />
            </div>
            {showCardAction ? cardActionbox() : null}
          </div>
          <div className="mediaeye-charity-card-inner-content">
            <div className="mediaeye-charity-card-inner-content-inner">
              <div className="mediaeye-charity-card-inner-content-title">
                {charity?.type == "Giving Block" ? charity?.name : charity?.irdRegisterName}
              </div>
              {charity?.description ? (
                <div className="mediaeye-charity-card-inner-content-des">
                  {charity?.type == "Giving Block" ? charity?.description : charity?.charityDescription}
                </div>
              ) : null}
              <div className="mediaeye-charity-card-inner-content-bottom">
                <div className="mediaeye-charity-card-inner-content-bottom-colLeft">
                  {charity?.type == "Giving Block" ? (
                    <div className="mediaeye-charity-card-inner-content-bottom-colLeft-item">
                      <img
                        src="/img/charity/givingblock.png"
                        alt="The Giving Block Charity Logo"
                      />
                    </div>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        </Link>
      </div>
    </>
  );
};

export default CharityCard;
