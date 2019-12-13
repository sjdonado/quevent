import React, { useEffect, useState } from 'react';

import {
  Box, Menu, MenuItem,
} from '@material-ui/core';
import ReactRouterPropTypes from 'react-router-prop-types';
import { useHistory } from 'react-router-dom';
import PersonAddOutlinedIcon from '@material-ui/icons/PersonAddOutlined';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import CropFreeIcon from '@material-ui/icons/CropFree';
import MoreIcon from '@material-ui/icons/MoreVert';
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
import EditToolbar from '../../../components/EditToolbar/EditToolbar';
import { useCheckBox } from '../../../hooks/useCheckbox';
import { useRowAction } from '../../../hooks/useRowAction';


const headers = ['Email', 'Invited', 'Attended', 'Active'];


function EventDetails({ match, location }) {
  const [currentFilter, setCurrentFilter] = useState(0);
  const [rows, setRows] = useState([]);
  const history = useHistory();
  const {
    loading, error, data, refetch,
  } = useQuery(GET_ATTENDEES_QUERY, {
    variables: {
      eventId: match.params.id,
    },
  });
  const [sendInvitationsMutation] = useMutation(SEND_INVITATIONS_MUTATION);
  const [updateAttendeesMutation] = useMutation(UPDATE_ATTENDEES_MUTATION);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);


  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const {
    handleActiveCheckboxChange, handleCheck,
    handleReset, handleCheckAll,
    isActiveStateChanged, isAllChecked,
    isEditting, setIsEditting,
    numberOfCheckedRows,
  } = useCheckBox(rows, setRows);
  const {
    handleSendInvitations,
    handleSaveChanges,
    handleDelete,
    handleOpenDialog,
    snackbarMsg,
    openDialog,
    dialogType,
    setDialogType,
    setSnackbarMsg,
    setOpenDialog,
  } = useRowAction(refetch, setIsEditting);

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


  const handleFilteredRows = () => {
    let filteredRows;
    switch (currentFilter) {
      case 0:
        filteredRows = [...rows];
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
    return filteredRows;
  };

  useEffect(() => {
    if (!loading) {
      handleFilteredRows();
    }
  }, [currentFilter]);

  const handleCloseDialog = (type) => {
    let checkedRows;
    switch (type) {
      case 'save':
        handleSaveChanges(updateAttendeesMutation, {
          eventId: match.params.id,
          attendees: JSON.stringify(rows),
        });
        break;
      case 'send':
        handleSendInvitations(sendInvitationsMutation, {
          eventId: match.params.id,
        });
        break;
      case 'delete':
        checkedRows = rows.filter((row) => !row.checked);
        handleDelete(updateAttendeesMutation, {
          eventId: match.params.id,
          attendees: JSON.stringify(checkedRows),
        });
        break;
      default:
        break;
    }
    setOpenDialog(false);
  };

  const handleTabChange = (event, newValue) => {
    setCurrentFilter(newValue);
  };

  return (
    <PageContainer
      title="Event details"
      backButton="/home"
      action={() => (
        <>

          <div className={styles['btn-lg-screen']}>
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
          </div>
          <div className={styles['btn-xs-screen']}>
            <ActionButton
              title="More options"
              onClick={handleMenu}
            >
              <MoreIcon />
            </ActionButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={open}
              onClose={handleClose}
            >
              <MenuItem onClick={() => {
                history.push(`/events/${match.params.id}/qrreader`);
              }}
              >
                QR Reader
              </MenuItem>
              <MenuItem onClick={() => {
                history.push(`/events/${match.params.id}/guests`);
              }}
              >
                Add Guests
              </MenuItem>
            </Menu>
          </div>

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
            <EditToolbar
              isEditting={isEditting}
              setIsEditting={setIsEditting}
              handleReset={() => { handleReset(handleFilteredRows()); }}
              setDialogType={setDialogType}
              setOpenDialog={setOpenDialog}
              isActiveStateChanged={isActiveStateChanged}
              options={() => (
                <ActionButton
                  title="Send invitations"
                  onClick={() => { handleOpenDialog('send'); }}
                >
                  <MailOutlineIcon />
                </ActionButton>
              )}
            >
              <ActionButton
                title="Delete selected"
                disabled={!(numberOfCheckedRows > 0)}
                onClick={() => { handleOpenDialog('delete'); }}
              >
                <DeleteForeverOutlinedIcon />
              </ActionButton>
            </EditToolbar>
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
