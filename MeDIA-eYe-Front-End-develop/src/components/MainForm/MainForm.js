import React, { useState } from 'react';
import './mainform.scss';
import emailjs from 'emailjs-com';
import axios from 'axios';
import Swal from 'sweetalert2';
import { toggleGeneralPopup } from '../../store/app/appSlice';
import { useSelector, useDispatch } from 'react-redux';

// Images & Media
import signup_person from '../../assets/img/about_us/signup_person.png';
import signup_person1 from '../../assets/img/about_us/signup_person1.png';
var validate = require('validate.js');

const MainForm = (props) => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState(' ');

  const handleChangeEmail = (event) => {
    setEmail(event.target.value);
  };

  var constraints = {
    email: {
      presence: true,
      email: true
    }
  };

  const [aboutNewsletterFormError, setAboutNewsletterFormError] = useState([]);

  const handleSubmit = (event) => {
    var form = document.querySelector('#mediaeye-about-newsletter-form');
    var errors = validate(form, constraints);
    setAboutNewsletterFormError(errors);
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
    }
  };

  return (
    <section className="mediaeye-layout-section withspace">
      <div className="mediaeye-layout-container fullwidth">
        <div
          className="mediaeye-layout-container-nform wow animate__animated animate__fadeIn"
          data-wow-delay="1s"
        >
          <div className="mediaeye-layout-container-nform-innerbox">
            <h2 className="mediaeye-layout-container-nform-innerbox-title">
              Sign up here{' '}
              <span>
                to receive the <br /> latest news and updates!
              </span>
            </h2>
            <form onSubmit={handleSubmit} id="mediaeye-about-newsletter-form">
              <div className="mediaeyeform-group">
                <input
                  className={
                    aboutNewsletterFormError?.email
                      ? 'mediaeyeform-input mediaeyeform-group-input-error-border'
                      : 'mediaeyeform-input'
                  }
                  name="email"
                  type="email"
                  value={email}
                  onChange={handleChangeEmail}
                  placeholder="example@gmail.com"
                />
                {aboutNewsletterFormError?.email ? (
                  <div className="mediaeyeform-group-input-error-message">
                    {aboutNewsletterFormError?.email}
                  </div>
                ) : null}
              </div>
              <button className="btn btn-info" type="submit">
                <span>Submit</span>
              </button>
            </form>
          </div>
          <div className="mediaeye-layout-container-nform-imagebox">
            <img src={signup_person} alt="person1" className="person1" />
            <img src={signup_person1} alt="person2" className="person2" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default MainForm;
