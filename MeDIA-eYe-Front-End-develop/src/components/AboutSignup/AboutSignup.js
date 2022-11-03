import React, { useState } from 'react';
import emailjs from 'emailjs-com';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { toggleGeneralPopup } from '../../store/app/appSlice';
var validate = require('validate.js');

const IntegratedBlock = (props) => {
  const dispatch = useDispatch();
  var constraints = {
    email: {
      presence: true,
      email: true
    }
  };

  const [email, setEmail] = useState('');
  const [errorsNewsletter, setErrorsNewsletter] = useState([]);

  const handleSubmit = (event) => {
    var form = document.querySelector('#mediaeye-aboutus-newsletter');
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

  return (
    <>
      <section className="mediaeye-layout-section m-b-50 m-t-30 withspace">
        <div className="mediaeye-layout-container">
          <div className="form">
            <h2 className="mediaeye-layout-section-header-heading text-center">
              SIGN UP HERE TO RECEIVE THE LATEST NEWS AND UPDATES!
            </h2>
            <form
              className="mediaeyeform"
              onSubmit={handleSubmit}
              id="mediaeye-aboutus-newsletter"
            >
              <label className="mediaeyeform-group-input">
                <input
                  className={
                    errorsNewsletter?.email
                      ? 'mediaeyeform-input mediaeyeform-input-round mediaeyeform-group-input-error-border'
                      : 'mediaeyeform-input mediaeyeform-input-round'
                  }
                  name="email"
                  type="email"
                  placeholder="example@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <button
                  type="submit"
                  className="btn btn-transperant mediaeyeform-group-input-btn"
                >
                  Submit
                </button>
              </label>
              {errorsNewsletter?.email ? (
                <div className="mediaeyeform-group-input-error-message">
                  {errorsNewsletter?.email}
                </div>
              ) : null}
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default IntegratedBlock;
