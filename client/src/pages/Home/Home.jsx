import React from 'react';

import {
  Box, Typography,
} from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { useQuery } from '@apollo/react-hooks';
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';
import PageContainer from '../../components/PageContainer/PageContainer';
import ActionButton from '../../components/ActionButton/ActionButton';
import Table from '../../components/Table/Table';
import styles from './Home.module.scss';

const headers = ['Event', 'Location', 'Start Date', 'End Date', 'Active'];

const rows = [
  {
    event: 'Cátedra Europa',
    location: 'Universidad del Norte',
    startDate: 'February 4th, 2019 12:30 PM',
    endDate: 'February 4th, 2019 2:30 PM',
    active: 'Yes',
  },


];

function Home() {
  const history = useHistory();

  const onRowClick = (row) => {

  };
  return (
    <PageContainer
      title="My events"
      action={() => (
        <ActionButton
          title="Create event"
          onClick={() => {
            history.push('/events/123123/guests');
          }}
        >
          <AddCircleOutlineOutlinedIcon />
        </ActionButton>
      )}
    >
      <Box className={styles.wrapper}>
        <Table headers={headers} rows={rows} onRowClick={onRowClick} />
      </Box>
    </PageContainer>
  );
}

Home.propTypes = {

};

export default Home;
