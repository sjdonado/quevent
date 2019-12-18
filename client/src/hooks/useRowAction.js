import { useState } from 'react';
// eslint-disable-next-line import/prefer-default-export
export const useRowAction = (refetch, setIsEditting) => {
  const [snackbarMsg, setSnackbarMsg] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogType, setDialogType] = useState('');
  const [openModal, setOpenModal] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleClickOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = (submit) => {
    if (submit) {
      refetch();
      setSnackbarMsg('Success!');
    }
    setOpenModal(false);
  };

  const handleDelete = async (mutation, variables) => {
    try {
      setSubmitting(true);
      await mutation({ variables });
      refetch();
      setSnackbarMsg('Success! You have deleted the events correctly.');
      setIsEditting(false);
    } catch (err) {
      setSnackbarMsg(`Error: ${err.message.substring(15)}`);
    }
    setSubmitting(false);
  };

  const handleSaveChanges = async (mutation, variables) => {
    try {
      setSubmitting(true);
      await mutation({ variables });
      refetch();
      setSnackbarMsg('Success! You have updated the attendees list correctly.');
      setIsEditting(false);
    } catch (err) {
      setSnackbarMsg(`Error: ${err.message.substring(15)}`);
    }
    setSubmitting(false);
  };


  const handleSendInvitations = async (mutation, variables) => {
    try {
      setSubmitting(true);
      await mutation({ variables });
      refetch();
      setSnackbarMsg('Success! You have invited the attendees correctly.');
      setIsEditting(false);
    } catch (err) {
      setSnackbarMsg(`Error: ${err.message.substring(15)}`);
    }
    setSubmitting(false);
  };

  const handleOpenDialog = (type) => {
    setDialogType(type);
    setOpenDialog(true);
  };

  return ({
    handleSendInvitations,
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
    submitting,
  });
};
