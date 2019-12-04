import React from 'react';
import PropTypes from 'prop-types';

import {
  Box, Typography, Tooltip, Fab,
} from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import PersonAddOutlinedIcon from '@material-ui/icons/PersonAddOutlined';
import CropFreeIcon from '@material-ui/icons/CropFree';
import PageContainer from '../../components/PageContainer/PageContainer';
import AttendeesTable from './AttendeesTable/AttendeesTable';
import TabsNav from '../../components/TabsNav/TabsNav';
import ActionButton from '../../components/ActionButton/ActionButton';

import styles from './EventDetails.module.scss';

function EventDetails() {
  const history = useHistory();

  return (
    <PageContainer
      title="Event details"
      backButton="/home"
      action={() => (
        <>
          <ActionButton
            title="Scan QR code"
            onClick={() => {
              history.push('/events/123123/qrreader');
            }}
          >
            <CropFreeIcon />
          </ActionButton>
          <ActionButton
            title="Add a guest"
            onClick={() => {
              history.push('/events/123123/guests');
            }}
          >
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
