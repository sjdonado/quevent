import React from 'react';
import styles from './Login.module.scss';
import { Typography, Box } from '@material-ui/core'
function Login() {
  return (
    <section id="login" className={styles.root}>
      <Box className={styles['form-container']}>
        <Typography variant>Login</Typography>
        <Box>
          Form
        </Box>
      </Box>
    </section>
  );
}

export default Login;
