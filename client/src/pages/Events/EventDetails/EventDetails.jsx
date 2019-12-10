import React, { useEffect, useState } from 'react';

import {
  Box, Typography,
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


const headers = ['Email', 'Invited', 'Attended', 'Active'];


function EventDetails({ match, location }) {
  const [snackbarMsg, setSnackbarMsg] = useState(null);
  const [isEditting, setIsEditting] = useState(false);
  const [saveChanges, setSaveChanges] = useState(false);
  const [changes, setChanges] = useState([]);
  const [rows, setRows] = useState([]);
  const [numberOfCheckedRows, setNumberOfCheckedRows] = useState(0);
  const [isAllChecked, setIsAllChecked] = useState(false);
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

  useEffect(() => {
    if (!loading) {
      setRows(data.getEvent.attendance);
    }
  }, [loading]);

  useEffect(() => {
    if (numberOfCheckedRows === rows.length) {
      setIsAllChecked(true);
    } else {
      setIsAllChecked(false);
    }
  }, [numberOfCheckedRows, rows]);

  const handleSendInvitations = async () => {
    try {
      const { res } = await sendInvitationsMutation({
        variables: {
          eventId: match.params.id,
        },
      });
    } catch (err) {
      setSnackbarMsg(err);
    }
  };

  const handleSaveChanges = (updatedRow) => {
    setChanges([...changes, updatedRow]);
  };

  const handleCheckAll = (checked) => {
    const allRowsChecked = rows.map((row) => ({ ...row, checked }));
    setRows(allRowsChecked);
    setNumberOfCheckedRows(checked ? rows.length : 0);
  };

  const handleCheck = (checked, rowId) => {
    const updatedRows = rows.map((row) => {
      if (row.id === rowId) {
        return { ...row, checked };
      }
      return row;
    });
    setRows(updatedRows);
    setNumberOfCheckedRows(checked ? numberOfCheckedRows + 1 : numberOfCheckedRows - 1);
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
          <Box className={styles.table}>
            {isEditting ? (
              <>
                <div className={styles.edit}>
                  <div className={styles.editActions}>
                    <Typography
                      color="primary"
                      onClick={() => {
                        setIsEditting(false);
                        setRows(data.getEvent.attendance);
                        setNumberOfCheckedRows(0);
                      }}
                      className={styles.editAction}
                      variant="body2"
                    >
                  Cancel
                    </Typography>
                    <Typography
                      color="primary"
                      onClick={() => {
                        setSaveChanges(true);
                      }}
                      className={styles.editAction}
                      variant="body2"
                    >
                  Save
                    </Typography>
                  </div>

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
                </div>

              </>
            ) : (
              <Typography
                color="primary"
                onClick={() => {
                  setIsEditting(true);
                }}
                className={styles.editAction}
                variant="body2"
              >
              Edit
              </Typography>
            )}
            <AttendeesTable
              headers={headers}
              isEditting={isEditting}
              isAllChecked={isAllChecked}
              handleCheckAll={handleCheckAll}
            >
              {rows.map((row) => (
                <GuestsRow
                  className={styles.row}
                  key={row.id}
                  row={row}
                  handleCheck={handleCheck}
                  handleSaveChanges={handleSaveChanges}
                  saveChanges={saveChanges}
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
