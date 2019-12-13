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
import moment from 'moment';

import {
  Route,
  Switch,
  Redirect,
  withRouter,
} from 'react-router-dom';

import { createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';

import './App.module.scss';

import { API_URI } from './utils/environment';
import { AUTH_TOKEN_COOKIE_NAME } from './utils/constants';

import AppBar from './components/AppBar/AppBar';
import Login from './pages/Login/Login';

import PrivateRoutes from './utils/PrivateRoutes';
import EventDetails from './pages/Events/EventDetails/EventDetails';
import Home from './pages/Home/Home';
import AddGuests from './pages/Events/AddGuests/AddGuests';
import GuestsQrReader from './pages/Events/GuestsQrReader/GuestsQrReader';


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

const uploadLink = createUploadLink({ uri: API_URI });

function App({ cookies, history }) {
  const setToken = (token) => {
    cookies.set(AUTH_TOKEN_COOKIE_NAME, token, {
      path: '/',
      expires: moment(new Date()).add(1, 'day').toDate(),
      sameSite: true,
    });
    history.push('/home');
  };

  const getToken = () => cookies.get(AUTH_TOKEN_COOKIE_NAME);

  const handleLogout = () => {
    cookies.remove(AUTH_TOKEN_COOKIE_NAME);
    history.push('/');
  };

  const errorLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors) {
      graphQLErrors.forEach(({
        message,
        locations,
        path,
        extensions,
      }) => {
        if (extensions.code === 'UNAUTHENTICATED') {
          cookies.remove(AUTH_TOKEN_COOKIE_NAME);
        }
        console.error(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`);
      });
    }
    if (networkError) console.error(`[Network error]: ${networkError}`);
  });

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
          <PrivateRoutes authenticated={typeof getToken() === 'string'}>
            <AppBar history={history} handleLogout={handleLogout} />
            <Route exact path="/home" component={Home} />
            <Route exact path="/events/:id" component={EventDetails} />
            <Route exact path="/events/:id/guests" component={AddGuests} />
            <Route exact path="/events/:id/qrreader" component={GuestsQrReader} />
          </PrivateRoutes>
          <Route render={() => <Redirect to="/" />} />
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
