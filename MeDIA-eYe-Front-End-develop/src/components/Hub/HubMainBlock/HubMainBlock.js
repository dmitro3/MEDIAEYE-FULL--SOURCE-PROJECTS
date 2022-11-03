import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
const HubMainBlock = (props) => {
  const { title, img, link, isDeactive } = props;
  const dispatch = useDispatch();
  return (
    <div className="hub-page-boxrow-col">
      {link ? (
        <Link
          className={
            isDeactive
              ? 'isDeactive hub-page-boxrow-col-inner'
              : 'hub-page-boxrow-col-inner'
          }
          to={link}
        >
          <div className="hub-page-boxrow-col-inner-title">{title}</div>
          <div className="hub-page-boxrow-col-inner-imgbox">
            <img
              src={img}
              className="hub-page-boxrow-col-inner-imgbox-img"
              alt="HubImg"
            />
          </div>
        </Link>
      ) : (
        <div
          data-tip="Coming soon in Beta"
          data-position="bottom"
          data-class="mediaeyetooltip"
          className={
            isDeactive
              ? 'isDeactive hub-page-boxrow-col-inner'
              : 'hub-page-boxrow-col-inner'
          }
        >
          <div className="hub-page-boxrow-col-inner-title">{title}</div>
          <div className="hub-page-boxrow-col-inner-imgbox">
            <img
              src={img}
              className="hub-page-boxrow-col-inner-imgbox-img"
              alt="HubImg"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default HubMainBlock;
