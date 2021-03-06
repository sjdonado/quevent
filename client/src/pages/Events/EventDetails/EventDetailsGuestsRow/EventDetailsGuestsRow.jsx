import React from 'react';
import Slide from '@material-ui/core/Slide';

import {
  TableRow, TableCell, Checkbox,
} from '@material-ui/core';
import PropTypes from 'prop-types';
import styles from './EventDetailsGuestsRow.module.scss';


function EventDetailsGuestRow({
  row, isEditting, handleActiveCheckboxChange, handleCheck, isSelectingAttendees, handleSelectableCheckboxChange,
}) {
  return (
    <TableRow className={styles.row} key={row._id}>
      {isEditting && (
      <Slide direction="right" in={isEditting} mountOnEnter unmountOnExit exit>
        <TableCell align="center">
          <Checkbox
            checked={!!row.checked}
            onChange={() => {
              handleCheck(!row.checked, row._id);
            }}
            value="checked"
            inputProps={{
              'aria-label': 'primary checkbox',
            }}
          />
        </TableCell>
      </Slide>

      )}
      <TableCell align="center">
        {row.email}
      </TableCell>
      <TableCell align="center">
        <Checkbox
          checked={row.invited}
          disabled
          value="checked"
          inputProps={{
            'aria-label': 'primary checkbox',
          }}
        />
      </TableCell>
      <TableCell align="center">
        <Checkbox
          checked={row.attended}
          disabled
          value="checked"
          inputProps={{
            'aria-label': 'primary checkbox',
          }}
        />
      </TableCell>
      <TableCell align="center">
        <Checkbox
          checked={!!row.active}
          onChange={() => {
            handleActiveCheckboxChange(!row.active, row._id);
          }}
          disabled={!isEditting}
          value="active"
          inputProps={{
            'aria-label': 'primary checkbox',
          }}
        />
      </TableCell>
      {isSelectingAttendees && (
      <Slide direction="left" in={isSelectingAttendees} mountOnEnter unmountOnExit exit>
        <TableCell align="center">
          <Checkbox
            checked={!!row.selectable}
            onChange={() => {
              //console.log('changed!');
              handleSelectableCheckboxChange(!row.selectable, row._id);
            }}
            disabled={!row.active}
            value="selectable"
            inputProps={{
              'aria-label': 'invite all attendees checkbox',
            }}
          />
        </TableCell>
      </Slide>

      )}
    </TableRow>
  );
}

EventDetailsGuestRow.propTypes = {
  row: PropTypes.oneOfType([PropTypes.object]).isRequired,
  isEditting: PropTypes.bool.isRequired,
  handleActiveCheckboxChange: PropTypes.func.isRequired,
  handleCheck: PropTypes.func.isRequired,
  isSelectingAttendees: PropTypes.bool.isRequired,
  handleSelectableCheckboxChange: PropTypes.func.isRequired,
};

export default EventDetailsGuestRow;
