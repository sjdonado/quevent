import React from 'react';
import ReactRouterProptypes from 'react-router-prop-types';
import { instanceOf } from 'prop-types';

import { ApolloClient, ApolloLink } from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { setContext } from 'apollo-link-context';
import { onError } from 'apollo-link-error';
import { createUploadLink } from 'apollo-upload-client';

import { withCookies, Cookies } from 'react-cookie';

import {
  Route,
  Switch,
  withRouter,
} from 'react-router-dom';

import { createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';

// import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import moment from 'moment';

import './App.module.scss';

import { API_URI } from './utils/environment';
import { AUTH_TOKEN_COOKIE_NAME } from './utils/constants';

import Login from './pages/Login/Login';
import PrivateRoute from './utils/PrivateRoute';
import EventDetails from './pages/EventDetails/EventDetails';
import Home from './pages/Home/Home';
import AddGuests from './pages/AddGuests/AddGuests';

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#9852f9',
      main: '#3F20BA',
    },
    secondary: {
      main: '#3c9d9b',
    },
  },
  typography: {
    fontFamily: [
      'Montserrat',
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      'sans-serif',
    ].join(','),
  },
});
responsiveFontSizes(theme);

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.map(({ message, locations, path }) => console.error(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`));
  }
  if (networkError) console.error(`[Network error]: ${networkError}`);
});

const uploadLink = createUploadLink({ uri: API_URI });

function App({ cookies, history }) {
  const setToken = (token) => {
    // console.log('token', token, 'expires', moment(new Date()).add(24, 'hours').toDate());
    cookies.set(AUTH_TOKEN_COOKIE_NAME, token, {
      path: '/',
      expires: moment(new Date()).add(1, 'day').toDate(),
      sameSite: true,
    });
    history.push('/home');
  };

  const getToken = () => cookies.get(AUTH_TOKEN_COOKIE_NAME);
  // const removeToken = () => cookies.remove(AUTH_TOKEN_COOKIE_NAME);

  const authLink = setContext((_, { headers }) => {
    const token = getToken();
    return {
      headers: {
        ...headers,
        authorization: token || null,
      },
    };
  });

  const client = new ApolloClient({
    link: ApolloLink.from([errorLink, authLink, uploadLink]),
    cache: new InMemoryCache(),
  });

  return (
    <ThemeProvider theme={theme}>
      <ApolloProvider client={client}>
        <Switch>
          <Route exact path="/" render={() => <Login setToken={setToken} />} />
          <PrivateRoute authenticated={typeof getToken() === 'string'}>
            <Route exact path="/home" component={Home} />
            <Route exact path="/events/:id" component={EventDetails} />
            <Route exact path="/events/:id/guests" component={AddGuests} />
          </PrivateRoute>
        </Switch>
      </ApolloProvider>
    </ThemeProvider>

  );
}

App.propTypes = {
  // location: ReactRouterProptypes.location.isRequired,
  history: ReactRouterProptypes.history.isRequired,
  cookies: instanceOf(Cookies).isRequired,
};

export default withRouter(withCookies(App));
