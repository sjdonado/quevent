import React from 'react';
import PropTypes from 'prop-types';

import {
  Box,
} from '@material-ui/core';
import { useDropzone } from 'react-dropzone';
import XLSX from 'xlsx';
import SaveOutlinedIcon from '@material-ui/icons/SaveOutlined';
import PageContainer from '../../../components/PageContainer/PageContainer';
import ActionButton from '../../../components/ActionButton/ActionButton';
import styles from './AddGuests.module.scss';

function AddGuests() {
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone();
  if (acceptedFiles.length > 0) {
    const file = acceptedFiles[0];
    const reader = new FileReader();
    const rABS = !!reader.readAsBinaryString;
    reader.onload = (e) => {
      /* Parse data */
      const bstr = e.target.result;
      const wb = XLSX.read(bstr, { type: rABS ? 'binary' : 'array' });
      /* Get first worksheet */
      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];
      /* Convert array of arrays */
      const data = XLSX.utils.sheet_to_json(ws);

      /* Update state */
    };
    if (rABS) reader.readAsBinaryString(file); else reader.readAsArrayBuffer(file);
  }
  return (
    <PageContainer
      title="Add guests"
      backButton="/events/123123"
      action={() => (
        <ActionButton title="Save guests">
          <SaveOutlinedIcon />
        </ActionButton>
      )}
    >
      <Box className={styles.wrapper}>
        <Box {...getRootProps({ className: 'dropzone' })} className={styles.dropzone}>
          <input {...getInputProps()} />
          <p>Drag and drop your .xls file here, or click to select file</p>
        </Box>
      </Box>
    </PageContainer>
  );
}

AddGuests.propTypes = {

};

export default AddGuests;
