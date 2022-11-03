import React, { useState } from 'react';
import './TermsAndConditions.scss';
import CloseIcon from '../Icons/CloseIcon';
import { useHistory, useLocation } from 'react-router-dom';
const TermsAndConditions = () => {
  return (
    <div className="terms">
      <div className="container">
        <h1>Terms And Conditions</h1>
        <TermsContent />
      </div>
    </div>
  );
};

const TermsContent = () => {
  return (
    <>
      <ol className="terms-counter-box">
        <li className="terms-counter-box-row">
          <h2 className="terms-counter-box-row-heading">
            <span>Introduction</span>
          </h2>
          <div className="terms-counter-box-row-text">
            <p>
              MEDIA EYE Platform is an NFT services interface maintained by a
              decentralized team of developers. It facilitates interaction with
              the MEDIA EYE Protocol, an NFT ecosystem deployed on the Ethereum,
              Binance Smart Chain, Fantom, and other EVM compatible blockchains.
            </p>
          </div>
        </li>

        <li className="terms-counter-box-row">
          <h2 className="terms-counter-box-row-heading">
            <span>Modification of this Agreement</span>
          </h2>
          <div className="terms-counter-box-row-text">
            <p>
              At our sole discretion, we reserve the right to modify these terms
              and conditions at any time. All modifications take effect once
              they are posted, and notification will be done by updating the
              effective date at the top of the document.
            </p>
          </div>
        </li>

        <li className="terms-counter-box-row">
          <h2 className="terms-counter-box-row-heading">
            <span>Assumption of Risk</span>
          </h2>
          <div className="terms-counter-box-row-text">
            <p>
              By accessing MEDIA EYE software, you accept and acknowledge the
              following:
            </p>

            <ul>
              <li>
                <p>
                  {' '}
                  The prices of blockchain assets are extremely volatile and we
                  cannot guarantee purchasers will not lose money.
                </p>
              </li>
              <li>
                <p>
                  Assets available to trade on MEDIA EYE should not be viewed as
                  investments: their prices are determined by the market and
                  fluctuate considerably
                </p>
              </li>
              <li>
                <p>
                   You are solely responsible for determining any taxes that
                  apply to your transactions.
                </p>
              </li>
              <li>
                <p>
                  MEDIA EYE services are non-custodial, meaning we do not, at
                  any time, have custody of the NFTs owned by our users
                </p>
              </li>
              <li>
                <p>
                  We do not store, send, or receive Digital Assets, as they
                  respectively exist on the blockchain. As such, and due to the
                  decentralized nature of the services provided, you are fully
                  responsible for protecting your wallets and assets from any
                  potential risks.
                </p>
              </li>
              <li>
                <p>
                  Our software indexes NFTs on the blockchain as they are
                  created, and we are not responsible for any assets that users
                  may mistakenly or willingly access and/or purchase through the
                  software. You accept responsibility for any risks associated
                  with purchasing such user-generated content, including (but
                  not limited to) the risk of purchasing counterfeit assets,
                  mislabeled assets, assets that are vulnerable to metadata
                  decay, assets on faulty smart contracts, and assets that may
                  become untransferable.
                </p>
              </li>
            </ul>
          </div>
        </li>

        <li className="terms-counter-box-row">
          <h2 className="terms-counter-box-row-heading">
            <span>Disclaimers</span>
          </h2>
          <div className="terms-counter-box-row-text">
            <p>
              We do not represent or warrant that access to the front-end
              interface will be continuous, uninterrupted, timely, or secure;
              that the information contained in the interface will be accurate,
              reliable, complete, or current; or that the interface will be free
              from errors, defects, viruses, or other harmful elements.
            </p>
          </div>
        </li>

        <li className="terms-counter-box-row">
          <h2 className="terms-counter-box-row-heading">
            <span>Proprietary Rights</span>
          </h2>
          <div className="terms-counter-box-row-text">
            <p>
              We own the intellectual property generated by core MEDIA EYE
              contributors for the use of MEDIA EYE, including (but not limited
              to) software, text, designs, images, and copyrights. Unless
              otherwise stated, MEDIA EYE reserves exclusive rights to its
              intellectual property. Refer to our Brand Assets Documentation for
              guidance on using MEDIA EYE copyrighted materials.
            </p>
          </div>
        </li>

        <li className="terms-counter-box-row">
          <h2 className="terms-counter-box-row-heading">
            <span>Eligibility</span>
          </h2>
          <div className="terms-counter-box-row-text">
            <p>
              To access or use the front-end interface, you represent that you
              are at least the age of majority in your jurisdiction. You further
              represent that your access and use of the front-end interface will
              fully comply with all applicable laws and regulations and that you
              will not access or use the front-end interface to conduct,
              promote, or otherwise facilitate any illegal activity.
              Furthermore, you represent that neither you nor any entity you
              represent are included in any trade embargoes or sanctions list
              (“Subject to Restrictions”), nor resident, citizen, national or
              agent of, or an entity organized, incorporated or doing business
              in such territories (“Restricted Territories”).
            </p>
          </div>
        </li>

        <li className="terms-counter-box-row">
          <h2 className="terms-counter-box-row-heading">
            <span>Privacy</span>
          </h2>
          <div className="terms-counter-box-row-text">
            <p>
              When you use the front-end interface, the only information we
              collect from you is your blockchain wallet address, completed
              transaction hashes, and token identifiers. We do not collect any
              personal information from you. We do, however, use third-party
              services like Google Analytics, which may receive your publicly
              available personal information. We do not take responsibility for
              any information you make public on the blockchain(s) by taking
              actions through the front-end interface.
            </p>
          </div>
        </li>

        <li className="terms-counter-box-row">
          <h2 className="terms-counter-box-row-heading">
            <span>Prohibited Activity</span>
          </h2>
          <div className="terms-counter-box-row-text">
            <p>
              You agree not to engage in any of the following categories of
              prohibited acts in relation to your access and use of the
              front-end interface:
            </p>
            <ul>
              <li>
                <p>
                  Intellectual property infringement, such as violations to
                  copyright, trademark, service mark or patent.
                </p>
              </li>
              <li>
                <p>
                  Interaction with assets, listings, smart contracts, and
                  collections that include metadata that may be deemed harmful
                  or illegal, including (but not limited to): metadata that
                  promotes suicide or self-harm, incites hate or violence
                  against others, degrades or doxxes another individual, depicts
                  minors in sexually suggestive situations, or raises funds for
                  terrorist organizations.
                </p>
              </li>
              <li>
                <p>
                  Transacting in any Restricted Territory or interacting with
                  any blockchain addresses controlled indirectly or directly by
                  persons or entities Subject to Restrictions, that is, included
                  in any trade embargoes or sanctions list.
                </p>
              </li>
            </ul>
          </div>
        </li>

        <li className="terms-counter-box-row">
          <h2 className="terms-counter-box-row-heading">
            <span>Limitation of Liability</span>
          </h2>
          <div className="terms-counter-box-row-text">
            <p>
              MEDIA EYE is in no way liable for any damages of any form
              resulting from your access or use of MEDIA EYE software, including
              (but not limited to) any loss of profit, digital assets, or
              intangible property, and assumes no liability or responsibility
              for any errors, omissions, mistakes, or inaccuracies in the
              content provided on MEDIA EYE-controlled software or media;
              unauthorized access or use of any server or database controlled by
              MEDIA EYE platform; bugs, viruses etc. in the software; suspension
              of service; or any conduct of any third party whatsoever.
              Furthermore, any hyperlink or reference to a third party website,
              product, or person shared or published in any software or other
              channel by MEDIA EYE is for your convenience only, and does not
              constitute an endorsement. We accept no legal responsibility for
              the content or information of such third-party sites.
            </p>
          </div>
        </li>
      </ol>
    </>
  );
};

const TermsPopup = (props) => {
  const { togglePopup, termsPopupActive } = props;
  const windowDimensionsVertical = window.innerHeight;
  let history = useHistory();
  return (
    <>
      {termsPopupActive ? (
        <div
          className={
            termsPopupActive
              ? 'mediaeye-popup active mediaeye-popup-xs'
              : 'mediaeye-popup'
          }
        >
          <div className="mediaeye-popup-wrapper terms-popup scrolled">
            <div className="mediaeye-popup-content terms-popup-content">
              <div className="popup active ">
                <div className="popup-wrapper " style={{ overflow: 'auto' }}>
                  <div className="main-popup">
                    {/* <div className="close" onClick={togglePopup}>
                      <CloseIcon />
                    </div> */}
                    <div className="">
                      {/* <div className="terms-popup-content-header">
                        Terms of Service
                      </div> */}
                      <div className="close" onClick={togglePopup}>
                        <CloseIcon />
                      </div>
                      <div
                        className="terms-popup-content-inner"
                        style={{
                          maxHeight: windowDimensionsVertical - 300 + 'px'
                        }}
                      >
                        <TermsContent />
                      </div>
                      <div className="terms-popup-content-footer">
                        <button
                          type="button"
                          className="btn btn-square btn-gaming accept"
                          onClick={props.togglePopup}
                        >
                          Accept
                        </button>
                        <button
                          type="button"
                          className="btn btn-square btn-transperant"
                          onClick={() => {
                            props.togglePopup();
                            history.push('/');
                          }}
                        >
                          <span>Decline</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export { TermsAndConditions, TermsPopup };
