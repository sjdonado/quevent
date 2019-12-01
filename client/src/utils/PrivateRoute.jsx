import React from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

const PrivateRoute = (props) => {
  const { children } = props;
  const user = true;

  return (
    <>
      {user ? children : <Redirect to="/" />}
    </>
  );
};
PrivateRoute.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};
export default PrivateRoute;
