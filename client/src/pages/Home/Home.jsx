import React from 'react';

import {
  Box, TableRow, TableCell,
} from '@material-ui/core';
import { useQuery } from '@apollo/react-hooks';
import { useHistory } from 'react-router-dom';
import moment from 'moment';
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';
import PageContainer from '../../components/PageContainer/PageContainer';
import ActionButton from '../../components/ActionButton/ActionButton';
import Progress from '../../components/Progress/Progress';
import Table from '../../components/Table/Table';
import Modal from '../../components/Modal/Modal';
import styles from './Home.module.scss';
import { GET_EVENTS_QUERY } from '../../graphql/queries';

const headers = ['Event', 'Location', 'Start Date', 'End Date', 'Active'];


function Home() {
  const { loading, error, data } = useQuery(GET_EVENTS_QUERY);
  const history = useHistory();
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const onRowClick = (row) => {
    history.push(`/events/${row.id}`);
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
        {loading ? (<Progress type="circular" />) : (
          <Table headers={headers}>
            {data.getUser.events.map((row) => (
              <TableRow className={styles.row} key={row.id} onClick={() => onRowClick(row)}>
                <TableCell align="center">
                  {row.name}
                </TableCell>
                <TableCell align="center">
                  Universidad del Norte
                </TableCell>
                <TableCell align="center">
                  {moment(`${row.startDate}`, 'x').format('LLL')}
                </TableCell>
                <TableCell align="center">
                  {moment(`${row.endDate}`, 'x').format('LLL')}
                </TableCell>
                <TableCell align="center">
                  {row.active ? 'Yes' : 'No'}
                </TableCell>
              </TableRow>
            ))}
          </Table>
        )}
      </Box>
    </PageContainer>
  );
}

Home.propTypes = {

};

export default Home;
