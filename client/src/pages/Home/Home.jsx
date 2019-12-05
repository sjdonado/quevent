import React from 'react';

import {
  Box,
} from '@material-ui/core';
import { useQuery } from '@apollo/react-hooks';
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';
import PageContainer from '../../components/PageContainer/PageContainer';
import ActionButton from '../../components/ActionButton/ActionButton';
import Table from '../../components/Table/Table';
import Modal from '../../components/Modal/Modal';
import styles from './Home.module.scss';
import { GET_EVENTS_QUERY } from '../../graphql/queries';

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
  const { loading } = useQuery(GET_EVENTS_QUERY);
  if (!loading) {

  }
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const onRowClick = () => {

  };
  return (
    <PageContainer
      title="My events"
      action={() => (
        <ActionButton
          title="Create event"
          onClick={() => {
            handleClickOpen();
          }}
        >
          <AddCircleOutlineOutlinedIcon />
        </ActionButton>
      )}
    >
      <Modal open={open} handleClickOpen={handleClickOpen} handleClose={handleClose} />
      <Box className={styles.wrapper}>
        <Table headers={headers} rows={rows} onRowClick={onRowClick} />
      </Box>
    </PageContainer>
  );
}

Home.propTypes = {

};

export default Home;
