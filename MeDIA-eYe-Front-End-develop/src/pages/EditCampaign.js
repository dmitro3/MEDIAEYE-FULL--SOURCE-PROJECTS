import React from 'react';
import { Helmet } from 'react-helmet';
import MainEditCampaign from '../components/CreateCampaign/MainEditCampaign';

const EditCampaign = (props) => {
  const { closeNftCollapse } = props;

  return (
    <React.Fragment>
      <Helmet>
        <meta
          property="og:url"
          content={window.location.origin + '/edit-campaign'}
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:title"
          content="Create Campaign | MEDIA EYE NFT Portal"
        />
        <meta
          property="og:description"
          content="MEDIA EYE NFT Portal puts the power of blockchain to work for your next marketing campaign, promotion, rewards or creating a collectible."
        />
        <meta
          property="og:image"
          content={window.location.origin + '/img/meta_tag/create_campaign.png'}
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          property="twitter:domain"
          content="mediaeyenft.com/edit-campaign"
        />
        <meta
          property="twitter:url"
          content={window.location.origin + '/edit-campaign'}
        />
        <meta
          name="twitter:title"
          content="Create Campaign | MEDIA EYE NFT Portal"
        />
        <meta
          name="twitter:description"
          content="MEDIA EYE NFT Portal puts the power of blockchain to work for your next marketing campaign, promotion, rewards or creating a collectible."
        />
        <meta
          name="twitter:image"
          content={window.location.origin + '/img/meta_tag/create_campaign.png'}
        />
        <title>Create Campaign | MEDIA EYE NFT Portal</title>
        <meta
          name="description"
          content="MEDIA EYE NFT Portal puts the power of blockchain to work for your next marketing campaign, promotion, rewards or creating a collectible."
        />
      </Helmet>
      <div
        onClick={closeNftCollapse}
        className="mediaeye-layout-content bottomnospace"
      >
        <div className="mediaeye-MainCreateCampaign">
          <MainEditCampaign />
        </div>
      </div>
    </React.Fragment>
  );
};

export default EditCampaign;
