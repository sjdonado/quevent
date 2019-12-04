import React from 'react';
import PropTypes from 'prop-types';

import {
  Box, Typography, Tooltip, Fab,
} from '@material-ui/core';
import PersonAddOutlinedIcon from '@material-ui/icons/PersonAddOutlined';
import CropFreeIcon from '@material-ui/icons/CropFree';
import PageContainer from '../../components/PageContainer/PageContainer';
import AttendeesTable from './AttendeesTable/AttendeesTable';
import TabsNav from '../../components/TabsNav/TabsNav';
import ActionButton from '../../components/ActionButton/ActionButton';

import styles from './EventDetails.module.scss';

function EventDetails() {
  return (
    <PageContainer
      title="Event details"
      action={() => (
        <>
          <ActionButton title="Scan QR code">
            <CropFreeIcon />
          </ActionButton>
          <ActionButton title="Add a guest">
            <PersonAddOutlinedIcon />
          </ActionButton>
        </>
      )}
    >
      <Box className={styles.wrapper}>
        <TabsNav />
        <AttendeesTable />
      </Box>
    </PageContainer>
  );
}

EventDetails.propTypes = {

};

export default EventDetails;
