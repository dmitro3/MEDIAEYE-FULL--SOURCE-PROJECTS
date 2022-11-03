import React from 'react';
import NewsletterMain from '../components/Newsletter/NewsletterMain';

const Newsletter = (props) => {
  const { closeNftCollapse } = props;

  return (
    <React.Fragment>
      <div
        onClick={closeNftCollapse}
        className="newsletter-page mediaeye-layout-content"
      >
        <NewsletterMain />
      </div>
    </React.Fragment>
  );
};

export default Newsletter;
