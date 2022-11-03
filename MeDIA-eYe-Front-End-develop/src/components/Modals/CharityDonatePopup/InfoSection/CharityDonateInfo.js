import React, { useEffect, useState } from 'react';
import AgreeBlock from '../../../Common/AgreeBlock';
import { useDispatch } from 'react-redux';
import './CharityDonateInfo.scss';
import toggleGeneralPopup from '../../../../store/app/appSlice';

const CharityDonateInfo = (props) => {
  const organizationdata = props?.organizationdata;
  const charityDonateInfoId = props?.charityDonateInfoId;
  const charityDonateInfoError = props?.charityDonateInfoError;
  const setFormTaxRecipt = props?.setFormTaxRecipt;
  const initialValues = {
    fname: '',
    lname: '',
    email: '',
    country: '',
    state: '',
    address1: '',
    address2: '',
    city: '',
    pincode: ''
  };

  const emailRegex = new RegExp(
    /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/
  );

  const [details, setDetails] = useState(initialValues);
  const [nameValid, setNameValid] = useState(true);
  const [tagValue, setTagValue] = useState();
  const [termsAgree, setTermsAgree] = useState(false);
  const [termsAgree2, setTermsAgree2] = useState(false);
  const [taxrecipt, settaxrecipt] = useState(false);
  const [charityTxt, setCharityTxt] = useState('Donate Anonymously');
  const [checkTxt, setCheckTxt] = useState('Want A Tax Receipt');
  const dispatch = useDispatch();

  const handleTagValue = () => {
    setTagValue(1);
  };
  const toggleTermsAgree = () => {
    setTermsAgree(!termsAgree);
    setFormTaxRecipt(!termsAgree);
  };
  const toggleTermsAgree2 = () => {
    setTermsAgree2(!termsAgree2);
  };
  const handleChange = (e) => {
    const value = e.target.value;
    setDetails({ ...details, [e.target.name]: value });
    if (details.email && !emailRegex.test(details.email)) {
      return false;
    } else {
      return true;
    }
  };
  const taxricipt = (e) => {
    settaxrecipt(!taxrecipt);
  };

  props.propfunc(details, termsAgree, taxrecipt);

  return (
    <div className="charity-donate-info">
      {organizationdata?.allowsAnon ? (
        <div className="charity-donate-info-headercheck">
          <AgreeBlock
            agree={termsAgree}
            toggleAgree={toggleTermsAgree}
            contentText={charityTxt}
          />
        </div>
      ) : null}
      <div className="charity-donate-info-line"></div>

      {termsAgree && organizationdata?.isReceiptEnabled ? (
        <div className="charity-donate-info-checkedcontent">
          <div className="charity-donate-info-checkedcontent-title">
            Want A Tax Receipt?
          </div>
          <div className="charity-donate-info-checkedcontent-discription text-link">
            If you would like to receive a tax receipt while remaining
            anonymous, enter your email below. This email will only be used for
            the purpose of issuing your tax receipt.
          </div>
          <div className="charity-donate-info-checkedcontent-mailinfo">
            <div className="charity-donate-info-form">
              <div className="charity-donate-info-form-block">
                <span>Enter Email for Tax Receipt</span>
                <input
                  type="text"
                  value={details.email}
                  onChange={handleChange}
                  placeholder="donation@gmail.com"
                />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <>
          <div id={charityDonateInfoId}>
            <div className="charity-donate-info-form">
              <div className="charity-donate-info-form-block">
                <span>First Name*</span>
                <input
                  type="text"
                  name="fname"
                  value={details.fname}
                  onChange={handleChange}
                  className={
                    !nameValid || charityDonateInfoError?.fname
                      ? 'charity-donate-info-form-block-error-border error'
                      : null
                  }
                  placeholder="John"
                />
                {charityDonateInfoError?.fname ? (
                  <div className="mediaeyeform-group-input-error-message">
                    First Name can't be blank
                  </div>
                ) : null}
              </div>
              <div className="charity-donate-info-form-block">
                <span>Last Name*</span>
                <input
                  type="text"
                  value={details.lname}
                  name="lname"
                  onChange={handleChange}
                  placeholder="Smith"
                  className={
                    charityDonateInfoError?.lname
                      ? 'charity-donate-info-form-block-error-border'
                      : null
                  }
                />
                {charityDonateInfoError?.lname ? (
                  <div className="mediaeyeform-group-input-error-message">
                    Last Name can't be blank
                  </div>
                ) : null}
              </div>
              <div className="charity-donate-info-form-block">
                <span>Email address*</span>
                <input
                  type="text"
                  value={details.email}
                  onChange={handleChange}
                  name="email"
                  placeholder="donation@gmail.com"
                  className={
                    charityDonateInfoError?.email
                      ? 'charity-donate-info-form-block-error-border'
                      : null
                  }
                />
                {charityDonateInfoError?.email ? (
                  <div className="mediaeyeform-group-input-error-message">
                    {charityDonateInfoError?.email}
                  </div>
                ) : null}
              </div>
            </div>
            <div className="charity-donate-info-line"></div>
            <div className="charity-donate-info-form">
              <div className="charity-donate-info-form-block">
                <span>Country*</span>
                <input
                  type="text"
                  value={details.country}
                  name="country"
                  onChange={handleChange}
                  placeholder="USA"
                  className={
                    charityDonateInfoError?.country
                      ? 'charity-donate-info-form-block-error-border'
                      : null
                  }
                />
                {charityDonateInfoError?.country ? (
                  <div className="mediaeyeform-group-input-error-message">
                    {charityDonateInfoError?.country}
                  </div>
                ) : null}
              </div>
              <div className="charity-donate-info-form-block">
                <span>State/Province/Region*</span>
                <input
                  type="text"
                  value={details.state}
                  name="state"
                  onChange={handleChange}
                  placeholder="California"
                  className={
                    charityDonateInfoError?.state
                      ? 'charity-donate-info-form-block-error-border'
                      : null
                  }
                />
                {charityDonateInfoError?.state ? (
                  <div className="mediaeyeform-group-input-error-message">
                    {charityDonateInfoError?.state}
                  </div>
                ) : null}
              </div>
              <div className="charity-donate-info-form-block">
                <span>Address 1*</span>
                <input
                  type="text"
                  value={details.address1}
                  name="address1"
                  onChange={handleChange}
                  placeholder="Aviation Boulevard 15"
                  className={
                    charityDonateInfoError?.address1
                      ? 'charity-donate-info-form-block-error-border'
                      : null
                  }
                />
                {charityDonateInfoError?.address1 ? (
                  <div className="mediaeyeform-group-input-error-message">
                    Address 1 can't be blank
                  </div>
                ) : null}
              </div>
              <div className="charity-donate-info-form-block">
                <span>Address 2</span>
                <input
                  type="text"
                  name="address2"
                  value={details.address2}
                  onChange={handleChange}
                  placeholder="Apt. B"
                />
              </div>
              <div className="charity-donate-info-form-block">
                <span>City*</span>
                <input
                  type="text"
                  value={details.city}
                  name="city"
                  onChange={handleChange}
                  placeholder="Lawndale"
                  className={
                    charityDonateInfoError?.city
                      ? 'charity-donate-info-form-block-error-border'
                      : null
                  }
                />
                {charityDonateInfoError?.city ? (
                  <div className="mediaeyeform-group-input-error-message">
                    {charityDonateInfoError?.city}
                  </div>
                ) : null}
              </div>
              <div className="charity-donate-info-form-block">
                <span>Zip/Postal code*</span>
                <input
                  type="text"
                  value={details.pincode}
                  name="pincode"
                  onChange={handleChange}
                  placeholder="15000"
                  className={
                    charityDonateInfoError?.pincode
                      ? 'charity-donate-info-form-block-error-border'
                      : null
                  }
                />
                {charityDonateInfoError?.pincode ? (
                  <div className="mediaeyeform-group-input-error-message">
                    Postal code can't be blank
                  </div>
                ) : null}
              </div>
            </div>
            {organizationdata?.isReceiptEnabled ? (
              <div className="charity-donate-info-checkbox">
                <input type="checkbox" value={taxrecipt} onChange={taxricipt} />
                <label>Want A Tax Receipt?</label>
              </div>
            ) : null}
          </div>
        </>
      )}
    </div>
  );
};
export default CharityDonateInfo;
