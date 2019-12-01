import React from 'react';
import PropTypes from 'prop-types';
import { Box, Typography } from '@material-ui/core';
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

      </Box>

    </PageContainer>
  );
}

EventDetails.propTypes = {

};

export default EventDetails;
