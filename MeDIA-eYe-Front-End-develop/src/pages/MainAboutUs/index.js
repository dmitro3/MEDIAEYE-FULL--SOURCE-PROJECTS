import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import upvoty from './upvoty';

const UpvotyWidget = ({ boardHash, ssoToken, baseUrl }) => {
  useEffect(() => {
    upvoty.init('render', { boardHash, ssoToken, baseUrl });
    return () => {
      upvoty.destroy();
    };
  }, []);
  return (
    <div data-upvoty />
  );
}

UpvotyWidget.defaultProps = {
  ssoToken: null,
  boardHash: null,
};

UpvotyWidget.propTypes = {
  boardHash: PropTypes.string,
  ssoToken: PropTypes.string,
  baseUrl: PropTypes.string.isRequired,
};

export default UpvotyWidget;