import React from 'react';
import { Box } from '@material-ui/core';
import PropTypes from 'prop-types';
import styles from './PageContainer.module.scss';

function PageContainer({ children }) {
  return (
    <Box className={styles.root}>
      {children}
    </Box>
  );
}


PageContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PageContainer;
