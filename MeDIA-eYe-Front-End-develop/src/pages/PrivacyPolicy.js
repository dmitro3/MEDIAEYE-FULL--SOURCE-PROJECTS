import React from 'react';
import { Helmet } from 'react-helmet';
import PrivacyMain from '../components/PrivacyMain/PrivacyMain';

const Sitemap = (props) => {
  const { closeNftCollapse } = props;

  return (
    <React.Fragment>
      <Helmet>
        <title>Privacy Policy | MEDIA EYE NFT Portal</title>
        <meta
          name="description"
          content="MEDIA EYE NFT Portal puts the power of blockchain to work for your next marketing campaign, promotion, rewards or creating a collectible."
        ></meta>
      </Helmet>
      <div
        onClick={closeNftCollapse}
        className="mediaeye-layout-content bottomnospace"
      >
        <div className="mediaeye-PrivacyPage">
          <PrivacyMain />
        </div>
      </div>
    </React.Fragment>
  );
};

export default Sitemap;
