import React from 'react';
import LaunchEventMain from '../components/Events/LaunchEvent/CreateEvent';

const LaunchEvent = (props) => {
  const { closeNftCollapse } = props;

  return (
    <React.Fragment>
      <div
        onClick={closeNftCollapse}
        className="mediaeye-layout-content launch-event-page"
      >
        <LaunchEventMain />
      </div>
    </React.Fragment>
  );
};

export default LaunchEvent;
