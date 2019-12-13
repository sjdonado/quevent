import React from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

const PrivateRoutes = ({ children, authenticated }) => (
  <>
    {authenticated ? children : <Redirect to="/" />}
  </>
);

PrivateRoutes.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  authenticated: PropTypes.bool.isRequired,
};

export default PrivateRoutes;
