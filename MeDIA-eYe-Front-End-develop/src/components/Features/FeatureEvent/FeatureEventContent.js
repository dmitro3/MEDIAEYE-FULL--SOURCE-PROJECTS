import React, { useState } from 'react';

import FeaturedEvent from '../../Events/FeaturedEvent';
import EventList from '../../Events/EventList';
export default function FeatureEventContent() {
  return (
    <div className="mediaeye-layout-middle">
      <section className="mediaeye-layout-section withspace">
        <div className="mediaeye-layout-container">
          <div className="mediaeye-layout-section-header">
            <h2 className="mediaeye-layout-section-header-heading">
              Featured Events Live
            </h2>
          </div>
          <div className="mediaeye-layout-container">
            <FeaturedEvent />
          </div>
        </div>
      </section>

      <section className="mediaeye-layout-section withspace">
        <div className="mediaeye-layout-container">
          <div className="mediaeye-layout-section-header">
            <h2 className="mediaeye-layout-section-header-heading">
              Your Event
            </h2>
          </div>
          <div className="mediaeye-layout-container">
            <EventList />
          </div>
        </div>
      </section>
    </div>
  );
}
