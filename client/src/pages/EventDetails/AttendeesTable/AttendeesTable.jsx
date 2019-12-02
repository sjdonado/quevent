import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { Box } from '@material-ui/core';
import styles from './AttendeesTable.module.scss';

const headers = ['Name', 'Email', 'Attended', 'Active'];

const rows = [
  {
    name: 'Juan Estrada',
    email: 'jsestrada@uninorte.edu.co',
    attended: 'No',
    active: 'Yes',
  },
  {
    name: 'Juan Estrada',
    email: 'jsestrada@uninorte.edu.co',
    attended: 'No',
    active: 'Yes',
  },
  {
    name: 'Juan Estrada',
    email: 'jsestrada@uninorte.edu.co',
    attended: 'No',
    active: 'Yes',
  },
  {
    name: 'Juan Estrada',
    email: 'jsestrada@uninorte.edu.co',
    attended: 'No',
    active: 'Yes',
  },
  {
    name: 'Juan Estrada',
    email: 'jsestrada@uninorte.edu.co',
    attended: 'No',
    active: 'Yes',
  },


];

export default function AttendeesTable() {
  return (
    <Box className={styles.root}>
      <Table className={styles.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            {headers.map((header) => (
              <TableCell key={header}>{header}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.name}>
              <TableCell align="center" component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="center">{row.email}</TableCell>
              <TableCell align="center">{row.attended}</TableCell>
              <TableCell align="center">{row.active}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  );
}
