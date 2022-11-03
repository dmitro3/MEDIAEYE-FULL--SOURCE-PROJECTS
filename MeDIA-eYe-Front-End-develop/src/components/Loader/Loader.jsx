import React from 'react';
import './loader.scss';

export default function ({ className }) {
  return (
    <div className={className}>
      <div className="loader">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
}
