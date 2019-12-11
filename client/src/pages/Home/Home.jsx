import React, { useState, useEffect } from 'react';

import {
  Box, Typography, Button,
} from '@material-ui/core';
import Slide from '@material-ui/core/Slide';
import { useQuery } from '@apollo/react-hooks';
import { useHistory } from 'react-router-dom';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import DeleteForeverOutlinedIcon from '@material-ui/icons/DeleteForeverOutlined';
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';
import PageContainer from '../../components/PageContainer/PageContainer';
import ActionButton from '../../components/ActionButton/ActionButton';
import Progress from '../../components/Progress/Progress';
import Table from '../../components/Table/Table';
import Modal from '../../components/Modal/Modal';
import EventRow from './EventRow/EventRow';
import styles from './Home.module.scss';
import { GET_EVENTS_QUERY } from '../../graphql/queries';

const headers = ['Event', 'Location', 'Start Date', 'End Date', 'Active'];


function Home() {
  const [rows, setRows] = useState([]);
  const [isEditting, setIsEditting] = useState(false);
  const [isAllChecked, setIsAllChecked] = useState(false);
  const [isActiveStateChanged, setIsActiveStateChanged] = useState(false);
  const [openDialog, setOpenDialog] = React.useState(false);
  const [dialogType, setDialogType] = useState('');
  const [numberOfCheckedRows, setNumberOfCheckedRows] = useState(0);
  const { loading, error, data } = useQuery(GET_EVENTS_QUERY);
  const history = useHistory();
  const [open, setOpen] = React.useState(false);

  useEffect(() => {
    if (!loading) {
      setRows(data.getUser.events);
    }
  }, [loading]);

  useEffect(() => {
    if (numberOfCheckedRows === rows.length) {
      setIsAllChecked(true);
    } else {
      setIsAllChecked(false);
    }
  }, [numberOfCheckedRows, rows]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const onRowClick = (row) => {
    history.push(`/events/${row.id}`);
  };

  const handleOpenDialog = (type) => {
    setDialogType(type);
    setOpenDialog(true);
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
      {loading ? (<Progress type="circular" />) : (
        <Box className={styles.table}>
          {isEditting ? (
            <>
              <div className={styles.edit}>
                <div className={styles.editActions}>
                  <Button
                    color="primary"
                    onClick={() => {
                      setIsActiveStateChanged(false);
                      setIsEditting(false);
                      setRows(data.getUser.events);
                      setNumberOfCheckedRows(0);
                    }}
                    className={styles.editAction}
                  >
                  Cancel
                  </Button>
                  <Button
                    color="primary"
                    disabled={!isActiveStateChanged}
                    onClick={() => { handleOpenDialog('save'); }}
                    className={styles.editAction}
                  >
                  Save
                  </Button>
                </div>

                <Slide direction="right" in={isEditting} mountOnEnter unmountOnExit exit>
                  <div>
                    <ActionButton
                      title="Send invitations"
                      disabled={!(numberOfCheckedRows === 1)}
                      onClick={() => { handleOpenDialog('send'); }}
                    >
                      <EditOutlinedIcon />
                    </ActionButton>
                    <ActionButton
                      title="Delete selected"
                      disabled={!(numberOfCheckedRows > 0)}
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
        </Box>
      )}
    </PageContainer>
  );
}

Home.propTypes = {

};

export default Home;
