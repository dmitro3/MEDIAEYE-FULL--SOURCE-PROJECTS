import React, { useState, useEffect } from 'react';
import './Popup.scss';
import {
  CloseIcon,
  Connect,
  Error,
  Info,
  Loading,
  Success,
  Copy
} from '../Icons/';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import {
  toggleGeneralPopup,
  closeGeneralPopup
} from '../../store/app/appSlice';

const Popup = (props) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const showPopup = useSelector((state) => state.app.showGeneralPopup);
  const title = useSelector((state) => state.app.titleGeneralPopup);
  const message = useSelector((state) => state.app.messageGeneralPopup);
  const submessage = useSelector((state) => state.app.submessageGeneralPopup);
  const status = useSelector((state) => state.app.statusGeneralPopup);
  const textButton = useSelector((state) => state.app.textButtonGeneralPopup);
  const linkButton = useSelector((state) => state.app.linkButtonGeneralPopup);
  const size = useSelector((state) => state.app.sizeGeneralPopup);
  const copyText = useSelector((state) => state.app.copyTextGeneralPopup);
  const copyTextLink = useSelector(
    (state) => state.app.copyTextLinkGeneralPopup
  );
  const autoClose = useSelector((state) => state.app.autoCloseGeneralPopup);
  const [copyLink, setCopyLink] = useState(false);

  useEffect(() => {
    if (copyLink === true) {
      setTimeout(() => {
        setCopyLink(false);
      }, 3000);
    }
  }, [copyLink]);
  const detectgeneralPopupClose = (e) => {
    if (autoClose === 'false') {
      console.log('stop');
      e.stopPropagation();
    } else {
      dispatch(closeGeneralPopup());
    }
  };
  const popupImage = () => {
    if (status === 'success' || status === 'max') {
      return <Success />;
    } else if (status === 'error') {
      return <Error />;
    } else if (status === 'info') {
      return <Info />;
    } else if (status === 'loading') {
      return (
        <div className="mediaeye-animation-loading">
          {' '}
          <Loading type="new" />
        </div>
      );
    } else if (status === 'connect') {
      return <Connect />;
    } else {
      return null;
    }
  };

  const popupMessae = () => {
    if (status === 'loading') {
      return (
        <div className="mediaeye-animation-dots">
          Processing <span className="mediaeye-animation-dots-blink">.</span>
          <span className="mediaeye-animation-dots-blink">.</span>
          <span className="mediaeye-animation-dots-blink">.</span>
        </div>
      );
    } else {
      return message;
    }
  };
  return (
    <React.Fragment>
      {showPopup ? (
        <div
          className={
            showPopup
              ? size
                ? 'mediaeye-popup active mediaeye-popup-' + size
                : 'mediaeye-popup active'
              : 'mediaeye-popup'
          }
          priority="super"
        >
          <div
            className="mediaeye-popup-wrapper mediaeye-popup-general scrolled"
            onClick={(e) => {
              detectgeneralPopupClose(e);
            }}
          >
            <div className="mediaeye-popup-content">
              <div className="mediaeye-popup-content-inner">
                {/* <div className="mediaeye-popup-close" onClick={() => dispatch(closeGeneralPopup())}>
                <CloseIcon />
              </div> */}

                <div className="mediaeye-popup-content-inner-header text-center">
                  <div className="mediaeye-popup-content-inner-header-title">
                    {popupImage()}
                  </div>
                </div>
                {title ? (
                  <div className="mediaeye-popup-general-title">{title}</div>
                ) : null}
                {message ? (
                  <div className="mediaeye-popup-general-message">
                    {popupMessae()}
                  </div>
                ) : null}
                {submessage ? (
                  <div className="mediaeye-popup-general-submessage">
                    {submessage}
                  </div>
                ) : null}

                {copyText ? (
                  <div className="mediaeye-popup-general-copytext  mediaeye-copy">
                    {copyTextLink ? (
                      <a
                        href={copyTextLink}
                        className="text-link text-link-underline"
                        target="_blank"
                      >
                        {copyText}
                      </a>
                    ) : (
                      <>{copyText}</>
                    )}
                    <div className="mediaeye-copy-box">
                      <button
                        className="mediaeye-copy-btn"
                        onClick={() => {
                          navigator.clipboard.writeText(copyText);
                          setCopyLink(true);
                        }}
                      >
                        <Copy />
                      </button>
                      <div className="mediaeye-copy-box-msg">
                        {copyLink ? 'Copied!' : null}
                      </div>
                    </div>
                  </div>
                ) : null}

                <div className="mediaeye-popup-general-bottom">
                  {linkButton ? (
                    <Link
                      to={linkButton}
                      className="btn btn-main"
                      onClick={() => dispatch(closeGeneralPopup())}
                    >
                      {textButton ? textButton : 'OK'}
                    </Link>
                  ) : textButton ? (
                    <button
                      type="button"
                      className="btn btn-main"
                      onClick={() => dispatch(closeGeneralPopup())}
                    >
                      {textButton}
                    </button>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </React.Fragment>
  );
};

export default Popup;
