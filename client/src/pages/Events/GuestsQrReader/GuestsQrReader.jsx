import React from 'react';

import {
  Box, Card, CardContent,
} from '@material-ui/core';
import QrReader from 'react-qr-reader';
import PageContainer from '../../../components/PageContainer/PageContainer';
import styles from './GuestsQrReader.module.scss';

function GuestsQrReader() {
  function handleScan() {
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
      subtitle="Place the guest's QR code"
      backButton="/events/123123"
      align="center"
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
