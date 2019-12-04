import React from 'react';
import PropTypes from 'prop-types';

import {
  Box, Typography, Tooltip, Fab,
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import PageContainer from '../../components/PageContainer/PageContainer';

import styles from './Home.module.scss';

function Home() {
  return (
    <PageContainer>
      <Box className={styles.wrapper}>
        <Typography component="h1" variant="h4">My events</Typography>

        <Tooltip title="Add guest" aria-label="add a guest to the list">
          <Fab
            color="secondary"
            aria-label="add"
            className={styles['add-action-button']}
          >
            <AddIcon />
          </Fab>
        </Tooltip>
      </Box>
    </PageContainer>
  );
}

Home.propTypes = {

};

export default Home;
