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

const headers = ['Email', 'Invited', 'Attended', 'Active'];

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
              history.push(`/events/${match.params.id}/qrreader`);
            }}
          >
            <CropFreeIcon />
          </ActionButton>
          <ActionButton
            title="Add a guest"
            onClick={() => {
              history.push(`/events/${match.params.id}/guests`);
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
          <AttendeesTable headers={headers} onRowClick={onRowClick}>
            {data.getEvent.attendance.map((row) => (
              <TableRow className={styles.row} key={row.id} onClick={() => onRowClick(row)}>
                <TableCell align="center">
                  {row.email}
                </TableCell>
                <TableCell align="center">
                  {row.invited ? 'Yes' : 'No'}
                </TableCell>
                <TableCell align="center">
                  {row.attended ? 'Yes' : 'No'}
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
