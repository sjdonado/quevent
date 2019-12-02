import React from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

const PrivateRoute = ({ children, authenticated }) => (
  <>
    {authenticated ? children : <Redirect to="/" />}
  </>
);

PrivateRoute.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  authenticated: PropTypes.bool.isRequired,
};

export default PrivateRoute;
