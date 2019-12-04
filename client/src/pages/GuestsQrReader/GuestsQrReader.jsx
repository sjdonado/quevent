import React from 'react';
import PropTypes from 'prop-types';

import {
  Box, Typography, Card, CardContent, IconButton, Link,
} from '@material-ui/core';
import QrReader from 'react-qr-reader';
import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft';
import PageContainer from '../../components/PageContainer/PageContainer';
import ActionButton from '../../components/ActionButton/ActionButton';
import styles from './GuestsQrReader.module.scss';

function GuestsQrReader() {
  function handleScan(result) {
    // TODO: Remove log
    // eslint-disable-next-line no-console

  }

  function handleError(error) {
    // eslint-disable-next-line no-console
    console.log(`QR reader error => ${error}`);
  }
  return (
    <PageContainer
      title="Scan guests"
    >
      <Box className={styles.wrapper}>
        <Card className={styles.card} classes={{ root: styles.card }}>
          <Box display="flex" flexDirection="column" className={styles.wrapper}>
            <CardContent className={styles['card-content']}>
              <QrReader
                className={styles['qr-reader']}
                delay={300}
                onError={handleError}
                onScan={handleScan}
              />
            </CardContent>
          </Box>
        </Card>
      </Box>
    </PageContainer>
  );
}

GuestsQrReader.propTypes = {

};

export default GuestsQrReader;
