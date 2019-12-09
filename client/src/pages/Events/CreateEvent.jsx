import React, { Component, useState } from 'react';
import { DateTimePicker } from '@material-ui/pickers';

import {
  Button,
  TextField,
  // FormControlLabel,
  // Checkbox,
  // Link,
  // Grid,
  Typography,
  Box,
  // InputAdornment,
} from '@material-ui/core';
import {
  Formik, Form, Field,
} from 'formik';
import * as Yup from 'yup';
import { useMutation } from 'react-apollo';
import { CREATE_EVENT_MUTATION } from '../../graphql/mutations';

// import LockIcon from '@material-ui/icons/Lock';
// import EmailIcon from '@material-ui/icons/Email';

import styles from '../Login/Form/Form.module.scss';

const initialValues = {
  name: '',

};

const validationSchema = () => Yup.object().shape({
  name: Yup.string()
    .required('This field is required'),
});

/* const LoginForm = () => (
    <Box className={styles.wrapper}>
      <Typography component="h1">
          Add Event
      </Typography>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting }) => {
          setSubmitting(true);
          console.log(values);
        }}
      >
        {({
          errors,
          touched,
        }) => (
          <Form
            className={styles.form}
            noValidate
          >
            <Field
              type="input"
              as={TextField}
              placeholder="Name"
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="name"
              label="Event Name"
              name="name"
              InputProps={{
                'aria-label': 'Event Name',
                endAdornment: (
                  <InputAdornment position="end">
                    <EmailIcon />
                  </InputAdornment>
                ),
              }}
            />
            <Field
              as={TextField}
              placeholder="Password"
              variant="outlined"
              margin="normal"
              required
              fullWidth
              error={touched.password && !!errors.password}
              helperText={errors.password}
              name="password"
              label="Password"
              type="password"
              id="password"
              InputProps={{
                'aria-label': 'password',
                endAdornment: (
                  <InputAdornment position="end">
                    <LockIcon />
                  </InputAdornment>
                ),
              }}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              className={styles.button}
            >
            Login
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#lol" variant="body2">
                Forgot your password?
                </Link>
              </Grid>
            </Grid>
          </Form>
        )}
      </Formik>
    </Box>
  ); */
const FormikDateTimePicker = ({
  name,
  form: { setFieldValue },
  field: { value },
  placeholder,
  id,
  label,
  InputProps,
  ...rest
}) => (
  <DateTimePicker
    name={name}
    variant="inline"
    id={id}
    label={label}
    InputProps={InputProps}
    placeholder={placeholder}
    onChange={(value) => {
      console.log('setting value to', value);
      setFieldValue(id, value);
    }}
    value={value}
  />
);
export default (CreateEvent) => {
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
    } catch (err) {
      setError(err);
    }
    setSubmitting(false);
  };
  return (
    <Box className={styles.wrapper}>
      <Typography component="h1">
          New Event
      </Typography>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting }) => {
          setSubmitting(true);
          console.log(values);
        }}
      >
        {({ errors, touched, setFieldValue }) => (
          <Form className={styles.form} noValidate>
            <Field
              /* type="input" */
              as={TextField}
              placeholder="Name"
              variant="outlined"
              margin="normal"
              required
              id="name"
              label="Event Name"
              name="name"
              InputProps={{
                'aria-label': 'Event Name',
                /* endAdornment: (
                  <InputAdornment position="end">
                    <EmailIcon />
                  </InputAdornment>
                ), */
              }}
            />
            <Field
              /* type="input" */
              as={TextField}
              placeholder="Description"
              variant="outlined"
              margin="normal"
              required
              id="description"
              label="Event's description"
              name="description"
              InputProps={{
                'aria-label': "Event's description",
                /* endAdornment: (
                  <InputAdornment position="end">
                    <EmailIcon />
                  </InputAdornment>
                ), */
              }}
            />
            <Field
              /* type="input" */
              component={FormikDateTimePicker}
              placeholder="Start Date"
              variant="outlined"
              margin="normal"
              required
              id="startDate"
              label="Start Date"
              name="startDate"
              InputProps={{
                'aria-label': "Event's start date",
              }}
            />
            <Field
              /* type="input" */
              component={FormikDateTimePicker}
              placeholder="End Date"
              variant="outlined"
              margin="normal"
              required
              id="endDate"
              label="End Date"
              name="endDate"
              InputProps={{
                'aria-label': "Event's end date",
              }}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              className={styles.button}
            >
              Add Event
            </Button>
          </Form>
        )}
      </Formik>
    </Box>
  );
};
