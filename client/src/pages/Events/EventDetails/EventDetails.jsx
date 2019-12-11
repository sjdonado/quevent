import React, { useEffect, useState } from 'react';

import {
  Box, Typography, Button,
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
import ConfirmationDialog from './ConfirmationDialog/ConfirmationDialog';
import { GET_ATTENDEES_QUERY } from '../../../graphql/queries';
import { SEND_INVITATIONS_MUTATION, UPDATE_ATTENDEES_MUTATION } from '../../../graphql/mutations';


const headers = ['Email', 'Invited', 'Attended', 'Active'];


function EventDetails({ match, location }) {
  const [currentFilter, setCurrentFilter] = useState(0);
  const [snackbarMsg, setSnackbarMsg] = useState(null);
  const [isEditting, setIsEditting] = useState(false);
  const [saveChanges, setSaveChanges] = useState(false);
  const [isActiveStateChanged, setIsActiveStateChanged] = useState(false);
  const [rows, setRows] = useState([]);
  const [numberOfCheckedRows, setNumberOfCheckedRows] = useState(0);
  const [isAllChecked, setIsAllChecked] = useState(false);
  const [openDialog, setOpenDialog] = React.useState(false);
  const [dialogType, setDialogType] = useState('');
  const history = useHistory();
  const { loading, error, data } = useQuery(GET_ATTENDEES_QUERY, {
    variables: {
      eventId: match.params.id,
    },
  });
  const [sendInvitationsMutation] = useMutation(SEND_INVITATIONS_MUTATION);
  const [updateAttendeesMutation] = useMutation(UPDATE_ATTENDEES_MUTATION);


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
    if (rows.length > 0 && numberOfCheckedRows === rows.length) {
      setIsAllChecked(true);
    } else {
      setIsAllChecked(false);
    }
  }, [numberOfCheckedRows, rows]);

  const handleFilteredRows = () => {
    let filteredRows;
    switch (currentFilter) {
      case 0:
        setRows(data.getEvent.attendance);
        break;
      case 1:
        filteredRows = data.getEvent.attendance.filter((row) => row.attended);
        setRows(filteredRows);
        break;
      case 2:
        filteredRows = data.getEvent.attendance.filter((row) => !row.attended);
        setRows(filteredRows);
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    if (!loading) {
      handleFilteredRows();
    }
  }, [currentFilter]);


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


  const handleOpenDialog = (type) => {
    setDialogType(type);
    setOpenDialog(true);
  };

  const handleSendInvitations = async () => {
    try {
      const checkedRows = rows.filter((row) => row.checked);
      const { res } = await sendInvitationsMutation({
        variables: {
          eventId: match.params.id,
        },
      });
      setSnackbarMsg('Success! You have invited the attendees correctly.');
      setIsEditting(false);
    } catch (err) {
      setSnackbarMsg(err);
    }
  };

  const handleSaveChanges = async (updatedRow) => {
    try {
      const { res } = await updateAttendeesMutation({
        variables: {
          eventId: match.params.id,
          attendees: JSON.stringify(rows),
        },
      });
      setSnackbarMsg('Success! You have updated the attendees list correctly.');
      setIsEditting(false);
    } catch (err) {
      setSnackbarMsg(err);
    }
  };

  const handleDeleteGuest = async () => {
    try {
      const checkedRows = rows.filter((row) => !row.checked);
      const { res } = await updateAttendeesMutation({
        variables: {
          eventId: match.params.id,
          attendees: JSON.stringify(checkedRows),
        },
      });
      setRows(checkedRows);
      setSnackbarMsg('Success! You have deleted the attendees correctly.');
      setIsEditting(false);
    } catch (err) {
      setSnackbarMsg(err);
    }
  };
  const handleCloseDialog = (type) => {
    switch (type) {
      case 'save':
        handleSaveChanges();
        break;
      case 'send':
        handleSendInvitations();
        break;
      case 'delete':
        handleDeleteGuest();
        break;
      default:
        break;
    }
    setOpenDialog(false);
  };

  const handleTabChange = (event, newValue) => {
    setCurrentFilter(newValue);
  };

  const handleActiveCheckboxChange = (active, rowId) => {
    const updatedRows = rows.map((row) => {
      if (row.id === rowId) {
        return { ...row, active };
      }
      return row;
    });
    setIsActiveStateChanged(true);
    setRows(updatedRows);
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
        <TabsNav
          handleTabChange={handleTabChange}
          currentFilter={currentFilter}
        />

        {loading ? (<Progress type="circular" />) : (
          <Box className={styles.table}>
            {isEditting ? (
              <>
                <div className={styles.edit}>
                  <div className={styles.editActions}>
                    <Button
                      color="primary"
                      onClick={() => {
                        setIsEditting(false);
                        handleFilteredRows();
                        setNumberOfCheckedRows(0);
                      }}
                      className={styles.editAction}
                    >
                  Cancel
                    </Button>
                    <Button
                      color="primary"
                      onClick={() => { handleOpenDialog('save'); }}
                      disabled={!isActiveStateChanged}
                      className={styles.editAction}
                    >
                  Save
                    </Button>
                  </div>

                  <Slide direction="right" in={isEditting} mountOnEnter unmountOnExit exit>
                    <div>
                      <ActionButton
                        disabled={!(numberOfCheckedRows > 0)}
                        title="Send invitations"
                        onClick={() => { handleOpenDialog('send'); }}
                      >
                        <MailOutlineIcon />
                      </ActionButton>
                      <ActionButton
                        disabled={!(numberOfCheckedRows > 0)}
                        title="Delete selected"
                        onClick={() => { handleOpenDialog('delete'); }}
                      >
                        <DeleteForeverOutlinedIcon />
                      </ActionButton>
                    </div>
                  </Slide>
                </div>

              </>
            ) : (
              <Button
                color="primary"
                onClick={() => {
                  setIsEditting(true);
                }}
                className={styles.editAction}
              >
              Edit
              </Button>
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
                  handleActiveCheckboxChange={handleActiveCheckboxChange}
                  handleCheck={handleCheck}
                  handleSaveChanges={handleSaveChanges}
                  saveChanges={saveChanges}
                  isEditting={isEditting}
                />
              ))}
            </AttendeesTable>
          </Box>
        )}
        <ConfirmationDialog
          openDialog={openDialog}
          handleCloseDialog={handleCloseDialog}
          dialogType={dialogType}
        />
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
