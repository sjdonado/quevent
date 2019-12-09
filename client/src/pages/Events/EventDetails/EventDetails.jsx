import React, { useEffect, useState } from 'react';

import {
  Box, Typography, TableRow, TableCell,
} from '@material-ui/core';
import ReactRouterPropTypes from 'react-router-prop-types';
import { useHistory } from 'react-router-dom';
import PersonAddOutlinedIcon from '@material-ui/icons/PersonAddOutlined';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import CropFreeIcon from '@material-ui/icons/CropFree';
import { useQuery, useMutation } from 'react-apollo';
import PageContainer from '../../../components/PageContainer/PageContainer';
import TabsNav from '../../../components/TabsNav/TabsNav';
import ActionButton from '../../../components/ActionButton/ActionButton';
import AttendeesTable from '../../../components/Table/Table';
import styles from './EventDetails.module.scss';
import Progress from '../../../components/Progress/Progress';
import Snackbar from '../../../components/Snackbar/Snackbar';
import { GET_ATTENDEES_QUERY } from '../../../graphql/queries';
import { SEND_INVITATIONS_MUTATION } from '../../../graphql/mutations';


const headers = ['Email', 'Invited', 'Attended', 'Active'];

function EventDetails({ match, location }) {
  const [snackbarMsg, setSnackbarMsg] = useState(null);
  const history = useHistory();
  const { loading, error, data } = useQuery(GET_ATTENDEES_QUERY, {
    variables: {
      eventId: match.params.id,
    },
  });
  const [sendInvitationsMutation] = useMutation(SEND_INVITATIONS_MUTATION);

  useEffect(() => {
    history.replace();
    if (location.state && location.state.succesfulSubmit) {
      setSnackbarMsg('Success! You have updated the attendees list.');
    }
  }, []);

  const handleSendInvitations = async () => {
    try {
      const { res } = await sendInvitationsMutation({
        variables: {
          eventId: match.params.id,
        },
      });
      console.log(res);
    } catch (err) {
      setSnackbarMsg(err);
    }
  };

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
            title="Send invitations"
            onClick={handleSendInvitations}
          >
            <MailOutlineIcon />
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

        <Snackbar message={snackbarMsg} setMessage={setSnackbarMsg} />
      </Box>
    </PageContainer>
  );
}

EventDetails.propTypes = {
  match: ReactRouterPropTypes.match.isRequired,
  location: ReactRouterPropTypes.location.isRequired,
};

export default EventDetails;
