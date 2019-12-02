import React from 'react';
import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/core/styles';
import MuiSnackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles((theme) => ({
  close: {
    padding: theme.spacing(0.5),
  },
}));

function Snackbar({ message, setMessage }) {
  const classes = useStyles();

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setMessage(null);
  };

  return (
    <div>
      <MuiSnackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        open={Boolean(message)}
        autoHideDuration={3000}
        onClose={handleClose}
        ContentProps={{
          'aria-describedby': 'message-id',
        }}
        message={<span id="message-id">{message}</span>}
        action={[
          <IconButton
            key="close"
            aria-label="close"
            color="inherit"
            className={classes.close}
            onClick={handleClose}
          >
            <CloseIcon />
          </IconButton>,
        ]}
      />
    </div>
  );
}

Snackbar.propTypes = {
  message: PropTypes.string,
  setMessage: PropTypes.func.isRequired,
};

Snackbar.defaultProps = {
  message: null,
};

export default Snackbar;
