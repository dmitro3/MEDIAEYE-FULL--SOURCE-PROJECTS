import React, { useEffect } from 'react';
import MainHead from '../../components/MainHead/MainHead';
import KeyBlock from '../../components/KeyBlock/KeyBlock';
import ServiceBlock from '../../components/ServiceBlock/ServiceBlock';
import AboutSignup from '../../components/AboutSignup/AboutSignup';
import Team from '../../components/Team/Team';
import BecomePartner from '../../components/BecomePartner/BecomePartner';
import PartnersBlock from '../../components/Partners/PartnersBlock';
import { PartnersJSON } from '../../utils/JsonData';
import { Helmet } from 'react-helmet';
import { groupOfArray } from '../../utils/groupOfArray';
import './MainAboutUs.scss';
import { Link } from 'react-router-dom';
import UpvotyWidget from './index';
import imageLeft from '../../assets/img/spotlight/img_left.png';
import imageRight from '../../assets/img/spotlight/img_right.png';
import IntegratedServices from '../../components/ContentMarketplace/IntegratedServices/IntegratedServices';

const MainAboutUs = (props) => {
  const { closeNftCollapse } = props;
  const partners = PartnersJSON();

  return (
    <React.Fragment>
      <Helmet>
        <meta property="og:url" content={window.location.origin + '/about'} />
        <meta property="og:type" content="website" />
        <meta
          property="og:title"
          content="NFTs UNBOUND! About us | MEDIA EYE"
        />
        <meta
          property="og:description"
          content="MEDIA EYE was created to become a leading Web 3.0 services platform, supporting an extensive range of NFT driven services for the real world"
        />
        <meta
          property="og:image"
          content={window.location.origin + '/img/meta_tag/about.png'}
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta property="twitter:domain" content="mediaeyenft.com/about" />
        <meta
          property="twitter:url"
          content={window.location.origin + '/about'}
        />
        <meta
          name="twitter:title"
          content="NFTs UNBOUND! About us | MEDIA EYE"
        />
        <meta
          name="twitter:description"
          content="MEDIA EYE was created to become a leading Web 3.0 services platform, supporting an extensive range of NFT driven services for the real world"
        />
        <meta
          name="twitter:image"
          content={window.location.origin + '/img/meta_tag/about.png'}
        />
        <title>NFTs UNBOUND! About us | MEDIA EYE </title>
        <meta
          name="description"
          content="MEDIA EYE was created to become a leading Web 3.0 services platform, supporting an extensive range of NFT driven services for the real world"
        />
      </Helmet>
      <div
        onClick={closeNftCollapse}
        className="mediaeye-layout-content bottomnospace"
      >
        <div className="MainAbout-page">
          <MainHead />
          <KeyBlock />
          <ServiceBlock />
          <section className="mediaeye-layout-section m-t-30 withspace">
            <div className="mediaeye-layout-middle">
              <div className="mediaeye-layout-container">
                <div className="mediaeye-layout-section-header">
                  <h2 className="mediaeye-layout-section-header-heading text-center">
                    ROADMAP
                  </h2>
                </div>
                <UpvotyWidget boardHash={null} ssoToken={null} baseUrl={"roadmap.mediaeyenft.com"} />
              </div>
            </div>
          </section>


          <section className="mediaeye-layout-section m-t-30 withspace">
            <div className="mediaeye-layout-middle">
              <div className="mediaeye-layout-container">
                <div className="mediaeye-layout-section-header">
                  <h2 className="mediaeye-layout-section-header-heading text-center">
                    CONTRIBUTORS
                  </h2>
                </div>
                <Team />
              </div>
            </div>
          </section>

          <section className="mediaeye-layout-section withspace">
            <div className="mediaeye-layout-middle">
              <div className="mediaeye-layout-container">
                <div className="mediaeye-layout-section-header">
                  <h2 className="mediaeye-layout-section-header-heading text-center">
                    Integrated Services
                  </h2>
                </div>

                <IntegratedServices />
              </div>
            </div>
          </section>
          <section className="mediaeye-layout-section withspace m-t-30">
            <div className="mediaeye-layout-middle">
              <div className="mediaeye-layout-container">
                <div className="mediaeye-layout-section-header">
                  <h2 className="mediaeye-layout-section-header-heading text-center">
                    PARTNERS
                  </h2>
                </div>
                <div className="MainAbout-page-flexrow">
                  {groupOfArray(partners, 2).map((partner, i) => (
                    <PartnersBlock key={'partners' + i} partner={partner} />
                  ))}
                </div>
              </div>
            </div>
          </section>
          <BecomePartner />
          <div className="mediaeye-layout-middle">
            <div className="mediaeye-layout-container">
              <div className="MainAbout-page-servicerow">
                <Link to="/spotlight" className="backbox">
                  <img src={imageLeft} alt="spotlight" />
                </Link>
                <Link to="/create/collection" className="backbox m-l-20">
                  <img src={imageRight} alt="beard punks" />
                </Link>
              </div>
            </div>
          </div>
          <AboutSignup />
        </div>
      </div>
    </React.Fragment>
  );
};
export default MainAboutUs;
