import React from 'react';
import { useHistory } from 'react-router-dom';
import { Helmet } from 'react-helmet';
const Nomatch = (props) => {
  const { closeNftCollapse } = props;
  let history = useHistory();

  return (
    <>
      <Helmet>
        <meta property="og:url" content={window.location.origin + '/404'} />
        <meta property="og:type" content="website" />
        <meta
          property="og:title"
          content="NFT Web 3.0 Services on BSC ETH FTM chains: Marketplace, Generative Collections for Creators, Artists, Sports, Gaming and Charities | MEDIA EYE"
        />
        <meta
          property="og:description"
          content="Most extesnive range of NFT driven services: campaigns, events, airdrops, avatars, marketplace, integrated socials and digital marketing tools"
        />
        <meta
          property="og:image"
          content={window.location.origin + '/img/meta_tag/404.png'}
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta property="twitter:domain" content="mediaeyenft.com/404" />
        <meta
          property="twitter:url"
          content={window.location.origin + '/404'}
        />
        <meta
          name="twitter:title"
          content="NFT Web 3.0 Services on BSC ETH FTM chains: Marketplace, Generative Collections for Creators, Artists, Sports, Gaming and Charities | MEDIA EYE"
        />
        <meta
          name="twitter:description"
          content="Most extesnive range of NFT driven services: campaigns, events, airdrops, avatars, marketplace, integrated socials and digital marketing tools"
        />
        <meta
          name="twitter:image"
          content={window.location.origin + '/img/meta_tag/404.png'}
        />
        <title>
          NFT Web 3.0 Services on BSC ETH FTM chains: Marketplace, Generative
          Collections for Creators, Artists, Sports, Gaming and Charities |
          MEDIA EYE{' '}
        </title>
        <meta
          name="description"
          content="Most extesnive range of NFT driven services: campaigns, events, airdrops, avatars, marketplace, integrated socials and digital marketing tools"
        />
      </Helmet>
      <div
        className="mediaeye-layout-content withfulllayout mediaeyeErrorpage"
        onClick={closeNftCollapse}
      >
        <img
          src="/img/error-image.jpg"
          alt="errorimg"
          className="mediaeyeErrorpage-image"
        />
        <div className="mediaeyeErrorpage-content">
          <div className="mediaeyeErrorpage-content-inner">
            <div className="mediaeyeErrorpage-content-text">ERROR</div>
            <div className="mediaeyeErrorpage-content-heading">404</div>
            <div className="mediaeyeErrorpage-content-text">PAGE NOT FOUND</div>
          </div>
        </div>
        {/* <img src="/img/404.png" alt="404" className="m-auto" /> */}
      </div>
    </>
  );
};

export default Nomatch;
