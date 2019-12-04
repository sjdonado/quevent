import React from 'react';
import {
  Box, Typography, IconButton,
} from '@material-ui/core';
import { Link } from 'react-router-dom';

import PropTypes from 'prop-types';
import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft';
import styles from './PageContainer.module.scss';
import AppBar from '../AppBar/AppBar';

function PageContainer({
  title, backButton, action, subtitle, align, children,
}) {
  return (
    <Box className={styles.root}>
      <AppBar />
      <Box className={styles.content}>
        <Box className={align === 'center' ? styles['header-center'] : styles.header}>
          {backButton && (
          <IconButton
            color="secondary"
            aria-label="back"
            component={Link}
            to={backButton}
          >
            <KeyboardArrowLeftIcon fontSize="small" />
          </IconButton>
          )}
          <Typography component="h1" variant="h4" align={align}>
            {' '}
            {title}
          </Typography>
          {action && (
          <Box>
            {action()}
          </Box>
          )}

        </Box>
        {subtitle && (
        <Typography variant="subtitle1" align={align} className={styles.subtitle}>
          {subtitle}
        </Typography>
        )}
        {children}
      </Box>
    </Box>
  );
}


PageContainer.propTypes = {
  children: PropTypes.node.isRequired,
  action: PropTypes.func.isRequired,
  subtitle: PropTypes.string,
  backButton: PropTypes.string,
  align: PropTypes.string,
  title: PropTypes.string.isRequired,
};

PageContainer.defaultProps = {
  align: 'left',
  backButton: undefined,
  subtitle: null,
};

export default PageContainer;
