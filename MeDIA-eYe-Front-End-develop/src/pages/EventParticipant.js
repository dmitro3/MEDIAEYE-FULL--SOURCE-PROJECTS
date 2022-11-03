import React from 'react';
import ParticipantEvent from '../components/Events/ParticipantEvent/ParticipantEvent';
const EventParticipant = (props) => {
  const { closeNftCollapse } = props;

  return (
    <React.Fragment>
      <div
        onClick={closeNftCollapse}
        className="mediaeye-layout-content event_create"
      >
        <ParticipantEvent />
      </div>
    </React.Fragment>
  );
};

export default EventParticipant;
