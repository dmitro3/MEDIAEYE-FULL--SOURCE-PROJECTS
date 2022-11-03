import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
const Refresh = (props) => {
  let history = useHistory();
  useEffect(() => history.goBack(), []);
  return <></>;
};

export default Refresh;
