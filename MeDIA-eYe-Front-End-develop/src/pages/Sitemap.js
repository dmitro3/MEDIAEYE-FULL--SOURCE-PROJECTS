import React from 'react';
import { Helmet } from 'react-helmet';
import '../components/Sitemap/Sitemap.scss';
import MapBlock from '../components/Sitemap/MapBlock';
import MapBox from '../components/Sitemap/MapBox';

const Sitemap = (props) => {
  const { closeNftCollapse } = props;

  return (
    <React.Fragment>
      <Helmet>
        <title>Sitemap | MEDIA EYE NFT Portal</title>
        <meta
          name="description"
          content="MEDIA EYE NFT Portal puts the power of blockchain to work for your next marketing campaign, promotion, rewards or creating a collectible."
        ></meta>
      </Helmet>
      <div
        onClick={closeNftCollapse}
        className="mediaeye-layout-content bottomnospace"
      >
        <div className="mediaeye-sitemap">
          <MapBlock />
          <MapBox />
        </div>
      </div>
    </React.Fragment>
  );
};

export default Sitemap;
