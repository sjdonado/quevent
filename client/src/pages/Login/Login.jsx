import React from 'react';
import { Typography, Box } from '@material-ui/core';
import styles from './Login.module.scss';
import LoginForm from './Form/Form';

function Login() {
  return (
    <section id="login" className={styles.root}>
      <Box className={styles['form-container']}>
        <LoginForm />
      </Box>
    </section>
  );
}

export default Login;
