import React, { useState, useEffect } from 'react';
import Slide from '@material-ui/core/Slide';
import moment from 'moment';
import {
  TableRow, TableCell, Checkbox,
} from '@material-ui/core';
import PropTypes from 'prop-types';
import styles from './EventRow.module.scss';


function EventRow({
  row, isEditting, handleActiveCheckboxChange, handleCheck, onRowClick,
}) {
  return (
    <TableRow className={isEditting ? '' : styles.row} key={row.id} onClick={() => !isEditting && onRowClick(row)}>
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
        {row.name}
      </TableCell>
      <TableCell align="center">
        Universidad del Norte
      </TableCell>
      <TableCell align="center">
        {moment(`${row.startDate}`, 'x').format('LLL')}
      </TableCell>
      <TableCell align="center">
        {moment(`${row.endDate}`, 'x').format('LLL')}
      </TableCell>
      <TableCell align="center">
        <Checkbox
          checked={!!row.active}
          onChange={() => {
            handleActiveCheckboxChange(!row.active, row.id);
          }}
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

EventRow.propTypes = {
  row: PropTypes.oneOfType([PropTypes.object]).isRequired,
  isEditting: PropTypes.bool.isRequired,
};

export default EventRow;
