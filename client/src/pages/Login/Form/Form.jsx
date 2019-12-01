import React from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  TextField,
  FormControlLabel,
  Checkbox,
  Link,
  Grid,
  Typography,
  Box,
  InputAdornment,
} from '@material-ui/core';
import {
  Formik, Form, Field,
} from 'formik';
import * as Yup from 'yup';

import LockIcon from '@material-ui/icons/Lock';
import EmailIcon from '@material-ui/icons/Email';

import styles from './Form.module.scss';

const initialValues = {
  email: '',
  password: '',

};

const validationSchema = () => Yup.object().shape({
  email: Yup.string()
    .email('Invalid email.')
    .required('This field is required'),
  password: Yup.string()
    .min(6, 'Password must have at least 6 characters.')
    .required('This field is required'),
});

const LoginForm = () => (
  <Box className={styles.wrapper}>
    <Typography component="h1">
        Inicia Sesión
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
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting,
      }) => (
        <Form
          className={styles.form}
          noValidate
        >
          <Field
            type="input"
            as={TextField}
            placeholder="Email"
            variant="outlined"
            error={touched.email && !!errors.email}
            helperText={errors.email}
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email"
            name="email"
            InputProps={{
              'aria-label': 'email',
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
          Log in
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
);

Form.propTypes = {
};

export default LoginForm;
