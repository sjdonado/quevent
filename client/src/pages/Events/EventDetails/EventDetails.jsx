import React, { useEffect, useState } from 'react';

import {
  Box, Typography, TableRow, TableCell,
} from '@material-ui/core';
import Slide from '@material-ui/core/Slide';
import ReactRouterPropTypes from 'react-router-prop-types';
import { useHistory } from 'react-router-dom';
import PersonAddOutlinedIcon from '@material-ui/icons/PersonAddOutlined';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import CropFreeIcon from '@material-ui/icons/CropFree';
import DeleteForeverOutlinedIcon from '@material-ui/icons/DeleteForeverOutlined';
import { useQuery, useMutation } from 'react-apollo';
import PageContainer from '../../../components/PageContainer/PageContainer';
import TabsNav from '../../../components/TabsNav/TabsNav';
import ActionButton from '../../../components/ActionButton/ActionButton';
import AttendeesTable from '../../../components/Table/Table';
import GuestsRow from './EventDetailsGuestsRow/EventDetailsGuestsRow';
import styles from './EventDetails.module.scss';
import Progress from '../../../components/Progress/Progress';
import Snackbar from '../../../components/Snackbar/Snackbar';
import { GET_ATTENDEES_QUERY } from '../../../graphql/queries';
import { SEND_INVITATIONS_MUTATION } from '../../../graphql/mutations';


function EventDetails({ match, location }) {
  const [snackbarMsg, setSnackbarMsg] = useState(null);
  const [isEditting, setIsEditting] = useState(false);
  const [headers, setHeaders] = useState(['Email', 'Invited', 'Attended', 'Active']);
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

  const handleReset = (row) => {

  };
  return (
    <PageContainer
      title="Event details"
      backButton="/home"
      action={() => (
        <>
          {isEditting ? (
            <Slide direction="right" in={isEditting} mountOnEnter unmountOnExit exit>
              <div>
                <ActionButton
                  title="Send invitations"
                  onClick={handleSendInvitations}
                >
                  <MailOutlineIcon />
                </ActionButton>
                <ActionButton
                  title="Delete selected"
                >
                  <DeleteForeverOutlinedIcon />
                </ActionButton>
              </div>
            </Slide>
          ) : (
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


        </>
      )}
    >
      <Box className={styles.wrapper}>
        <TabsNav />

        {loading ? (<Progress type="circular" />) : (
          <Box className={styles.table}>
            {isEditting ? (
              <div className={styles.edit}>
                <Typography
                  color="primary"
                  onClick={() => {
                    setIsEditting(false);
                    setHeaders(['Email', 'Invited', 'Attended', 'Active']);
                  }}
                  className={styles.editAction}
                  variant="body2"
                >
                  Cancel
                </Typography>
                <Typography
                  color="primary"
                  onClick={() => {
                    setIsEditting(false);
                    setHeaders(['Email', 'Invited', 'Attended', 'Active']);
                  }}
                  className={styles.editAction}
                  variant="body2"
                >
                  Save
                </Typography>
              </div>
            ) : (
              <Typography
                color="primary"
                onClick={() => {
                  setIsEditting(true);
                  setHeaders(['', 'Email', 'Invited', 'Attended', 'Active']);
                }}
                className={styles.editAction}
                variant="body2"
              >
              Edit
              </Typography>
            )}
            <AttendeesTable headers={headers}>
              {data.getEvent.attendance.map((row) => (
                <GuestsRow
                  className={styles.row}
                  key={row.id}
                  row={row}
                  isEditting={isEditting}
                />
              ))}
            </AttendeesTable>
          </Box>
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
