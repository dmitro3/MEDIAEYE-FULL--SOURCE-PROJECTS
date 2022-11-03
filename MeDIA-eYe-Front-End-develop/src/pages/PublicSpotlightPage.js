import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import PublicSpotlight from '../components/Spotlight/PublicSpotlight';
import SpotlightHeader from '../components/Spotlight/SpotlightHeader';
import ReactTooltip from 'react-tooltip';
const PublicSpotlightPage = (props) => {
  const { closeNftCollapse } = props;

  useEffect(() => {
    ReactTooltip.hide();
  }, []);

  return (
    <>
      <Helmet>
        <meta
          property="og:url"
          content={window.location.origin + '/spotlight'}
        />
        <meta property="og:type" content="website" />
        <title>Spotlight | MEDIA EYE</title>
      </Helmet>
      <div
        className="mediaeye-layout-content public-spotlight"
        onClick={closeNftCollapse}
      >
        <SpotlightHeader />
        <div className="mediaeye-layout-middle">
          <PublicSpotlight />
        </div>
      </div>
    </>
  );
};

export default PublicSpotlightPage;
