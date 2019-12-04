import React from 'react';
import PropTypes from 'prop-types';

import {
  Box, Typography, Tooltip, Fab,
} from '@material-ui/core';
import PageContainer from '../../components/PageContainer/PageContainer';
import ActionButton from '../../components/ActionButton/ActionButton';

import styles from './AddGuests.module.scss';

function AddGuests() {
  return (
    <PageContainer
      title="Add guests"
    >
      <Box className={styles.wrapper}>
        hola
      </Box>
    </PageContainer>
  );
}

AddGuests.propTypes = {

};

export default AddGuests;
