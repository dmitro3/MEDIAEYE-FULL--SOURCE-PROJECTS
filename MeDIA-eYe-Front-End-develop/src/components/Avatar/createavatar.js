import React, { useEffect, useState } from 'react';
import './createavatar.scss';
export default function Createavatar() {
  useEffect(async () => {
    const frame = document.getElementById('frame');
    frame.src = `https://demo.readyplayer.me`;
  }, []);

  return (
    <section className="mediaeye-layout-content">
      <div className="mediaeye-layout-container">
        <div className="mediaeye-layout-container-header">
          <div className="mediaeye-layout-container-header-heading center">
            <h2>Meta eYe Avatar</h2>
          </div>
        </div>
        <div className="avatar-page-content-main">
          <iframe
            id="frame"
            className="avatar-page-content-main-iframe"
            allow="camera *; microphone *"
          ></iframe>
        </div>
      </div>
    </section>
  );
}
