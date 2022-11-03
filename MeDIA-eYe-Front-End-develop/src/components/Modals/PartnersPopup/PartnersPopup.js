import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import emailjs from 'emailjs-com';
import axios from 'axios';
import { CloseIcon } from '../../Icons';
import {
  closePartnersPopup,
  toggleGeneralPopup
} from '../../../store/app/appSlice';
const PartnersPopup = (props) => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [text, setText] = useState('');
  const showPopup = useSelector((state) => state.app.showPartnersPopup);
  const dispatch = useDispatch();

  const handleChangeEmail = (event) => {
    setEmail(event.target.value);
  };

  const handleChangeName = (event) => {
    setName(event.target.value);
  };

  const handleChangeCompany = (event) => {
    setCompany(event.target.value);
  };

  const handleChangeText = (event) => {
    setText(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (email !== null && email !== '') {
      emailjs.sendForm(
        'service_8p76rtc',
        'template_1svg3xa',
        event.target,
        'user_EJiwvXDAMeoW6oOr4UYrR'
      );
      let data = {
        email: email,
        firstname: name,
        message: text,
        company: company,
        projectname: 'MEDIAEYE'
      };

      let config = {
        method: 'post',
        url: 'https://api.mediaeyenft.com/socialmediafunction/user/add/user/hubspot',
        headers: {
          'Content-Type': 'application/json'
        },
        data: data
      };

      axios(config)
        .then(function (response) {
          if (response.data.code == 200) {
            dispatch(
              toggleGeneralPopup({
                status: 'success',
                message: response.data.message,
                textButton: 'OK',
                size: 'sm'
              })
            );
          }
          if (response.data.code == 201) {
            dispatch(
              toggleGeneralPopup({
                status: 'success',
                message: response.data.message,
                textButton: 'OK',
                size: 'sm'
              })
            );
          }
          if (response.data.code == 400) {
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
              message: error?.text ? error?.text : 'Message not sent!',
              textButton: 'OK',
              size: 'sm'
            })
          );
        });
    }
  };

  return (
    <React.Fragment>
      {showPopup ? (
        <div
          className={
            showPopup
              ? 'mediaeye-popup active mediaeye-popup-sm'
              : 'mediaeye-popup'
          }
        >
          <div
            className="mediaeye-popup-wrapper mediaeye-popup-partners scrolled"
            onClick={() => dispatch(closePartnersPopup())}
          >
            <div
              className="mediaeye-popup-content"
              onClick={(event) => event.stopPropagation()}
            >
              <div className="mediaeye-popup-content-inner">
                <div className="mediaeye-popup-content-inner-header text-center">
                  <div className="mediaeye-popup-content-inner-header-title">
                    Become a partner
                  </div>
                  <div className="mediaeye-popup-content-inner-header-text">
                    We will get back to you soon{' '}
                  </div>
                </div>
                <div
                  className="mediaeye-popup-close"
                  onClick={() => dispatch(closePartnersPopup())}
                >
                  <CloseIcon />
                </div>

                <form onSubmit={handleSubmit} className="mediaeyeform">
                  <div className="mediaeyeform-group">
                    <label className="mediaeyeform-label">Name</label>
                    <input
                      className="mediaeyeform-input"
                      name="name"
                      required
                      value={name}
                      onChange={handleChangeName}
                    />
                  </div>
                  <div className="mediaeyeform-group">
                    <label className="mediaeyeform-label">Email</label>
                    <input
                      className="mediaeyeform-input"
                      name="email"
                      required
                      type="email"
                      value={email}
                      onChange={handleChangeEmail}
                    />
                  </div>
                  <div className="mediaeyeform-group">
                    <label className="mediaeyeform-label">Company</label>
                    <input
                      className="mediaeyeform-input"
                      name="name"
                      required
                      value={company}
                      onChange={handleChangeCompany}
                    />
                  </div>

                  <div className="mediaeyeform-group">
                    <label className="mediaeyeform-label">Message</label>
                    <div className="mediaeyetextarea">
                      <textarea
                        value={text}
                        className="mediaeyetextarea-input"
                        rows="5"
                        required
                        onChange={handleChangeText}
                      ></textarea>
                    </div>
                  </div>

                  <div className="text-center">
                    <button type="submit" className="btn btn-main">
                      Submit
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </React.Fragment>
  );
};

export default PartnersPopup;
