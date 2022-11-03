import React, { useState } from 'react';
import './NewsletterMain.scss';
import { Helmet } from 'react-helmet';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import emailjs from 'emailjs-com';
import { toggleGeneralPopup } from '../../store/app/appSlice';
import ReCAPTCHA from 'react-google-recaptcha';
var validate = require('validate.js');
const NewsletterMain = (props) => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [fname, setFname] = useState('');
  const [lname, setLname] = useState('');
  const [checked, setChecked] = useState(false);
  // const [validEmail, setValidEmail] = useState(true);
  const [checkedValid, setCheckedValid] = useState(true);
  const [captchaValidation, setCaptchaValidation] = useState(false);

  const handleChangeFname = (event) => {
    setFname(event.target.value);
  };

  const handleChangeLname = (event) => {
    setLname(event.target.value);
  };

  const handleChangeEmail = (event) => {
    setEmail(event.target.value);
  };

  const onChangeCaptcha = (value) => {
    if (value) {
      setCaptchaValidation(true);
    } else {
      setCaptchaValidation(false);
    }
  };

  var constraints = {
    email: {
      presence: true,
      email: true
    }
  };

  const [newsletterFormError, setNewsletterFormError] = useState([]);

  const handleSubmit = (event) => {
    var form = document.querySelector('#mediaeye-newsletter-form');
    var errors = validate(form, constraints);
    setNewsletterFormError(errors);
    // if (email == '') {
    //   setValidEmail(false);
    // } else {
    //   setValidEmail(true);
    // }

    if (checked == true) {
      setCheckedValid(true);
    } else {
      setCheckedValid(false);
    }
    event.preventDefault();
    if (errors == undefined) {
      if (captchaValidation == true && checked == true) {
        emailjs.sendForm(
          'service_8p76rtc',
          'template_3pxskgn',
          event.target,
          'user_EJiwvXDAMeoW6oOr4UYrR'
        );
        var data = {
          listid: '3e582b30-8593-4679-9f05-10fb89f2281b',
          firstname: fname,
          lastname: lname,
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
              dispatch(
                toggleGeneralPopup({
                  status: 'success',
                  message: 'Thank you, you have been subscribed successfully!',
                  textButton: 'OK',
                  size: 'sm'
                })
              );
            }
            if (response.data.code == 400) {
              dispatch(
                toggleGeneralPopup({
                  status: 'success',
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
                status: 'success',
                message: 'Sorry, failed to subscribe newsletter!',
                textButton: 'OK',
                size: 'sm'
              })
            );
          });
        setEmail('');
        setFname('');
        setLname('');
      }
    }
  };

  return (
    <>
      <Helmet>
        <meta
          property="og:url"
          content={window.location.origin + '/newsletter'}
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:title"
          content="NFT Web 3.0 Services on BSC ETH FTM chains: Marketplace, Generative Collections for Creators, Artists, Sports, Gaming and Charities | MEDIA EYE"
        />
        <meta
          property="og:description"
          content="Most extesnive range of NFT driven services: campaigns, events, airdrops, avatars, marketplace, integrated socials and digital marketing tools"
        />
        <meta
          property="og:image"
          content={window.location.origin + '/img/meta_tag/NEWSLETTER.png'}
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta property="twitter:domain" content="mediaeyenft.com/newsletter" />
        <meta
          property="twitter:url"
          content={window.location.origin + '/newsletter'}
        />
        <meta
          name="twitter:title"
          content="NFT Web 3.0 Services on BSC ETH FTM chains: Marketplace, Generative Collections for Creators, Artists, Sports, Gaming and Charities | MEDIA EYE"
        />
        <meta
          name="twitter:description"
          content="Most extesnive range of NFT driven services: campaigns, events, airdrops, avatars, marketplace, integrated socials and digital marketing tools"
        />
        <meta
          name="twitter:image"
          content={window.location.origin + '/img/meta_tag/NEWSLETTER.png'}
        />
        <title>
          NFT Web 3.0 Services on BSC ETH FTM chains: Marketplace, Generative
          Collections for Creators, Artists, Sports, Gaming and Charities |
          MEDIA EYE{' '}
        </title>
        <meta
          name="description"
          content="Most extesnive range of NFT driven services: campaigns, events, airdrops, avatars, marketplace, integrated socials and digital marketing tools"
        />
      </Helmet>
      <div className="newsletter-page">
        <div className="newsletter-page-left"></div>
        <div className="newsletter-page-right">
          <div className="newsletter-page-right-content">
            <div className="newsletter-page-right-content-header">
              <h1 className="newsletter-page-right-content-header-signup">
                Sign Up for Our Newsletter
              </h1>
              <div className="newsletter-page-right-content-header-label">
                Sign up here to get the latest news, updates, and special offers
                delivered to your inbox.
              </div>
            </div>
            <div className="newsletter-page-right-content-inner">
              <form onSubmit={handleSubmit} id="mediaeye-newsletter-form">
                <div className="newsletter-page-right-content-inner-name">
                  <div className="mediaeyeform-group">
                    <label className="mediaeyeform-label">First Name</label>
                    <div className="mediaeyeform-group-input">
                      <input
                        type="text"
                        className="mediaeyeform-input"
                        name="fname"
                        value={fname}
                        onChange={handleChangeFname}
                      />
                    </div>
                  </div>
                  <div className="mediaeyeform-group">
                    <label className="mediaeyeform-label">Last Name</label>
                    <div className="mediaeyeform-group-input">
                      <input
                        type="text"
                        className="mediaeyeform-input"
                        name="lname"
                        value={lname}
                        onChange={handleChangeLname}
                      />
                    </div>
                  </div>
                </div>
                <div className="mediaeyeform-group">
                  <label className="mediaeyeform-label">
                    Email<span className="required-label">*</span>
                  </label>
                  <div className="mediaeyeform-group-input">
                    <input
                      type="email"
                      className={
                        newsletterFormError?.email
                          ? 'mediaeyeform-input mediaeyeform-group-input-error-border'
                          : 'mediaeyeform-input'
                      }
                      value={email}
                      onChange={handleChangeEmail}
                      name="email"
                    />
                  </div>
                  {newsletterFormError?.email ? (
                    <div className="mediaeyeform-group-input-error-message">
                      {newsletterFormError?.email}
                    </div>
                  ) : null}
                </div>
                <div className="mediaeyeform-group">
                  <label className="mediaeyeform-label">
                    Add me to your mailing list
                    <span className="required-label"> *</span>
                  </label>
                  <div className="newsletter-page-right-content-inner-checkbox">
                    <input
                      type="checkbox"
                      className="mediaeyeform-input newsletter-page-right-content-inner-checkbox-size"
                      defaultChecked={checked}
                      onChange={() => setChecked(!checked)}
                    />
                    <label
                      className={
                        checkedValid
                          ? 'mediaeyeform-label'
                          : 'mediaeyeform-label checkrequired'
                      }
                    >
                      I agree to receive marketing emails and special deals
                    </label>
                  </div>
                </div>
                <div className="newsletter-page-right-content-inner-captcha">
                  <ReCAPTCHA
                    sitekey="6Lf-rqUdAAAAALw42hFp9lNBPUjXSlvPDxRiKd_7"
                    onChange={onChangeCaptcha}
                  />
                </div>
                <button className="btn btn-info" type="submit">
                  <span>Submit</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NewsletterMain;
