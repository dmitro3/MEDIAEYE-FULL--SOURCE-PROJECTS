import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import emailjs from 'emailjs-com';
import axios from 'axios';
import { CloseIcon, Edit } from '../../Icons/';
import { toggleGeneralPopup } from '../../../store/app/appSlice';
var validate = require('validate.js');

const Popup = (props) => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [text, setText] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const dispatch = useDispatch();

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  const toggleMainPopup = () => {
    props.togglePopup();
  };

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

  var constraints = {
    email: {
      presence: true,
      email: true
    },
    name: {
      presence: true
    },
    company: {
      presence: true
    },
    message: {
      presence: true
    }
  };

  const [partnererrors, setPartnerErrors] = useState([]);

  const handleSubmit = (event) => {
    var form = document.querySelector('#mediaeye-become-partner-form');
    var partnererrors = validate(form, constraints);
    setPartnerErrors(partnererrors);
    console.log(partnererrors, 'partnererrors');
    event.preventDefault();

    // setErrors(errors);
    if (partnererrors == undefined) {
      if (email !== null && email !== '') {
        emailjs.sendForm(
          'service_8p76rtc',
          'template_1svg3xa',
          event.target,
          'user_EJiwvXDAMeoW6oOr4UYrR'
        );
        var data = {
          email: email,
          firstname: name,
          message: text,
          company: company,
          projectname: 'MEDIAEYE'
        };
        var config = {
          method: 'post',
          url: 'https://api.mediaeyenft.com/socialmediafunction/user/add/user/hubspot',
          headers: {
            'Content-Type': 'application/json'
          },
          data: data
        };

        axios(config)
          .then(function (response) {
            console.log(response.data, 'response.data');
            if (response.data.code == 200) {
              setEmail('');
              setName('');
              setCompany('');
              setText('');
              setShowPopup(false);
              toggleMainPopup();
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
              setEmail('');
              setName('');
              setCompany('');
              setText('');
              setShowPopup(false);
              toggleMainPopup();
              dispatch(
                toggleGeneralPopup({
                  status: 'info',
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
                  message: response.data.message,
                  textButton: 'OK',
                  size: 'sm'
                })
              );
            }
          })
          .catch(function (error) {
            console.log(error, 'er');
            dispatch(
              toggleGeneralPopup({
                status: 'error',
                message: 'Message not sent!',
                textButton: 'OK',
                size: 'sm'
              })
            );
          });
      }
    }
  };

  return (
    <React.Fragment>
      {props.popup ? (
        <div
          className={
            props.popup
              ? 'mediaeye-popup active mediaeye-popup-sm'
              : 'mediaeye-popup'
          }
        >
          <div
            className="mediaeye-popup-wrapper mediaeye-popup-partners scrolled"
            onClick={props.togglePopup}
          >
            <div
              className="mediaeye-popup-content"
              onClick={(event) => event.stopPropagation()}
            >
              <div className="mediaeye-popup-content-inner">
                <div className="mediaeye-layout-section-header">
                  <h2 className="mediaeye-layout-section-header-heading">
                    Become a partner
                  </h2>
                </div>
                <div
                  className="mediaeye-popup-close"
                  onClick={props.togglePopup}
                >
                  <CloseIcon />
                </div>

                <form
                  onSubmit={handleSubmit}
                  className="mediaeyeform"
                  id="mediaeye-become-partner-form"
                >
                  <div className="mediaeyeform-group">
                    <label className="mediaeyeform-label">Name*</label>
                    <input
                      className={
                        partnererrors?.name
                          ? 'mediaeyeform-input mediaeyeform-group-input-error-border'
                          : 'mediaeyeform-input'
                      }
                      name="name"
                      value={name}
                      onChange={handleChangeName}
                    />
                    {partnererrors?.name ? (
                      <div className="mediaeyeform-group-input-error-message">
                        {partnererrors?.name}
                      </div>
                    ) : null}
                  </div>
                  <div className="mediaeyeform-group">
                    <label className="mediaeyeform-label">Email*</label>
                    <input
                      className={
                        partnererrors?.email
                          ? 'mediaeyeform-input mediaeyeform-group-input-error-border'
                          : 'mediaeyeform-input'
                      }
                      name="email"
                      type="email"
                      value={email}
                      onChange={handleChangeEmail}
                    />
                    {partnererrors?.email ? (
                      <div className="mediaeyeform-group-input-error-message">
                        {partnererrors?.email}
                      </div>
                    ) : null}
                  </div>
                  <div className="mediaeyeform-group">
                    <label className="mediaeyeform-label">Company*</label>
                    <input
                      className={
                        partnererrors?.company
                          ? 'mediaeyeform-input mediaeyeform-group-input-error-border'
                          : 'mediaeyeform-input'
                      }
                      name="company"
                      value={company}
                      onChange={handleChangeCompany}
                    />
                    {partnererrors?.company ? (
                      <div className="mediaeyeform-group-input-error-message">
                        {partnererrors?.company}
                      </div>
                    ) : null}
                  </div>

                  <div className="mediaeyeform-group">
                    <label className="mediaeyeform-label">Message*</label>
                    <div className="mediaeyetextarea">
                      <textarea
                        value={text}
                        name="message"
                        className={
                          partnererrors?.company
                            ? 'mediaeyetextarea-input mediaeyeform-group-input-error-border'
                            : 'mediaeyetextarea-input'
                        }
                        rows="5"
                        onChange={handleChangeText}
                      ></textarea>
                      {partnererrors?.message ? (
                        <div className="mediaeyeform-group-input-error-message">
                          {partnererrors?.message}
                        </div>
                      ) : null}
                    </div>
                  </div>

                  <div className="mediaeyeform-group text-center m-t-30">
                    <input type="submit" className="btn btn-info" />
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

export default Popup;
