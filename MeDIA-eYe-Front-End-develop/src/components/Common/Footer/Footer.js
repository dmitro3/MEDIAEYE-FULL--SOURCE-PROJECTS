import React, { useState } from 'react';
import { withRouter } from 'react-router';
import { Link, NavLink, useHistory, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import sfLogo from '../../../assets/img/Solidity.png';
import logo from '../../../assets/img/logo.png';
import emailjs from 'emailjs-com';
import axios from 'axios';
import { toggleGeneralPopup } from '../../../store/app/appSlice';
import {
  Twitter,
  Instagram,
  Telegram,
  Medium,
  Discord
} from '../../../components/Icons/';
import './Footer.scss';
import { useMoralis } from 'react-moralis';
var validate = require('validate.js');

const Footer = (props) => {
  const { user, Moralis, isInitialized } = useMoralis();
  const dispatch = useDispatch();
  const location = useLocation();
  const [email, setEmail] = useState('');

  var constraints = {
    email: {
      presence: true,
      email: true
    }
  };

  const [errorsNewsletter, setErrorsNewsletter] = useState([]);

  const newTo = {
    pathname: '/about',
    param1: 'Par1'
  };

  const handleSubmit = (event) => {
    var form = document.querySelector('#mediaeye-footer-newsletter');
    var errors = validate(form, constraints);
    setErrorsNewsletter(errors);
    event.preventDefault();
    if (errors == undefined) {
      emailjs.sendForm(
        'service_8p76rtc',
        'template_3pxskgn',
        event.target,
        'user_EJiwvXDAMeoW6oOr4UYrR'
      );
      var data = {
        listid: '3e582b30-8593-4679-9f05-10fb89f2281b',
        firstname: '',
        lastname: '',
        email: email
      };

      var config = {
        method: 'post',
        url: ' https://api.mediaeyenft.com/socialmediafunction/user/sendgridemail',
        data: data
      };
      axios(config)
        .then(function (response) {
          if (response.data.code == 200) {
            setEmail('');
            dispatch(
              toggleGeneralPopup({
                status: 'success',
                message: 'Thank you, you have been subscribed successfully!',
                textButton: 'OK',
                size: 'sm'
              })
            );
          } else {
            dispatch(
              toggleGeneralPopup({
                status: 'error',
                message: 'Something Went Wrong!',
                textButton: 'OK',
                size: 'sm'
              })
            );
          }
        })
        .catch(function (error) {
          dispatch(
            toggleGeneralPopup({
              status: 'error',
              message: 'Sorry, failed to subscribe newsletter!',
              textButton: 'OK',
              size: 'sm'
            })
          );
        });
    }
  };
  const uniqueString = new Date().getTime();
  if (
    // location.pathname === '/connect-wallet' ||
    location.pathname === '/metaverse-landing'
  ) {
    return '';
  }
  return (
    <footer className="mediaeye-layout-footer">
      <div className="mediaeye-layout-middle">
        <div className="mediaeye-layout-footer-content">
          <div className="mediaeye-layout-footer-content-partLogo">
            <div className="mediaeye-layout-footer-content-partLogo-logo">
              <img className="footer_logo" src={logo} alt="Media Eye Logo" />
            </div>
            <div className="mediaeye-layout-footer-content-partLogo-text">
              NFTs UNBOUND
            </div>
          </div>

          <div className="mediaeye-layout-footer-content-partLink mediaeye-layout-footer-content-secondary">
            <div className="mediaeye-layout-footer-content-partLink-col">
              <a
                target="_blank"
                href="https://docs.mediaeyenft.com/"
                className="mediaeye-layout-footer-content-link"
              >
                Litepaper
              </a>
              <a
                target="_blank"
                href="https://blog.mediaeyenft.com/"
                className="mediaeye-layout-footer-content-link"
              >
                Blog
              </a>
              <Link
                to="/cohort"
                className="mediaeye-layout-footer-content-link"
              >
                {' '}
                Earn
              </Link>
              <Link to="/" className="mediaeye-layout-footer-content-link">
                {' '}
                Contact
              </Link>
              <Link to="/" className="mediaeye-layout-footer-content-link">
                EYEQ DAO
              </Link>
            </div>
          </div>

          <div className="mediaeye-layout-footer-content-partJoin">
            <div className="mediaeye-layout-footer-content-heading">
              Join the community
            </div>
            <div className="mediaeye-layout-footer-content-social">
              <a
                href="https://t.me/MEDIAEYENFTPortal"
                target="_blank"
                rel="noreferrer"
                title="Telegram"
                className="mediaeye-layout-footer-content-social-btn"
              >
                <Telegram />
              </a>
              <a
                href="https://twitter.com/MeDIAeYeNFT"
                target="_blank"
                rel="noreferrer"
                title="Twitter"
                className="mediaeye-layout-footer-content-social-btn"
              >
                <Twitter />
              </a>

              <a
                href="https://discord.com/invite/XHpfUdqJK7"
                target="_blank"
                rel="noreferrer"
                title="Discord"
                className="mediaeye-layout-footer-content-social-btn"
              >
                <Discord />
              </a>

              <a
                href="https://www.instagram.com/mediaeyenfts/"
                target="_blank"
                rel="noreferrer"
                title="Instagram"
                className="mediaeye-layout-footer-content-social-btn"
              >
                <Instagram />
              </a>

              <a
                href="https://medium.com/@MeDIAeYeNFT"
                target="_blank"
                rel="noreferrer"
                title="Medium"
                className="mediaeye-layout-footer-content-social-btn"
              >
                <Medium />
              </a>
            </div>
          </div>

          <div className="mediaeye-layout-footer-content-subscription">
            <div className="mediaeye-layout-footer-content-heading">
              Subscribe to our newsletter
            </div>
            <form onSubmit={handleSubmit} id="mediaeye-footer-newsletter">
              <div className="mediaeyeform-group">
                <label className="mediaeyeform-group-input">
                  <input
                    className={
                      errorsNewsletter?.email
                        ? 'mediaeyeform-input mediaeyeform-group-input-error-border'
                        : 'mediaeyeform-input'
                    }
                    type="email"
                    placeholder="Your Email"
                    value={email}
                    name="email"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  {errorsNewsletter?.email ? (
                    <div className="mediaeyeform-group-input-error-message">
                      {errorsNewsletter?.email}
                    </div>
                  ) : null}
                  <div className="mediaeyeform-group-input-addon">
                    <button
                      type="submit"
                      className="btn btn-transperant btn-square"
                    >
                      SUBMIT
                    </button>
                  </div>
                </label>
              </div>
            </form>
          </div>
        </div>
        <div className="mediaeye-layout-footer-bottom">
          <div className="mediaeye-layout-footer-bottom-left">
            <div className="mediaeye-layout-footer-bottom-text">
              MEDIA EYE NFT Portal &copy; {new Date().getFullYear()}
            </div>
          </div>
          <div className="mediaeye-layout-footer-bottom-right">
            <a
              href="https://solidity.finance/audits/MeDIAeYe/"
              target="_blank"
              rel="noreferrer"
              className="mediaeye-layout-footer-bottom-text"
            >
              Audited by Solidity.Finance <img src={sfLogo} alt="SFLogo" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default withRouter(Footer);
