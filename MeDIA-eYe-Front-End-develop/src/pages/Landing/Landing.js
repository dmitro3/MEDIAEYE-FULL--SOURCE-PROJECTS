import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { Scroller, Section } from 'react-fully-scrolled';
import grptwoimg from '../../../src/assets/img/landingimg/grp-2.png';
import grpthreeimg from '../../../src/assets/img/landingimg/grp-3.png';
import grpfourimg from '../../../src/assets/img/landingimg/grp-4.png';
import grpfiveimg from '../../../src/assets/img/landingimg/grp-5.png';
import grpsiximg from '../../../src/assets/img/landingimg/grp-6.png';
import grpsevenimg from '../../../src/assets/img/landingimg/grp-7.png';
import meimg from '../../../src/assets/img/landingimg/ME_white 1.png';
import plusimg from '../../../src/assets/img/landingimg/plus-add.png';
import linegrpimg from '../../../src/assets/img/landingimg/Chart_Line.png';
import heximg from '../../../src/assets/img/landingimg/Settings_Future.png';
import s1 from '../../../src/assets/img/landingimg/social (12).png';
import s2 from '../../../src/assets/img/landingimg/social (2).png';
import s3 from '../../../src/assets/img/landingimg/social (5).png';
import s4 from '../../../src/assets/img/landingimg/social (16).png';
import s5 from '../../../src/assets/img/landingimg/social (3).png';
import s6 from '../../../src/assets/img/landingimg/social (17).png';
import s7 from '../../../src/assets/img/landingimg/social (4).png';
import s8 from '../../../src/assets/img/landingimg/social (14).png';
import s10 from '../../../src/assets/img/landingimg/social (6).png';
import s11 from '../../../src/assets/img/landingimg/social (7).png';
import s12 from '../../../src/assets/img/landingimg/social (15).png';
import s13 from '../../../src/assets/img/landingimg/social (13).png';
import s14 from '../../../src/assets/img/landingimg/social (11).png';
import s15 from '../../../src/assets/img/landingimg/social (1).png';
import s16 from '../../../src/assets/img/landingimg/social (10).png';
import s17 from '../../../src/assets/img/landingimg/social (8).png';
import s18 from '../../../src/assets/img/landingimg/social (9).png';
import enterarrow from '../../../src/assets/img/landingimg/arrow.png';
import './Landing.scss';

const Landing = (props) => {
  const [activePage, setActivePage] = useState(1);
  const totalPage = 7;
  const pagecallback = (page) => {
    setActivePage(page);
  };

  return (
    <>
      <Helmet>
        <meta
          property="og:url"
          content={window.location.origin + '/metaverse-landing'}
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:title"
          content="Open the Gateway to the Metaverse | MEDIA EYE"
        />
        <meta
          property="og:description"
          content="Metaverse is the new Web 3.0 construct that integrates the real world with the virtual on the blockchain"
        />
        <meta
          property="og:image"
          content={
            window.location.origin + '/img/meta_tag/METAVERSE_LANDING.png'
          }
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          property="twitter:domain"
          content="mediaeyenft.com/metaverse-landing"
        />
        <meta
          property="twitter:url"
          content={window.location.origin + '/metaverse-landing'}
        />
        <meta
          name="twitter:title"
          content="Open the Gateway to the Metaverse | MEDIA EYE"
        />
        <meta
          name="twitter:description"
          content="Metaverse is the new Web 3.0 construct that integrates the real world with the virtual on the blockchain"
        />
        <meta
          name="twitter:image"
          content={
            window.location.origin + '/img/meta_tag/METAVERSE_LANDING.png'
          }
        />
        <title>Open the Gateway to the Metaverse | MEDIA EYE </title>
        <meta
          name="description"
          content="Metaverse is the new Web 3.0 construct that integrates the real world with the virtual on the blockchain"
        />
      </Helmet>
      <div className="landing-page mediaeye-layout-content withfulllayout">
        <div className="dash-line">
          <span className={activePage === 1 ? 'lines active' : 'lines'}></span>
          <span className={activePage === 2 ? 'lines active' : 'lines'}></span>
          <span className={activePage === 3 ? 'lines active' : 'lines'}></span>
          <span className={activePage === 4 ? 'lines active' : 'lines'}></span>
          <span className={activePage === 5 ? 'lines active' : 'lines'}></span>
          <span className={activePage === 6 ? 'lines active' : 'lines'}></span>
          <span className={activePage === 7 ? 'lines active' : 'lines'}></span>
        </div>

        <Scroller
          curPage={activePage}
          className="SectionContainer"
          totalPage={totalPage}
          onBeforeScroll={(from, to) => { }}
          onAfterScroll={(page) => {
            pagecallback(page);
          }}
          isEnabled={true}
          onPageChange={(page) => {
            pagecallback(page);
          }}
        >
          <Section className="section-land-one">
            <div className="mediaeye-gatebox">
              <Link to="/" smooth={true} offset={-70} className="me-logo">
                {' '}
                <img src={meimg} alt="meLogo" className="me-logo-img" />
              </Link>
              <div className="mediaeye-gatebox-content">
                <p className="gateway-heading">
                  GATEWAY TO THE <br /> metaverse
                </p>
                <p className="gateway-sub-heading">
                  Meta-Services and Benefits for Everyone.
                </p>
              </div>
            </div>
          </Section>

          <Section className="section-land-two">
            <img src={grptwoimg} alt="landingslide" className="bg-dash-two" />
            <div className="mediaeye-layout-middle">
              <div className="mediaeye-gatebox">
                <p className="gateway-heading">what is THE metaverse?</p>
                <div className="gateway-sub-heading-one">
                  <p>
                    The word “Metaverse” is a broad term that generally refers
                    to online interoperable multi dimensional virtual spaces
                    that allow people to interact in more immersive ways than
                    traditional websites. These virtual interactions can be
                    assisted through the use of VR headsets and VR technology to
                    enhance the user experience of feeling present within
                    virtual environments that can be explored via the embodiment
                    of an avatar (a virtual representation of yourself ). These
                    life like multi dimensional interactive online spaces will
                    allow people to immerse themselves within digital content
                    rather than just viewing it through a screen.{' '}
                  </p>
                  <p className="gateway-sub-heading-two">
                    Blockchain technology and cryptocurrency allow people to
                    purchase digital assets such as virtual clothing, virtual
                    land, and virtual dwelling spaces. These virtual dwelling
                    spaces allow users to socialize, play games, trade digital
                    content, and even attend concerts. As of now the Metaverse
                    is no comparison to actual reality, but as time continues
                    digital platforms will evolve... and that is exactly where
                    MEDIA EYE NFT Portal becomes effective. By providing
                    blockchain as a service technology engineered to aid users
                    on their new digital quests, MEDIA EYE will be your
                    companion and gateway into the Metaverse.
                  </p>
                  {/* <p>The term 'metaverse' refers to multi-dimensional virtual spaces that allow people to interact in more immersive ways
                  than traditional websites. The metaverse bridges the gap between the traditional and online world, allowing people to
                  connect and interact in new and innovative ways. Interactions in the metaverse can be enhanced through the use of  technology, which creates an immersive user experience and enables the exploration of persistent virtual environments with avatar (a virtual representation of yourself). Augmenting reality in this manner gives people the ability to themselves within digital content rather than just viewing it on a screen.</p>
                  <p className="gateway-sub-heading-two">Blockchain technology and cryptocurrency allow people to purchase digital assets such as virtual clothing, virtual land and virtual dwelling spaces. Users are able to socialize, play games, trade digital content, and even attend live events like concerts and fashion shows.</p>
                  <p className="gateway-sub-heading-three">At present the Metaverse is a long way from being able to compete with physical reality, but as the virtual world expands and digital platforms evolve, MEDIA EYE  NFT Portal will empower users to capitalize on opportunities in this rapidly evolving space. By Providing Blockchain As A Service Technology that has been specifically engineered to aid users on their new digital quests, MEDIA EYE  unlocks the vast potential of the metaverse and places it directly at your fingertips. ...will Be Your Companion And Gateway Into The Metaverse.</p> */}
                </div>
              </div>
            </div>
          </Section>

          <Section className="section-land-third">
            <img
              src={grpthreeimg}
              alt="landingslide"
              className="bg-dash-three"
            />
            <div className="mediaeye-layout-middle">
              <div className="mediaeye-gatebox">
                <p className="gateway-heading">Why MEDIA EYE?</p>
                <p className="gateway-sub-heading-one">
                  MEDIA EYE NFT Portal is a Blockchain-As-A-Service technology
                  that is designed for rapid and cost effective deployment of
                  NFTs across a broad range of digital content markets. Media
                  EYE empowers creators by allowing them to take advantage of a
                  unique range of services, including influencer marketing
                  campaigns, brand and event promotions, reward allocation,
                  creative advertising, mass marketing, content distribution and
                  more...
                </p>
              </div>
            </div>
          </Section>

          <Section className="section-land-four">
            <img src={grpfourimg} alt="landingslide" className="bg-dash-four" />
            <div className="mediaeye-layout-middle">
              <div className="mediaeye-gatebox">
                <p className="gateway-heading">
                  OPEN THE GATE TO THE META FRONTIER
                </p>
                <p className="gateway-sub-heading-one">
                  MEDIA EYE is an innovative Web 3.0 ecosystem that enables
                  users to capitalize on an extensive range of blockchain based
                  NFT driven capabilities.
                </p>
              </div>
            </div>
          </Section>

          <Section className="section-land-five">
            {/* <img src={grpfiveimg} alt="landingslide" className="bg-dash-five" /> */}
            <div className="mediaeye-layout-middle">
              <p className="gateway-heading">META-GATE OPENING OPPORTUNITIES</p>
              <div className="meta-gate-box">
                <div className="gateway-box">
                  <span>
                    <img
                      className="meta-gate-icon"
                      src={plusimg}
                      alt="metagateImg"
                    />
                  </span>
                  <div className="meta-detail">
                    <p className="gateway-box-head">
                      NFT & COLLECTION CREATION
                    </p>
                    {/* <ul className="meta-list-box">
                      <li className="meta-list">Multi-Chain NFT Minting</li>
                      <li className="meta-list">
                        Jumbo Minting (unlimited, gasless minting)
                      </li>
                      <li className="meta-list">
                        Create Group Collections & Store Fronts
                      </li>
                      <li className="meta-list">
                        Rapid Digital Content Deployment
                      </li>
                    </ul> */}
                  </div>
                </div>
                <div className="gatwboxway">
                  <div className="gateway-box">
                    <span>
                      <svg
                        width="53"
                        height="40"
                        viewBox="0 0 53 54"
                        fill="none"
                        xmlns="https://www.w3.org/2000/svg"
                      >
                        <g opacity="0.5">
                          <path
                            d="M35.3598 26.7764H17.8372"
                            stroke="white"
                            strokeWidth="3"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M26.5985 18.015L26.5985 35.5378"
                            stroke="white"
                            strokeWidth="3"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </g>
                      </svg>
                    </span>
                    <div className="meta-detail">
                      <p className="gateway-box-head-one">
                        Multi-Chain NFT Minting
                      </p>
                    </div>
                  </div>
                  <div className="gateway-box">
                    <span>
                      <svg
                        width="53"
                        height="40"
                        viewBox="0 0 53 54"
                        fill="none"
                        xmlns="https://www.w3.org/2000/svg"
                      >
                        <g opacity="0.5">
                          <path
                            d="M35.3598 26.7764H17.8372"
                            stroke="white"
                            strokeWidth="3"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M26.5985 18.015L26.5985 35.5378"
                            stroke="white"
                            strokeWidth="3"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </g>
                      </svg>
                    </span>
                    <div className="meta-detail">
                      <p className="gateway-box-head-one">
                        Jumbo Minting (unlimited, gasless minting)
                      </p>
                    </div>
                  </div>
                  <div className="gateway-box">
                    <span>
                      <svg
                        width="53"
                        height="40"
                        viewBox="0 0 53 54"
                        fill="none"
                        xmlns="https://www.w3.org/2000/svg"
                      >
                        <g opacity="0.5">
                          <path
                            d="M35.3598 26.7764H17.8372"
                            stroke="white"
                            strokeWidth="3"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M26.5985 18.015L26.5985 35.5378"
                            stroke="white"
                            strokeWidth="3"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </g>
                      </svg>
                    </span>
                    <div className="meta-detail">
                      <p className="gateway-box-head-one">
                        Create Group Collections & Store Fronts
                      </p>
                    </div>
                  </div>
                  <div className="gateway-box">
                    <span>
                      <svg
                        width="53"
                        height="40"
                        viewBox="0 0 53 54"
                        fill="none"
                        xmlns="https://www.w3.org/2000/svg"
                      >
                        <g opacity="0.5">
                          <path
                            d="M35.3598 26.7764H17.8372"
                            stroke="white"
                            strokeWidth="3"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M26.5985 18.015L26.5985 35.5378"
                            stroke="white"
                            strokeWidth="3"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </g>
                      </svg>
                    </span>
                    <div className="meta-detail">
                      <p className="gateway-box-head-one">
                        Rapid Digital Content Deployment
                      </p>
                    </div>
                  </div>
                </div>
                <div className="gatwboxway">
                  <div className="gateway-box">
                    <span>
                      <svg
                        width="53"
                        height="40"
                        viewBox="0 0 53 54"
                        fill="none"
                        xmlns="https://www.w3.org/2000/svg"
                      >
                        <g opacity="0.5">
                          <path
                            d="M35.3598 26.7764H17.8372"
                            stroke="white"
                            strokeWidth="3"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M26.5985 18.015L26.5985 35.5378"
                            stroke="white"
                            strokeWidth="3"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </g>
                      </svg>
                    </span>
                    <div className="meta-detail">
                      <p className="gateway-box-head-one">CAMPAIGNS</p>
                      <ul className="meta-list-box">
                        <p className="">
                          Create Campaigns across Broad Range of Digital markets
                          (crypto, media, e-commerce, gaming and entertainment)
                        </p>
                      </ul>
                    </div>
                  </div>
                  <div className="gateway-box">
                    <span>
                      <svg
                        width="53"
                        height="40"
                        viewBox="0 0 53 54"
                        fill="none"
                        xmlns="https://www.w3.org/2000/svg"
                      >
                        <g opacity="0.5">
                          <path
                            d="M35.3598 26.7764H17.8372"
                            stroke="white"
                            strokeWidth="3"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M26.5985 18.015L26.5985 35.5378"
                            stroke="white"
                            strokeWidth="3"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </g>
                      </svg>
                    </span>
                    <div className="meta-detail">
                      <p className="gateway-box-head-one">AIRDROPS</p>
                      <ul className="meta-list-box">
                        <p className="">
                          Multi-chain token and NFT distribution with
                          customizable bounties and whitelistings
                        </p>
                      </ul>
                    </div>
                  </div>
                  <div className="gateway-box">
                    <span>
                      <svg
                        width="53"
                        height="40"
                        viewBox="0 0 53 54"
                        fill="none"
                        xmlns="https://www.w3.org/2000/svg"
                      >
                        <g opacity="0.5">
                          <path
                            d="M35.3598 26.7764H17.8372"
                            stroke="white"
                            strokeWidth="3"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M26.5985 18.015L26.5985 35.5378"
                            stroke="white"
                            strokeWidth="3"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </g>
                      </svg>
                    </span>
                    <div className="meta-detail">
                      <p className="gateway-box-head-one">EVENTS</p>
                      <ul className="meta-list-box">
                        <p className="">
                          Create awareness globally for your events with a full
                          suite of customizable integrated services, dedicated
                          galleries and offerings.
                        </p>
                      </ul>
                    </div>
                  </div>
                  <div className="gateway-box">
                    <span>
                      <svg
                        width="53"
                        height="40"
                        viewBox="0 0 53 54"
                        fill="none"
                        xmlns="https://www.w3.org/2000/svg"
                      >
                        <g opacity="0.5">
                          <path
                            d="M35.3598 26.7764H17.8372"
                            stroke="white"
                            strokeWidth="3"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M26.5985 18.015L26.5985 35.5378"
                            stroke="white"
                            strokeWidth="3"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </g>
                      </svg>
                    </span>
                    <div className="meta-detail">
                      <p className="gateway-box-head-one">CHARITY</p>
                      <ul className="meta-list-box">
                        <p className="">
                          Charitable organization onboarding, donations, and the
                          ability to follow and support charities globally.
                        </p>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Section>

          <Section className="section-land-six">
            <img src={grpsiximg} alt="landingslide" className="bg-dash-six" />
            <div className="mediaeye-layout-middle">
              <div className="meta-gate-box">
                <div className="gateway-box">
                  <span>
                    <img
                      className="meta-gate-icon"
                      src={linegrpimg}
                      alt="metagateImg"
                    />
                  </span>
                  <div className="meta-detail">
                    <p className="gateway-box-head">
                      DIGITAL MARKETING SUPPORTED
                    </p>
                    <ul className="meta-list-box">
                      <li className="meta-list">Growth Marketing</li>
                      <li className="meta-list">Growth Hacking</li>
                      <li className="meta-list">Guerilla Marketing</li>
                      <li className="meta-list">Influencer Marketing</li>
                      <li className="meta-list">Social Media Marketing</li>
                      <li className="meta-list">Gaming Marketing</li>
                      <li className="meta-list">Social Gaming Marketing</li>
                      <li className="meta-list">Social Commerce Marketing</li>
                      <li className="meta-list">Rewards-Based Marketing</li>
                      <li className="meta-list">Event Based Marketing</li>
                      <li className="meta-list">Bounty Driven Marketing</li>
                      <li className="meta-list">Participatory Marketing</li>
                      <li className="meta-list">Grass Rooots Marketing</li>
                      <li className="meta-list">Brand Awareness Marketing</li>
                      <li className="meta-list">Direct Marketing</li>
                      <li className="meta-list">Impact Marketing</li>
                      <li className="meta-list">Blogger Marketing</li>
                      <li className="meta-list">
                        Active and Pasassive Content Marketing
                      </li>
                      <li className="meta-list">Performance Marketing</li>
                      <li className="meta-list">
                        Events Based Direct and Mass Marketing Tools
                      </li>
                      <li className="meta-list">
                        Outbond and Inbound Marketing
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="gateway-box-two">
                  <span>
                    <img className="meta-gate-icon" src={heximg} alt="heximg" />
                  </span>
                  <div className="meta-detail">
                    <p className="gateway-box-head">
                      INTEGRATED SERVICES SUPPORTED
                    </p>

                    <div className="social-link-box">
                      <div className="social-box-sets">
                        <div className="linking-box">
                          <p className="social-head">Social Media Platforms</p>
                          <div className="social-part">
                            <span>
                              <img
                                className="social-img"
                                src={s1}
                                alt="socialIcon"
                              />
                            </span>
                            <span>
                              <img
                                className="social-img"
                                src={s2}
                                alt="socialIcon"
                              />
                            </span>
                            <span>
                              <img
                                className="social-img"
                                src={s3}
                                alt="socialIcon"
                              />
                            </span>
                            <span>
                              <img
                                className="social-img"
                                src={s4}
                                alt="socialIcon"
                              />
                            </span>
                            <span>
                              <img
                                className="social-img"
                                src={s5}
                                alt="socialIcon"
                              />
                            </span>
                            <span>
                              <img
                                className="social-img"
                                src={s6}
                                alt="socialIcon"
                              />
                            </span>
                            <span>
                              <img
                                className="social-img"
                                src={s7}
                                alt="socialIcon"
                              />
                            </span>
                            <span>
                              <img
                                className="social-img"
                                src={s13}
                                alt="socialIcon"
                              />
                            </span>
                          </div>
                        </div>
                        <div className="linking-box">
                          <p className="social-head">
                            E-mail Marketing Services
                          </p>
                          <div className="social-part">
                            <span>
                              <img
                                className="social-img"
                                src={s14}
                                alt="socialIcon"
                              />
                            </span>
                            <span>
                              <img
                                className="social-img"
                                src={s15}
                                alt="socialIcon"
                              />
                            </span>
                            <span>
                              <img
                                className="social-img"
                                src={s16}
                                alt="socialIcon"
                              />
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="social-box-sets">
                        <div className="linking-box">
                          <p className="social-head">
                            Video and Live Streaming Services
                          </p>
                          <div className="social-part">
                            <span>
                              <img
                                className="social-img"
                                src={s8}
                                alt="socialIcon"
                              />
                            </span>
                            <span>
                              <img
                                className="social-img"
                                src={s10}
                                alt="socialIcon"
                              />
                            </span>
                            <span>
                              <img
                                className="social-img"
                                src={s11}
                                alt="socialIcon"
                              />
                            </span>
                            <span>
                              <img
                                className="social-img"
                                src={s12}
                                alt="socialIcon"
                              />
                            </span>
                          </div>
                        </div>
                        <div className="linking-box">
                          <p className="social-head">
                            Events Management Platform
                          </p>
                          <div className="social-part">
                            <span>
                              <img
                                className="social-img"
                                src={s17}
                                alt="socialIcon"
                              />
                            </span>
                          </div>
                        </div>
                        <div className="linking-box">
                          <p className="social-head">
                            Charity & Crypto Donations
                          </p>
                          <div className="social-part">
                            <span>
                              <img
                                className="social-img"
                                src={s18}
                                alt="socialIcon"
                              />
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Section>

          <Section className="section-land-seven">
            <img
              src={grpsevenimg}
              alt="landingslide"
              className="bg-dash-seven"
            />
            <div className="mediaeye-layout-middle">
              <p className="gateway-heading">WELCOME TO THE metaverse</p>
              <Link to="/" className="enter-page">
                <img className="" src={enterarrow} alt="enterArrow" /> Enter
              </Link>
            </div>
          </Section>
        </Scroller>
      </div>
    </>
  );
};

export default Landing;
