import React, { useState } from 'react';
import {
  Formik, Form, Field,
} from 'formik';
import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { useMutation } from 'react-apollo';
import moment from 'moment';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { InputAdornment, Box } from '@material-ui/core';
import LockIcon from '@material-ui/icons/Lock';
import EmailIcon from '@material-ui/icons/Email';
import TodayOutlinedIcon from '@material-ui/icons/TodayOutlined';
import Progress from '../Progress/Progress';
import styles from './Modal.module.scss';
import { CREATE_EVENT_MUTATION } from '../../graphql/mutations';
import DatePicker from '../DatePicker/DatePicker';

const initialValues = {
  name: '',
  location: '',
  description: '',
  startDate: moment().format('YYYY-MM-DDThh:mm'),
  endDate: moment().format('YYYY-MM-DDThh:mm'),
};


const validationSchema = () => Yup.object().shape({
  name: Yup.string()
    .required('This field is required'),
  location: Yup.string()
    .required('This field is required'),
  description: Yup.string()
    .required('This field is required'),
  startDate: Yup.date()
    .required('This field is required'),
  endDate: Yup.date()
    .required('This field is required'),
});

export default function Modal({ open, handleClose }) {
  const [error, setError] = useState(null);
  const [createEventMutation] = useMutation(CREATE_EVENT_MUTATION);

  const handleSubmit = async ({ name, startDate, endDate }, { setSubmitting }) => {
    setSubmitting(true);
    try {
      const { data } = await createEventMutation({
        variables: {
          name,
          startDate,
          endDate,
        },
      });
      console.log(data);
    } catch (err) {
      setError(err);
    }
    setSubmitting(false);
  };

  return (
    <div>
      <Dialog
        className={styles.dialog}
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle>Create a new event</DialogTitle>
        <DialogContent>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({
              errors,
              touched,
              isSubmitting,
              setFieldValue,
            }) => (
              <Form
                className={styles.form}
                noValidate
              >
                {isSubmitting ? (
                  <Box>
                    <Progress type="circular" />
                  </Box>
                ) : (
                  <>
                    <Field
                      type="input"
                      as={TextField}
                      placeholder="Name"
                      error={touched.name && !!errors.name}
                      helperText={errors.name}
                      margin="normal"
                      required
                      fullWidth
                      id="name"
                      label="Name"
                      name="name"
                      InputProps={{
                        'aria-label': 'event name',
                        endAdornment: (
                          <InputAdornment position="end">
                            <EmailIcon className={styles.icon} />
                          </InputAdornment>
                        ),
                      }}
                    />
                    <Field
                      as={TextField}
                      placeholder="Location"
                      margin="normal"
                      required
                      fullWidth
                      error={touched.location && !!errors.location}
                      helperText={errors.location}
                      name="location"
                      label="Location"
                      type="input"
                      id="location"
                      InputProps={{
                        'aria-label': 'event location',
                        endAdornment: (
                          <InputAdornment position="end">
                            <LockIcon className={styles.icon} />
                          </InputAdornment>
                        ),
                      }}
                    />
                    <Field
                      as={TextField}
                      placeholder="Descrption"
                      margin="normal"
                      required
                      fullWidth
                      error={touched.description && !!errors.description}
                      helperText={errors.description}
                      name="description"
                      label="Description"
                      type="input"
                      id="description"
                      InputProps={{
                        'aria-label': 'event description',
                        endAdornment: (
                          <InputAdornment position="end">
                            <LockIcon className={styles.icon} />
                          </InputAdornment>
                        ),
                      }}
                    />
                    <Box className={styles.dates}>
                    <Field
                      id="startDate"
                      name="startDate"
                      component={DatePicker}
                      error={touched.startDate && !!errors.startDate}
                      helperText={errors.startDate}
                      label="Start date"
                      className={styles.date}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      InputProps={{
                        'aria-label': 'event start date',
                        endAdornment: (
                          <InputAdornment position="end">
                            <TodayOutlinedIcon className={styles.icon} />
                          </InputAdornment>
                        ),
                      }}
                    />
                    <Field
                      id="endDate"
                      name="endDate"
                      component={DatePicker}
                      error={touched.endDate && !!errors.endDate}
                      helperText={errors.endDate}
                      label="End date"
                      className={styles.date}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      InputProps={{
                        'aria-label': 'event end date',
                        endAdornment: (
                          <InputAdornment position="end">
                            <TodayOutlinedIcon className={styles.icon} />
                          </InputAdornment>
                        ),
                      }}
                    />
                      {/* <Field
                        id="date"
                        name="startDate"
                        as={TextField}
                        error={touched.startDate && !!errors.startDate}
                        helperText={errors.startDate}
                        label="Start date"
                        type="datetime-local"
                        className={styles.date}
                        InputLabelProps={{
                          shrink: true,
                        }}
                        InputProps={{
                          'aria-label': 'event start date',
                          endAdornment: (
                            <InputAdornment position="end">
                              <TodayOutlinedIcon className={styles.icon} />
                            </InputAdornment>
                          ),
                        }}
                      /> */}
                      {/* <Field
                        id="date"
                        name="endDate"
                        as={TextField}
                        error={touched.endDate && !!errors.endDate}
                        helperText={errors.endDate}
                        label="Start date"
                        type="datetime-local"
                        className={styles.date}
                        InputLabelProps={{
                          shrink: true,
                        }}
                        InputProps={{
                          'aria-label': 'event start date',
                          endAdornment: (
                            <InputAdornment position="end">
                              <TodayOutlinedIcon className={styles.icon} />
                            </InputAdornment>
                          ),
                        }}
                      /> */}
                    </Box>
                    <DialogActions>
                      <Button onClick={handleClose} color="secondary">
                    Cancel
                      </Button>
                      <Button color="secondary" type="submit">
                    Create
                      </Button>
                    </DialogActions>
                  </>
                )}

              </Form>
            )}
          </Formik>
        </DialogContent>

      </Dialog>
    </div>
  );
}

Modal.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
};
