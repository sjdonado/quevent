import React, { useState, useEffect } from 'react';
import Slide from '@material-ui/core/Slide';

import {
  TableRow, TableCell, Checkbox,
} from '@material-ui/core';
import PropTypes from 'prop-types';
import styles from './EventDetailsGuestsRow.module.scss';


function EventDetailsGuestRow({
  row, isEditting, saveChanges, handleSaveChanges, handleCheck,
}) {
  const [checked, setChecked] = useState(false);
  const [active, setActive] = useState(row.active);

  if (saveChanges) {
    handleSaveChanges(row);
  }

  return (
    <TableRow className={styles.row} key={row.id}>
      {isEditting && (
      <Slide direction="right" in={isEditting} mountOnEnter unmountOnExit exit>
        <TableCell align="center">
          <Checkbox
            checked={!!row.checked}
            onChange={() => {
              handleCheck(!row.checked, row.id);
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
          checked={isEditting ? active : row.active}
          onChange={() => { setActive(!active); }}
          disabled={!isEditting}
          value="active"
          inputProps={{
            'aria-label': 'primary checkbox',
          }}
        />
      </TableCell>
    </TableRow>
  );
}

EventDetailsGuestRow.propTypes = {
  row: PropTypes.oneOfType([PropTypes.object]).isRequired,
  isEditting: PropTypes.bool.isRequired,
};

export default EventDetailsGuestRow;
