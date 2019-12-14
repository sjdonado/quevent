import React, { useState } from 'react';
import ReactRouterPropTypes from 'react-router-prop-types';
import {
  Box, Card, CardContent,
} from '@material-ui/core';
import { useMutation } from 'react-apollo';
import QrReader from 'react-qr-reader';
import PageContainer from '../../../components/PageContainer/PageContainer';
import Snackbar from '../../../components/Snackbar/Snackbar';
import Progress from '../../../components/Progress/Progress';
import { READ_INVITATION_MUTATION } from '../../../graphql/mutations';
import styles from './GuestsQrReader.module.scss';

function GuestsQrReader({ match }) {
  const [snackbarMsg, setSnackbarMsg] = useState(null);
  const [scanning, setScanning] = useState(null);
  const [readInvitationMutation] = useMutation(READ_INVITATION_MUTATION);
  async function handleScan(arg) {
    // TODO: Remove log
    // eslint-disable-next-line no-console
    if (arg) {
      setScanning(true);
      try {
        const { data } = await readInvitationMutation({
          variables: {
            qrCodeKey: arg,
          },
        });

        setSnackbarMsg(`User ${data.readInvitation.email} scanned`);
      } catch (err) {
        console.log(err);
      }
      setScanning(false);
    }
  }

  function handleError(error) {
    // eslint-disable-next-line no-console
    console.log(`QR reader error => ${error}`);
  }
  return (
    <PageContainer
      title="Scan guests"
      subtitle="Place the guest's QR code"
      backButton={`/events/${match.params.id}`}
      align="center"
    >
      <Box className={styles.wrapper}>
        <Card className={styles.card} classes={{ root: styles.card }}>
          <Box display="flex" flexDirection="column" className={styles.wrapper}>
            <CardContent className={styles['card-content']}>
              {scanning ? (
                <div className={styles.progress}>
                  <Progress type="circular" size={55} />
                </div>
              ) : (
                <QrReader
                  className={styles['qr-reader']}
                  delay={300}
                  onError={handleError}
                  onScan={handleScan}
                />
              )}

            </CardContent>
          </Box>
        </Card>
      </Box>
      <Snackbar message={snackbarMsg} setMessage={setSnackbarMsg} />
    </PageContainer>
  );
}

GuestsQrReader.propTypes = {
  match: ReactRouterPropTypes.match.isRequired,
};

export default GuestsQrReader;
