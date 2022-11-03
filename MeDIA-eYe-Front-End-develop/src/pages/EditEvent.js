import React from 'react';
import EditEventMain from '../components/Events/EditEvent/EditEventMain';

const EditEvent = (props) => {
  const { closeNftCollapse } = props;

  return (
    <React.Fragment>
      <div
        onClick={closeNftCollapse}
        className="mediaeye-layout-content edit-event-page"
      >
        <EditEventMain />
      </div>
    </React.Fragment>
  );
};

export default EditEvent;
