import React from 'react';
import PropTypes from 'prop-types';

import {
  Box, Typography,
} from '@material-ui/core';
import PageContainer from '../../components/PageContainer/PageContainer';
import ActionButton from '../../components/ActionButton/ActionButton';
import styles from './GuestsQrReader.module.scss';

function GuestsQrReader() {
  return (
    <PageContainer
      title="Scan guests"
    >
      <Box className={styles.wrapper}>
        asdasdsd
      </Box>
    </PageContainer>
  );
}

GuestsQrReader.propTypes = {

};

export default GuestsQrReader;
