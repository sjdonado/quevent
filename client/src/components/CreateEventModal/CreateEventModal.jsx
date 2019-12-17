import React from 'react';

import {
  Formik, Form, Field,
} from 'formik';

import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { useMutation } from 'react-apollo';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
import moment from 'moment';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import InputAdornment from '@material-ui/core/InputAdornment';
import Box from '@material-ui/core/Box';
import RoomOutlinedIcon from '@material-ui/icons/RoomOutlined';
import EventAvailableOutlinedIcon from '@material-ui/icons/EventAvailableOutlined';
import TodayOutlinedIcon from '@material-ui/icons/TodayOutlined';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import Progress from '../Progress/Progress';
import styles from './CreateEventModal.module.scss';
import { CREATE_EVENT_MUTATION, UPDATE_EVENT_MUTATION } from '../../graphql/mutations';
import DatePicker from '../DatePicker/DatePicker';


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

export default function CreateEventModal({ open, handleClose, edit }) {
  const [createEventMutation] = useMutation(CREATE_EVENT_MUTATION);
  const [updateEventMutation] = useMutation(UPDATE_EVENT_MUTATION);

  const handleSubmit = async (variables, { setSubmitting }) => {
    setSubmitting(true);
    try {
      if (edit) {
        const { data } = await updateEventMutation({
          variables: {
            ...variables,
            eventId: edit._id,
          },
        });
        console.log(data);
      } else {
        const { data } = await createEventMutation({
          variables,
        });
        console.log(data);
      }

      handleClose(true);
    } catch (err) {
      handleClose(false);
    }
    setSubmitting(false);
  };
  const initialValues = {
    name: edit ? edit.name : '',
    location: edit ? edit.location : '',
    description: edit ? edit.description : '',
    startDate: edit ? moment(`${edit.startDate}`, 'x').format('LLL') : moment().format('YYYY-MM-DDThh:mm'),
    endDate: edit ? moment(`${edit.endDate}`, 'x').format('LLL') : moment().format('YYYY-MM-DDThh:mm'),
  };

  return (
    <MuiPickersUtilsProvider utils={MomentUtils}>
      <div>
        <Dialog
          className={styles.dialog}
          open={open}
          onClose={handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle>{edit ? 'Update event' : 'Create a new event'}</DialogTitle>
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
                              <EventAvailableOutlinedIcon className={styles.icon} />
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
                              <RoomOutlinedIcon className={styles.icon} />
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
                              <EditOutlinedIcon className={styles.icon} />
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
                      </Box>
                      <DialogActions>
                        <Button onClick={() => handleClose()} color="secondary">
                        Cancel
                        </Button>
                        <Button color="secondary" type="submit">
                          {edit ? 'Save' : 'Create'}
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
    </MuiPickersUtilsProvider>
  );
}

CreateEventModal.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  edit: PropTypes.oneOfType([PropTypes.object]),
};

CreateEventModal.defaultProps = {
  edit: null,
};
