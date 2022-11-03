import React from 'react';
import EventsGalleryMain from '../components/Events/EventsGallery/EventsGallery';

const EventsGallery = (props) => {
  const { closeNftCollapse } = props;

  return (
    <React.Fragment>
      <div onClick={closeNftCollapse}>
        <EventsGalleryMain />
      </div>
    </React.Fragment>
  );
};

export default EventsGallery;
