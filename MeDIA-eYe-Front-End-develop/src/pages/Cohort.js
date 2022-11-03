import React from 'react';
import CohortMain from '../components/Cohort/Cohort';

const Cohort = (props) => {
  const { closeNftCollapse } = props;

  return (
    <React.Fragment>
      <div
        onClick={closeNftCollapse}
        className="mediaeye-layout-content cohort-page bottomnospace"
      >
        <CohortMain />
      </div>
    </React.Fragment>
  );
};

export default Cohort;
