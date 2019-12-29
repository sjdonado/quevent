import React from 'react';
import PropTypes from 'prop-types';
import MuiTable from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { Box, Slide, Checkbox } from '@material-ui/core';
import styles from './Table.module.scss';


export default function Table({
  headers, isEditting, children, handleCheckAll, isAllChecked, isSelectingAttendees,
}) {
  return (
    <Box className={styles.root}>
      <MuiTable className={styles.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            {isEditting && (
            <Slide direction="right" in={isEditting} mountOnEnter unmountOnExit exit>
              <TableCell align="center">
                <Checkbox
                  checked={isAllChecked}
                  onChange={() => {
                    handleCheckAll(!isAllChecked);
                  }}
                  value="checked"
                  inputProps={{
                    'aria-label': 'primary checkbox',
                  }}
                />
              </TableCell>
            </Slide>
            )}
            {headers.map((header) => (
              <TableCell align="center" key={header}>{header}</TableCell>
            ))}
            {isSelectingAttendees && (
            <Slide direction="left" in={isSelectingAttendees} mountOnEnter unmountOnExit exit>
              <TableCell align="center">
                <Checkbox
                  checked={isAllChecked}
                  onChange={() => {
                    handleCheckAll(!isAllChecked);
                  }}
                  value="checked"
                  inputProps={{
                    'aria-label': 'invite all attendees checkbox',
                  }}
                />
              </TableCell>
            </Slide>
            )}
          </TableRow>
        </TableHead>
        <TableBody>
          {children}
        </TableBody>
      </MuiTable>
    </Box>
  );
}

Table.propTypes = {
  isEditting: PropTypes.bool.isRequired,
  isAllChecked: PropTypes.bool.isRequired,
  isSelectingAttendees: PropTypes.bool.isRequired,
  headers: PropTypes.arrayOf(PropTypes.string).isRequired,
  children: PropTypes.node.isRequired,
  handleCheckAll: PropTypes.func.isRequired,
};
