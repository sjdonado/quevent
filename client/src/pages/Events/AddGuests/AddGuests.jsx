import React from 'react';
import PropTypes from 'prop-types';

import {
  Box,
} from '@material-ui/core';
import { useDropzone } from 'react-dropzone';
import SaveOutlinedIcon from '@material-ui/icons/SaveOutlined';
import PageContainer from '../../../components/PageContainer/PageContainer';
import ActionButton from '../../../components/ActionButton/ActionButton';
import styles from './AddGuests.module.scss';

function AddGuests() {
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone();

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
