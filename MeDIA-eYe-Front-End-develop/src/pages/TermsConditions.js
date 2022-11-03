import React from 'react';
import { TermsAndConditions } from '../components/TermsAndConditions/TermsAndConditions';

const TermsConditions = (props) => {
  const { closeNftCollapse } = props;

  return (
    <React.Fragment>
      <div onClick={closeNftCollapse} className="marketplace">
        <TermsAndConditions />
      </div>
    </React.Fragment>
  );
};

export default TermsConditions;
