import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

// Images & Media
import createIcon from '../../assets/img/howitworks/create.png';
import promoteIcon from '../../assets/img/howitworks/promote.png';
import collectIcon from '../../assets/img/howitworks/collect.png';

const HowBlock = (props) => {
  let history = useHistory();
  const dispatch = useDispatch();

  return (
    <section className="mediaeye-layout-section mediaeye-howBlock PurpleGrad">
      <div className="mediaeye-layout-container">
        <div className="mediaeye-howBlock">
          <div className="nft_serviceNew head">
            <div className="mediaeye-layout-container-header">
              <div
                class="mediaeye-layout-container-header-heading center animate__fadeIn wow"
                data-wow-duration="1s"
                data-wow-delay="0.5s"
              >
                <h2>How it works?</h2>
              </div>
            </div>
          </div>
          <div className="mediaeye-howBlock-content">
            <div
              className="mediaeye-howBlock-content-block"
              data-wow-duration="1s"
              data-wow-delay="0.5s"
            >
              <div className="mediaeye-howBlock-content-block-img">
                <img src={createIcon} alt="create" />
              </div>
              <div className="mediaeye-howBlock-content-block-title">
                <span>Create</span>
              </div>
              <p>
                Mint and embed digitized content on an NFT token, such as; art,
                text, videos, photos, 2D/3D models, songs or lines of code. NFTs
                can also represent a tokenized form of any digitized asset,
                artwork, movies, music, brands and more. Become a creator and
                discover the unlimited potential of NFTs
              </p>
              <div className="mediaeye-howBlock-bottom-buttons">
                <button
                  type="button"
                  className="btn btn-creative"
                  onClick={() => history.push('/create')}
                >
                  <span>Create Your NFTs</span>
                </button>
              </div>
            </div>
            <div
              className="mediaeye-howBlock-content-block"
              data-wow-duration="1s"
              data-wow-delay="0.5s"
            >
              <div className="mediaeye-howBlock-content-block-img">
                <img src={promoteIcon} alt="Promote" />
              </div>
              <div className="mediaeye-howBlock-content-block-title">
                <span>Promote</span>
              </div>
              <p>
                Leverage the potential of NFTs to drive your next ad campaign,
                create brand awareness, distribute content and create unique
                experiences for consumers
              </p>
              <div className="mediaeye-howBlock-bottom-buttons">
                <button
                  type="button"
                  className="btn btn-featured"
                  onClick={() => history.push('/create')}
                >
                  <span>Create Campaign</span>
                </button>
              </div>
            </div>
            <div
              className="mediaeye-howBlock-content-block"
              data-wow-duration="1s"
              data-wow-delay="0.5s"
            >
              <div className="mediaeye-howBlock-content-block-img">
                <img src={collectIcon} alt="Collect" />
              </div>
              <div className="mediaeye-howBlock-content-block-title">
                <span>Collect</span>
              </div>
              <p>
                NFTs provide a new medium for collectors to store their
                collectables, while ensuring immutable provenance and providing
                a secure store of value for their assets
              </p>
              <div className="mediaeye-howBlock-bottom-buttons">
                <button
                  type="button"
                  className="btn btn-info"
                  onClick={() => history.push('/create')}
                >
                  <span>View Collections</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowBlock;
