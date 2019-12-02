import React from 'react';
import PropTypes from 'prop-types';
import {
  Box, Typography, Tooltip, Fab,
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import PageContainer from '../../components/PageContainer/PageContainer';
import AttendeesTable from './AttendeesTable/AttendeesTable';
import TabsNav from '../../components/TabsNav/TabsNav';

import styles from './EventDetails.module.scss';

function EventDetails() {
  return (
    <PageContainer>
      <Box className={styles.wrapper}>
        <Typography component="h1" variant="h4"> Event details</Typography>
        <TabsNav />
        <AttendeesTable />

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

EventDetails.propTypes = {

};

export default EventDetails;
