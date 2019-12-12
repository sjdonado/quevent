import React, { useState, useEffect } from 'react';

import {
  Box, Typography, Button,
} from '@material-ui/core';
import Slide from '@material-ui/core/Slide';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { useHistory } from 'react-router-dom';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import DeleteForeverOutlinedIcon from '@material-ui/icons/DeleteForeverOutlined';
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';
import PageContainer from '../../../components/PageContainer/PageContainer';
import ActionButton from '../../../components/ActionButton/ActionButton';
import Progress from '../../../components/Progress/Progress';
import Table from '../../../components/Table/Table';
import Modal from '../../../components/Modal/Modal';
import EventRow from '../../Home/EventRow/EventRow';
import styles from './EventContainer.module.scss';
import { GET_EVENTS_QUERY } from '../../../graphql/queries';
import { UPDATE_EVENTS_MUTATION } from '../../../graphql/mutations';
import Snackbar from '../../../components/Snackbar/Snackbar';
import ConfirmationDialog from '../EventDetails/ConfirmationDialog/ConfirmationDialog';
import EditToolbar from '../../../components/EditToolbar/EditToolbar';
import { useCheckBox } from '../../../hooks/useCheckbox';


const headers = ['Event', 'Location', 'Start Date', 'End Date', 'Active'];


function Home() {
  const [rows, setRows] = useState([]);
  const [snackbarMsg, setSnackbarMsg] = useState(null);
  const [openDialog, setOpenDialog] = React.useState(false);
  const [dialogType, setDialogType] = useState('');
  const {
    loading, error, data, refetch,
  } = useQuery(GET_EVENTS_QUERY);
  const history = useHistory();
  const [openModal, setOpenModal] = React.useState(false);

  const [updateEventsMutation] = useMutation(UPDATE_EVENTS_MUTATION);


  const {
    handleActiveCheckboxChange, handleCheck,
    handleReset, handleCheckAll,
    isActiveStateChanged, isAllChecked,
    isEditting, setIsEditting,
    numberOfCheckedRows,
  } = useCheckBox(data, loading, rows, setRows);


  const handleClickOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = (submit) => {
    if (submit) {
      refetch();
      setSnackbarMsg('Success! You have created a new event.');
    }
    setOpenModal(false);
  };

  const onRowClick = (row) => {
    history.push(`/events/${row.id}`);
  };

  const handleDeleteEvents = async () => {
    try {
      const checkedRows = rows.filter((row) => !row.checked);
      const { res } = await updateEventsMutation({
        variables: {
          events: JSON.stringify(checkedRows),
        },
      });
      refetch();
      setRows(checkedRows);
      setSnackbarMsg('Success! You have deleted the events correctly.');
      setIsEditting(false);
    } catch (err) {
      console.log(err);
    }
  };

  const handleSaveChanges = async () => {
    try {
      const { res } = await updateEventsMutation({
        variables: {
          events: JSON.stringify(rows),
        },
      });
      refetch();
      setSnackbarMsg('Success! You have updated the attendees list correctly.');
      setIsEditting(false);
    } catch (err) {
      setSnackbarMsg(err);
    }
  };

  const handleOpenDialog = (type) => {
    setDialogType(type);
    setOpenDialog(true);
  };

  const handleCloseDialog = (type) => {
    switch (type) {
      case 'save':
        handleSaveChanges();
        break;
      case 'delete':
        handleDeleteEvents();
        break;
      default:
        break;
    }
    setOpenDialog(false);
  };


  return (
    <PageContainer
      title="My events"
      action={() => (
        <ActionButton
          title="Create event"
          onClick={() => {
            handleClickOpenModal();
          }}
        >
          <AddCircleOutlineOutlinedIcon />
        </ActionButton>
      )}
    >
      <Modal open={openModal} handleClickOpen={handleClickOpenModal} handleClose={handleCloseModal} />
      {loading ? (<Progress type="circular" />) : (
        <Box className={styles.table}>
          <EditToolbar
            isEditting={isEditting}
            setIsEditting={setIsEditting}
            handleReset={handleReset}
            setDialogType={setDialogType}
            setOpenDialog={setOpenDialog}
            isActiveStateChanged={isActiveStateChanged}
          >
            <ActionButton
              title="Delete selected"
              disabled={!(numberOfCheckedRows > 0)}
              onClick={() => { handleOpenDialog('delete'); }}
            >
              <DeleteForeverOutlinedIcon />
            </ActionButton>
          </EditToolbar>
          <Table
            headers={headers}
            isEditting={isEditting}
            isAllChecked={isAllChecked}
            handleCheckAll={handleCheckAll}
          >
            {rows.map((row) => (
              <EventRow
                className={styles.row}
                key={row.id}
                row={row}
                onRowClick={onRowClick}
                handleActiveCheckboxChange={handleActiveCheckboxChange}
                handleCheck={handleCheck}
                isEditting={isEditting}
              />
            ))}
          </Table>
          <ConfirmationDialog
            openDialog={openDialog}
            handleCloseDialog={handleCloseDialog}
            dialogType={dialogType}
          />
          <Snackbar message={snackbarMsg} setMessage={setSnackbarMsg} />
        </Box>
      )}
    </PageContainer>
  );
}

Home.propTypes = {

};

export default Home;
