import React from 'react';
import { useMutation } from 'react-apollo';
import { GoogleLogin } from 'react-google-login';
import { Box } from '@material-ui/core';

import { LOGIN_MUTATION } from '../../graphql/mutations';
import { GOOGLE_CLIENT_ID } from '../../utils/environment';
import styles from './Login.module.scss';

function Login() {
  const [loginMutation] = useMutation(LOGIN_MUTATION);

  const handleResponse = async ({ tokenId }) => {
    try {
      const { data } = await loginMutation({
        variables: {
          idToken: tokenId,
        },
      });
      console.log(data);
      // setToken(data.login.token);
    } catch (err) {
      // setSnackbarMsg(err.message.split('GraphQL error: ')[1]);
    }
  };

  const handleError = (err) => {
    console.log('err', err);
  };

  return (
    <section id="login" className={styles.root}>
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
    </section>
  );
}

export default Login;
