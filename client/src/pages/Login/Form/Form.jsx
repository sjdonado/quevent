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
import LockIcon from '@material-ui/icons/Lock';
import EmailIcon from '@material-ui/icons/Email';

import styles from './Form.module.scss';

const LoginForm = () => (
  <Box className={styles.wrapper}>
    <Typography component="h1">
        Inicia Sesión
    </Typography>
    <Form
      className={styles.form}
      noValidate
    >
      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        id="email"
        label="Correo Electrónico"
        name="email"
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <EmailIcon />
            </InputAdornment>
          ),
        }}
      />
      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        name="password"
        label="Contraseña"
        type="password"
        id="password"
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <LockIcon />
            </InputAdornment>
          ),
        }}
      />
      <FormControlLabel
        control={<Checkbox value="remember" color="primary" />}
        label="Recordarme"
      />
      <Button
        type="submit"
        fullWidth
        variant="contained"
        className={styles.button}
      >
          Iniciar Sesión
      </Button>
      <Grid container>
        <Grid item xs>
          <Link href="#lol" variant="body2">
              ¿Olvidaste tu contraseña?
          </Link>
        </Grid>
      </Grid>
    </Form>
  </Box>
);

Form.propTypes = {
};

export default LoginForm;
