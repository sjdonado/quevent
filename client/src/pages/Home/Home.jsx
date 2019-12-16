import React, { useState, useEffect } from 'react';

import { useHistory } from 'react-router-dom';
import {
  Box,
} from '@material-ui/core';
import { useQuery, useMutation } from '@apollo/react-hooks';

import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
import DeleteForeverOutlinedIcon from '@material-ui/icons/DeleteForeverOutlined';
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';
import PageContainer from '../../components/PageContainer/PageContainer';
import ActionButton from '../../components/ActionButton/ActionButton';
import Progress from '../../components/Progress/Progress';
import Table from '../../components/Table/Table';
import CreateEventModal from '../../components/CreateEventModal/CreateEventModal';
import EventRow from './EventRow/EventRow';
import styles from './Home.module.scss';
import { GET_EVENTS_QUERY } from '../../graphql/queries';
import { UPDATE_EVENTS_MUTATION } from '../../graphql/mutations';
import Snackbar from '../../components/Snackbar/Snackbar';
import ConfirmationDialog from '../Events/EventDetails/ConfirmationDialog/ConfirmationDialog';
import { useCheckBox } from '../../hooks/useCheckbox';
import { useRowAction } from '../../hooks/useRowAction';
import EditToolbar from '../../components/EditToolbar/EditToolbar';

const headers = ['Event', 'Location', 'Start Date', 'End Date', 'Active'];


function Home() {
  const [rows, setRows] = useState([]);
  const history = useHistory();

  const {
    loading,
    error,
    data,
    refetch,
  } = useQuery(GET_EVENTS_QUERY);
  const [updateEventsMutation] = useMutation(UPDATE_EVENTS_MUTATION);

  const {
    handleActiveCheckboxChange, handleCheck,
    handleReset, handleCheckAll,
    isActiveStateChanged, isAllChecked,
    isEditting, setIsEditting,
    numberOfCheckedRows,
  } = useCheckBox(rows, setRows);

  const {
    handleSaveChanges,
    handleDelete,
    handleOpenDialog,
    handleClickOpenModal,
    handleCloseModal,
    snackbarMsg,
    openDialog,
    dialogType,
    openModal,
    setDialogType,
    setSnackbarMsg,
    setOpenDialog,
  } = useRowAction(refetch, setIsEditting);

  useEffect(() => {
    if (!loading) {
      setRows(data.getUser.events);
    }
  }, [loading, data]);

  const onRowClick = (row) => {
    history.push(`/events/${row._id}`);
  };

  const handleCloseDialog = (type) => {
    let checkedRows;
    switch (type) {
      case 'save':
        handleSaveChanges(updateEventsMutation, {
          events: JSON.stringify(rows),
        });
        break;
      case 'delete':
        checkedRows = rows.filter((row) => !row.checked);
        handleDelete(updateEventsMutation, {
          events: JSON.stringify(checkedRows),
        });
        break;
      default:
        break;
    }
    setOpenDialog(false);
  };

  return (
    <MuiPickersUtilsProvider utils={MomentUtils}>
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
        {loading ? (<Progress type="circular" />) : (
          <Box className={styles.table}>
            <EditToolbar
              isEditting={isEditting}
              setIsEditting={setIsEditting}
              handleReset={() => { handleReset(data.getUser.events); }}
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
                  key={row._id}
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
        <CreateEventModal
          open={openModal}
          handleClickOpen={handleClickOpenModal}
          handleClose={handleCloseModal}
        />
      </PageContainer>
    </MuiPickersUtilsProvider>
  );
}

export default Home;
