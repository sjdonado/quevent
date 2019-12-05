import React from 'react';

import {
  Box, Typography, TableRow, TableCell,
} from '@material-ui/core';
import ReactRouterPropTypes from 'react-router-prop-types';
import { useHistory } from 'react-router-dom';
import PersonAddOutlinedIcon from '@material-ui/icons/PersonAddOutlined';
import CropFreeIcon from '@material-ui/icons/CropFree';
import moment from 'moment';
import { useQuery } from 'react-apollo';
import PageContainer from '../../../components/PageContainer/PageContainer';
import TabsNav from '../../../components/TabsNav/TabsNav';
import ActionButton from '../../../components/ActionButton/ActionButton';
import AttendeesTable from '../../../components/Table/Table';
import styles from './EventDetails.module.scss';
import Progress from '../../../components/Progress/Progress';
import { GET_ATTENDEES_QUERY } from '../../../graphql/queries';

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

function EventDetails({ match }) {
  const history = useHistory();
  const { loading, error, data } = useQuery(GET_ATTENDEES_QUERY, {
    variables: {
      eventId: match.params.id,
    },
  });

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

        {loading ? (<Progress type="circular" />) : (
          <AttendeesTable rows={rows} headers={headers} onRowClick={onRowClick}>
            {data.getEvent.attendance.map((row) => (
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
          </AttendeesTable>
        )}


      </Box>
    </PageContainer>
  );
}

EventDetails.propTypes = {
  match: ReactRouterPropTypes.match.isRequired,
};

export default EventDetails;
