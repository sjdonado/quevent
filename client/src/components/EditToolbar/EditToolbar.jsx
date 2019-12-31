import React from 'react';
import PropTypes from 'prop-types';

import {
  Box, Button,
} from '@material-ui/core';
import Slide from '@material-ui/core/Slide';
import styles from './EditToolbar.module.scss';


function EditToolbar({
  children, isEditting, setIsEditting, handleReset,
  setDialogType, setOpenDialog, isActiveStateChanged,
  options, setIsSelectingAttendees, isSelectingAttendees
}) {
  return (
    <>
      {isEditting ? (
        <>
          <div className={styles.edit}>
            <div className={styles.editActions}>
              <Button
                color="primary"
                onClick={handleReset}
                className={styles.editAction}
              >
                  Cancel
              </Button>
              <Button
                color="primary"
                disabled={!isActiveStateChanged}
                onClick={() => {
                  setDialogType('save');
                  setOpenDialog(true);
                }}
                className={styles.editAction}
              >
                  Save
              </Button>
            </div>

            <Slide direction="right" in={isEditting} mountOnEnter unmountOnExit exit>
              <div>
                { children }
              </div>
            </Slide>
          </div>

        </>
      ) : (
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Button
            color="primary"
            onClick={() => {
              setIsEditting(true);
              setIsSelectingAttendees(false);
            }}
            disabled={isSelectingAttendees}
            className={styles.editAction}
          >
              Edit
          </Button>
          {options && options()}
        </Box>
      )}
    </>
  );
}

EditToolbar.propTypes = {
  children: PropTypes.node.isRequired,
  isEditting: PropTypes.bool.isRequired,
  isActiveStateChanged: PropTypes.bool.isRequired,
  setIsEditting: PropTypes.func.isRequired,
  handleReset: PropTypes.func.isRequired,
  setDialogType: PropTypes.func.isRequired,
  setOpenDialog: PropTypes.func.isRequired,
  options: PropTypes.func,
  setIsSelectingAttendees: PropTypes.func,
  isSelectingAttendees: PropTypes.bool,
};

EditToolbar.defaultProps = {
  options: null,
};

export default EditToolbar;
