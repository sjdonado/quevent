import { useState } from 'react';
// eslint-disable-next-line import/prefer-default-export
export const useRowAction = (rows, setRows, refetch, updateEventsMutation, setIsEditting) => {
  const [snackbarMsg, setSnackbarMsg] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogType, setDialogType] = useState('');
  const [openModal, setOpenModal] = useState(false);

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
  return ({
    handleCloseDialog,
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
  });
};
