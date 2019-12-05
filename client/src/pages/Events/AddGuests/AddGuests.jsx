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
import styles from './AddGuests.module.scss';
import { ADD_ATTENDEES } from '../../../graphql/mutations';

function AddGuests({ match }) {
  const [attendees, setAttendees] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const history = useHistory();
  const [error, setError] = useState(null);
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone();
  const [addAttendeesMutation] = useMutation(ADD_ATTENDEES);

  const handleSubmit = async () => {
    try {
      if (attendees) {
        setSubmitting(true);
        const { data } = await addAttendeesMutation({
          variables: {
            eventId: match.params.id,
            attendees,
          },
        });
        history.replace({
          pathname: `/events/${match.params.id}`,
          state: {
            succesfulSubmit: true,
          },
        });
      }
    } catch (err) {
      setError(err);
    }
    setSubmitting(false);
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
        {submitting ? <Progress type="circular" /> : (
          <Box {...getRootProps({ className: 'dropzone' })} className={styles.dropzone}>
            <input {...getInputProps()} />
            <p>Drag and drop your .xls file here, or click to select file</p>
          </Box>
        )}
      </Box>
    </PageContainer>
  );
}

AddGuests.propTypes = {
  match: ReactRouterPropTypes.match.isRequired,
};

export default AddGuests;
