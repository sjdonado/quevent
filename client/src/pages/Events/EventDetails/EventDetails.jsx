import React from 'react';

import {
  Box, Typography,
} from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import PersonAddOutlinedIcon from '@material-ui/icons/PersonAddOutlined';
import CropFreeIcon from '@material-ui/icons/CropFree';
import PageContainer from '../../../components/PageContainer/PageContainer';
import TabsNav from '../../../components/TabsNav/TabsNav';
import ActionButton from '../../../components/ActionButton/ActionButton';
import AttendeesTable from '../../../components/Table/Table';
import styles from './EventDetails.module.scss';

const headers = ['Name', 'Email', 'Attended', 'Active'];

const rows = [
  {
    name: 'Juan Estrada 1',
    email: 'jsestrada@uninorte.edu.co',
    attended: 'No',
    active: 'Yes',
  },
  {
    name: 'Juan Estrada 2',
    email: 'jsestrada@uninorte.edu.co',
    attended: 'No',
    active: 'Yes',
  },
  {
    name: 'Juan Estrada 3',
    email: 'jsestrada@uninorte.edu.co',
    attended: 'No',
    active: 'Yes',
  },
  {
    name: 'Juan Estrada 4',
    email: 'jsestrada@uninorte.edu.co',
    attended: 'No',
    active: 'Yes',
  },
  {
    name: 'Juan Estrada 5',
    email: 'jsestrada@uninorte.edu.co',
    attended: 'No',
    active: 'Yes',
  },


];

function EventDetails() {
  const history = useHistory();
  const onRowClick = (row) => {

  };
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
        <AttendeesTable rows={rows} headers={headers} onRowClick={onRowClick} />
      </Box>
    </PageContainer>
  );
}

EventDetails.propTypes = {

};

export default EventDetails;
