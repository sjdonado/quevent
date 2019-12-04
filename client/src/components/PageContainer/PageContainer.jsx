import React from 'react';
import { Box, Typography } from '@material-ui/core';
import PropTypes from 'prop-types';
import styles from './PageContainer.module.scss';

import AppBar from '../AppBar/AppBar';

function PageContainer({ title, action, children }) {
  return (
    <Box className={styles.root}>
      <AppBar />
      <Box className={styles.content}>
        <Box className={styles.header}>
          <Typography component="h1" variant="h4">
            {' '}
            {title}
          </Typography>
          <Box>
            {action && action()}
          </Box>
        </Box>
        {children}
      </Box>
    </Box>
  );
}


PageContainer.propTypes = {
  children: PropTypes.node.isRequired,
  action: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
};

export default PageContainer;
