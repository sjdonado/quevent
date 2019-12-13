import React, { useState } from 'react';
import ReactRouterPropTypes from 'react-router-prop-types';
import { useHistory } from 'react-router-dom';
import {
  Box,
} from '@material-ui/core';
import { useDropzone } from 'react-dropzone';
import XLSX from 'xlsx';
import SaveOutlinedIcon from '@material-ui/icons/SaveOutlined';
import { useMutation } from 'react-apollo';
import PageContainer from '../../../components/PageContainer/PageContainer';
import ActionButton from '../../../components/ActionButton/ActionButton';
import Progress from '../../../components/Progress/Progress';
import Snackbar from '../../../components/Snackbar/Snackbar';
import styles from './AddGuests.module.scss';
import { ADD_ATTENDEES } from '../../../graphql/mutations';

function AddGuests({ match }) {
  const [attendees, setAttendees] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [snackbarMsg, setSnackbarMsg] = useState(null);
  const history = useHistory();
  const [error, setError] = useState(null);
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone();
  const [addAttendeesMutation] = useMutation(ADD_ATTENDEES);

  const handleSubmit = async () => {
    try {
      if (attendees) {
        setSubmitting(true);
        await addAttendeesMutation({
          variables: {
            eventId: match.params.id,
            attendees,
          },
        });
        setSubmitting(false);
        history.replace({
          pathname: `/events/${match.params.id}`,
          state: {
            succesfulSubmit: true,
          },
        });
      } else {
        setSnackbarMsg('A file is required');
      }
    } catch (err) {
      setSnackbarMsg('Error. There was problem submitting the file');
      setSubmitting(false);
    }
  };


  if (acceptedFiles.length > 0) {
    const file = acceptedFiles[0];
    const reader = new FileReader();
    const rABS = !!reader.readAsBinaryString;
    reader.onload = (e) => {
      const bstr = e.target.result;
      const wb = XLSX.read(bstr, { type: rABS ? 'binary' : 'array' });
      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];
      const data = XLSX.utils.sheet_to_json(ws);
      setAttendees(data);
    };
    if (rABS) reader.readAsBinaryString(file); else reader.readAsArrayBuffer(file);
  }


  return (
    <PageContainer
      title="Add guests"
      backButton={`/events/${match.params.id}`}
      action={() => (
        <ActionButton title="Save guests" onClick={handleSubmit}>
          <SaveOutlinedIcon />
        </ActionButton>
      )}
    >
      <Box className={styles.wrapper}>
        {submitting ? (
          <div className={styles.progress}>
            <Progress type="circular" size={55} />
          </div>
        ) : (
          <Box {...getRootProps({ className: 'dropzone' })} className={styles.dropzone}>
            <input {...getInputProps()} />
            {acceptedFiles.length > 0 ? <p>{acceptedFiles[0].name}</p>
              : (
                <div className={styles.message}>
                  <p>Drag and drop your .xls file here, or click to select file.</p>
                  <p className={styles.small}>
                    Make sure that your file contains a column called
                    <b> email</b>
                  </p>
                </div>
              )}
          </Box>
        )}
      </Box>
      <Snackbar message={snackbarMsg} setMessage={setSnackbarMsg} />
    </PageContainer>
  );
}

AddGuests.propTypes = {
  match: ReactRouterPropTypes.match.isRequired,
};

export default AddGuests;
