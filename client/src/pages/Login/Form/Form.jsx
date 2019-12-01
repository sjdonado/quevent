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
import useForm from 'react-hook-form';
import LockIcon from '@material-ui/icons/Lock';
import EmailIcon from '@material-ui/icons/Email';

import styles from './form.module.scss';

const Form = ({ onLogin }) => {
  return (
    <Box className={styles.wrapper}>
      <Typography component="h1">
        Inicia Sesión
      </Typography>
      <form
        className={styles.form}
        onSubmit={handleSubmit(onLogin)}
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
          inputRef={register({
            required: 'Campo requerido',
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
              message: 'Correo invalido',
            },
          })}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <EmailIcon />
              </InputAdornment>
            ),
          }}
        />
        { errors.email && errors.email.message }
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          name="password"
          label="Contraseña"
          type="password"
          id="password"
          inputRef={register({
            required: 'Campo requerido',
          })}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <LockIcon />
              </InputAdornment>
            ),
          }}
        />
        { errors.password && errors.password.message }
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
            <Link href="#" variant="body2">
              ¿Olvidaste tu contraseña?
            </Link>
          </Grid>
        </Grid>
    </form>
  </Box>
  );
};

Form.propTypes = {
  onLogin: PropTypes.func.isRequired,
};

export default Form;