import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';

const mapTypeToDialogContent = {
  save: {
    title: 'Save changes',
    description: 'Are you sure you want to save these changes?',
  },
  delete: {
    title: 'Delete guests',
    description: 'Are you sure you want to delete these guests?',
  },
  send: {
    title: 'Send invitations',
    description: 'Are you sure you want to send invitations to these guests?',
  },
};

export default function ConfirmationDialog({ openDialog, handleCloseDialog, dialogType }) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('xs'));

  if (!dialogType) return null;
  return (
    <div>
      <Dialog
        fullScreen={fullScreen}
        open={openDialog}
        onClose={handleCloseDialog}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          {mapTypeToDialogContent[dialogType].title}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            {mapTypeToDialogContent[dialogType].description}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={() => handleCloseDialog(dialogType)} color="primary">
            Disagree
          </Button>
          <Button onClick={() => handleCloseDialog(dialogType)} color="primary" autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

ConfirmationDialog.propTypes = {
  openDialog: PropTypes.bool.isRequired,
  handleCloseDialog: PropTypes.func.isRequired,
  dialogType: PropTypes.string.isRequired,
};
