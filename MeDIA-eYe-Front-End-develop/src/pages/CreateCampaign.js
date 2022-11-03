import React from 'react';
import { Helmet } from 'react-helmet';
import '../components/CreateCampaign/CreateCampaign.scss';
import MainCreateCampaign from '../components/CreateCampaign/MainCreateCampaign';

const CreateCampaign = (props) => {
  const { closeNftCollapse } = props;

  return (
    <React.Fragment>
      <Helmet>
        <meta
          property="og:url"
          content={window.location.origin + '/create-campaign'}
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
          content="mediaeyenft.com/create-campaign"
        />
        <meta
          property="twitter:url"
          content={window.location.origin + '/create-campaign'}
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
          <MainCreateCampaign />
        </div>
      </div>
    </React.Fragment>
  );
};

export default CreateCampaign;
