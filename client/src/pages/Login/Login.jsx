import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { useMutation } from 'react-apollo';
import { GoogleLogin } from 'react-google-login';
import { Box, Typography } from '@material-ui/core';

import styles from './Login.module.scss';

import { LOGIN_MUTATION } from '../../graphql/mutations';
import { GOOGLE_CLIENT_ID } from '../../utils/environment';

import Snackbar from '../../components/Snackbar/Snackbar';

function Login({ setToken }) {
  const [snackbarMsg, setSnackbarMsg] = useState(null);
  const [loginMutation] = useMutation(LOGIN_MUTATION);

  const handleResponse = async ({ tokenId }) => {
    console.log('tokenId', tokenId);
    try {
      const { data } = await loginMutation({
        variables: {
          idToken: tokenId,
        },
      });
      setToken(data.login.token);
    } catch (err) {
      setSnackbarMsg(err.message.split('GraphQL error: ')[1]);
    }
  };

  const handleError = (err) => {
    console.log('err', err);
  };

  return (
    <section id="login" className={styles.root}>
      <Typography component="h1" variant="h2">Quevent</Typography>
      <Box className={styles['form-container']}>
        {/* <Typography variant>Login</Typography> */}
        {/* <Box>
          Form
        </Box> */}
        <GoogleLogin
          clientId={GOOGLE_CLIENT_ID}
          buttonText="Login with Google"
          onSuccess={handleResponse}
          onFailure={handleError}
          // cookiePolicy="single_host_origin"
        />
      </Box>
      <Snackbar message={snackbarMsg} setMessage={setSnackbarMsg} />
    </section>
  );
}

Login.propTypes = {
  setToken: PropTypes.func.isRequired,
};

export default Login;
