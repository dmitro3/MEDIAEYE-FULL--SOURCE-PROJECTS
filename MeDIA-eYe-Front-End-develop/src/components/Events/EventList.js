import React, { useEffect, useState } from 'react';
import EventsBlock from './EventsBlock/EventsBlock';
import { EventsJson } from '../../utils/JsonData';

export default function EventList(props) {
  const eventData = EventsJson();
  return (
    <>
      <div className="mediaeye-event-row">
        {eventData.map((event, i) => (
          <EventsBlock event={event} key={i} />
        ))}
      </div>
    </>
  );
}
