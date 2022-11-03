import React from 'react';

//media and Images
import EyeIcon from '../../assets/img/NewAbout_us/NewEyeIcon.png';
import WhySlide1 from '../../assets/img/NewAbout_us/WhySlide1.png';
import WhySlide2 from '../../assets/img/NewAbout_us/WhySlide2.png';
import WhySlide3 from '../../assets/img/NewAbout_us/WhySlide3.png';
import BlueZillaIcon from '../../assets/img/NewAbout_us/BlueZillaIcon.png';

const WhyBlock = (props) => {
  return (
    <>
      <section className="mediaeye-layout-section about-page-mainblock">
        <div className="mediaeye-layout-content bottomnospace PurpleGrad">
          <div className="mediaeye-layout-container">
            <div className="mediaeye-WhyBlock">
              <img src={EyeIcon} alt="EyeIcon" className="EyeIcon" />
              <div className="mediaeye-WhyBlock-slides">
                <img src={WhySlide1} alt="slide" className="WhySlide1" />
                <img src={WhySlide2} alt="slide" className="WhySlide2" />
                <img src={WhySlide3} alt="slide" className="WhySlide3" />
              </div>

              <div className="mediaeye-WhyBlock-content">
                <div className="mediaeye-layout-container-header">
                  <div class="mediaeye-layout-container-header-heading center">
                    <h2>WHY MEDIA EYE?</h2>
                  </div>
                </div>
                <h6>
                  MeDIA eYe NFT Portal provides Blockchain-as-a-Service
                  technology designed for rapid and cost effective deployment of
                  NFTs across a broad range of digital content market segments
                  providing unique range of services for marketing campaigns,
                  influencer campaigns, brand promotions, events, rewards
                  distribution, creative advertising, mass marketing, content
                  distribution and more...
                </h6>
              </div>
              <div className="mediaeye-WhyBlock-content-sec">
                <div className="mediaeye-layout-container-header">
                  <div class="mediaeye-layout-container-header-heading center">
                    <h2>whаt is mediа eye nft portаl</h2>
                  </div>
                </div>
                <div className="mediaeye-WhyBlock-content-sec-inner">
                  <div className="mediaeye-WhyBlock-content-sec-inner-icon">
                    <img src={BlueZillaIcon} alt="BlueZillaIcon" />
                    <p>Incubated by BlueZilla.vc</p>
                  </div>
                  <h6>
                    MeDIA eYe NFT Portal puts the power of blockchain to work
                    for your NFT collections, collectibles, marketing campaigns,
                    promotions, reward programs and events.
                  </h6>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default WhyBlock;
