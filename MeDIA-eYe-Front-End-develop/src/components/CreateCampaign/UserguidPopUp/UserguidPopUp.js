import React from 'react';
import CloseIcon from '../../Icons/CloseIcon';
import './UserguidPopUp.scss';

//media and images
import logo from '../../../assets/img/logo.png';
import slide1 from '../../../assets/img/UserguidPopUp/slide1.png';
import slide2 from '../../../assets/img/UserguidPopUp/slide2.png';
import slide3 from '../../../assets/img/UserguidPopUp/slide3.png';
import slide4 from '../../../assets/img/UserguidPopUp/slide4.png';
import slide5 from '../../../assets/img/UserguidPopUp/slide5.png';
import slide6 from '../../../assets/img/UserguidPopUp/slide6.png';
import slide7 from '../../../assets/img/UserguidPopUp/slide7.png';
import slide8 from '../../../assets/img/UserguidPopUp/slide8.png';
import slide9 from '../../../assets/img/UserguidPopUp/slide9.png';

const UserguidPopUp = (props) => {
  const { userguidPopup, toggleUserGuidPopup } = props;

  return (
    <React.Fragment>
      {props.userguidPopup ? (
        <div
          className={
            props.userguidPopup
              ? 'mediaeye-popup active mediaeye-popup-md'
              : 'mediaeye-popup'
          }
        >
          <div
            className="mediaeye-popup-wrapper mediaeye-popup-mintnft scrolled"
            onClick={props.toggleUserGuidPopup}
          >
            <div
              className="mediaeye-popup-content"
              onClick={(event) => event.stopPropagation()}
            >
              <div className="mediaeye-popup-content-inner">
                <div className="mediaeye-UserGuid-popup">
                  <div className="mediaeyefancyScroll">
                    <div className="mediaeye-UserGuid-popup-header">
                      <div className="mediaeye-UserGuid-popup-header-flexBox">
                        <img src={logo} alt="logo" className="UserGuid-logo" />
                        <span>USERGUIDE</span>
                      </div>
                    </div>
                    <div className="mediaeye-UserGuid-popup-content">
                      <h3>Campaign Creator Service</h3>
                      <div className="mediaeye-UserGuid-popup-content-inner">
                        <p>
                          MEDIA EYE offers{' '}
                          <strong>Campaign Creator Service</strong> to address
                          real business use cases:
                        </p>
                        <ul className="listStyle-Disc">
                          <li>Enter WEB 3.0 & Metaverse</li>
                          <li>
                            Sell NFT Collections (any digital art) on a private
                            Event & NFT marketplace
                          </li>
                          <li>Increase brand awareness</li>
                          <li>Increase loyalty of customer </li>
                          <li>Get GEN Z followers on social media</li>
                        </ul>
                        <p>
                          <strong>Campaign creation</strong> consists of two
                          required and two optional steps.
                        </p>
                      </div>
                      <img
                        src={slide1}
                        alt="Step Slide"
                        className="UserGuid-SlideImg"
                      />
                      <div className="mediaeye-UserGuid-popup-content-inner">
                        <ul className="listStyle-num">
                          <li>NFT minting (user guide)</li>
                          <li>
                            Scheduling the Event & Private Marketplace Set up
                            (user guide){' '}
                          </li>
                          <li>
                            Campaign Promotion using Airdrop with Bounties
                            (Optional) (user guide)
                          </li>
                          <li>
                            Campaign Promotion using SPOTLIGHT Service
                            (Optional) (user guide)
                          </li>
                        </ul>
                        <p>
                          <strong>
                            Step 1.&nbsp;&nbsp;&nbsp;Select whether you want to
                            include one of your collections or your NFTs in this
                            event.
                          </strong>
                        </p>
                        <p>
                          Select or create Collection or add NFT from your
                          existing Collection to Campaign
                        </p>
                      </div>
                      <img
                        src={slide2}
                        alt="Step Slide"
                        className="UserGuid-SlideImg"
                      />
                      <div className="mediaeye-UserGuid-popup-content-inner">
                        <ul className="listStyle-Disc">
                          <li>
                            Creators can select Jumbo or Generative Collection
                            (recommended, automated process)
                          </li>
                          <li>
                            Creators can choose NFTs from existing collections
                            (one by one process).
                          </li>
                        </ul>
                      </div>
                      <img
                        src={slide3}
                        alt="Step Slide"
                        className="UserGuid-SlideImg shrt"
                      />
                      <div className="mediaeye-UserGuid-popup-content-inner">
                        <ul className="listStyle-Disc">
                          <li>
                            Creators can proceed to create a collection by
                            selecting 'New Collection'.
                          </li>
                        </ul>
                        <p>
                          Advantages of Jumbo Mint & Generative Collections:
                        </p>
                        <ul>
                          <li>
                            -Users can create Unlimited size collections without
                            any initial gas costs.
                          </li>
                          <li>
                            -Each unique NFT will only be minted when they are
                            purchased as the gas cost will be included in the
                            buyer's transaction.
                          </li>
                        </ul>
                        <p>
                          <strong>
                            Step 2.&nbsp;&nbsp;&nbsp;Select Event{' '}
                          </strong>
                          <br />
                          You need to select an event or create a new one to
                          promote your collection.
                        </p>
                      </div>
                      <img
                        src={slide4}
                        alt="Step Slide"
                        className="UserGuid-SlideImg"
                      />
                      <div className="mediaeye-UserGuid-popup-content-inner">
                        <ul className="listStyle-Disc">
                          <li>
                            Select or create one event to create a campaign.
                          </li>
                        </ul>
                        <p>
                          <strong>
                            (Optional) Step 3.&nbsp;&nbsp;&nbsp;Select Airdrop{' '}
                          </strong>
                          <br />
                          Advertise and attract more attention and discussion
                          about your activities using Airdrop, or create a
                          private Airdrop and only send invitations to your
                          selected users, clients, or your friends.
                        </p>
                      </div>
                      <img
                        src={slide5}
                        alt="Step Slide"
                        className="UserGuid-SlideImg"
                      />
                      <div className="mediaeye-UserGuid-popup-content-inner">
                        <p>
                          <strong>
                            Step 4.&nbsp;&nbsp;&nbsp;Enter Campaign Metadata{' '}
                          </strong>
                        </p>
                      </div>
                      <img
                        src={slide6}
                        alt="Step Slide"
                        className="UserGuid-SlideImg"
                      />
                      <div className="mediaeye-UserGuid-popup-content-inner">
                        <ul className="listStyle-Disc">
                          <li>Campaign can last 7, 14 or 21 days.</li>
                        </ul>
                        <p>
                          <strong>
                            (Optional) Step 5.&nbsp;&nbsp;&nbsp;Feature your
                            Campaign <br />
                          </strong>
                          To popularize your company on our portal, you can use
                          the SPOTLIGHT Service. Digital content will be
                          featured on the Homepage, Marketplace, Collections
                          page and blog.
                        </p>
                      </div>
                      <img
                        src={slide7}
                        alt="Step Slide"
                        className="UserGuid-SlideImg"
                      />
                      <div className="mediaeye-UserGuid-popup-content-inner">
                        <p>
                          <strong>
                            Step 6.&nbsp;&nbsp;&nbsp;Create Campaign <br />
                          </strong>
                          When you have completed the required steps, press the
                          button 'CREATE CAMPAIGN'.
                        </p>
                      </div>
                      <img
                        src={slide8}
                        alt="Step Slide"
                        className="UserGuid-SlideImg"
                      />
                      <div className="mediaeye-UserGuid-popup-content-inner">
                        <p>
                          Information about the Campaign you created and ongoing
                          events will be displayed on the Marketing tab of the
                          'My Account' page.
                        </p>
                      </div>
                      <img
                        src={slide9}
                        alt="Step Slide"
                        className="UserGuid-SlideImg"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </React.Fragment>
  );
};

export default UserguidPopUp;
