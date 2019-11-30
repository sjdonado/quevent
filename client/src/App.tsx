import React from 'react';

import { ApolloClient, ApolloLink } from 'apollo-boost';
import { ApolloProvider, Query } from 'react-apollo';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { setContext } from 'apollo-link-context';
import { onError } from 'apollo-link-error';
import { createUploadLink } from 'apollo-upload-client';

import { withCookies, Cookies } from 'react-cookie';
import { Cookie } from 'universal-cookie';
import { Location, History } from 'history';

import {
  Route,
  Switch,
  Redirect,
  withRouter,
} from 'react-router-dom';

// import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

import moment from 'moment';

import './App.module.css';

import { API_URI } from './utils/environment';
import { AUTH_TOKEN_COOKIE_NAME } from './utils/constants';
import Login from './pages/login/Login';


const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.map(({ message, locations, path }) => console.error(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`));
  }
  if (networkError) console.error(`[Network error]: ${networkError}`);
});

const uploadLink = createUploadLink({ uri: API_URI });

type AppProps = {
  location: Location,
  history: History,
  cookies: Cookie,
  children?: React.ReactNode,
}

const App: React.FC<any> = ({ cookies, location, history }: AppProps) => {
  const setToken = (token: string) => {
    // console.log('token', token, 'expires', moment(new Date()).add(24, 'hours').toDate());
    cookies.set(AUTH_TOKEN_COOKIE_NAME, token, {
      path: '/',
      expires: moment(new Date()).add(1, 'day').toDate(),
      sameSite: true,
    });
    history.push('/profile');
  };

  const getToken = () => cookies.get(AUTH_TOKEN_COOKIE_NAME);

  const removeToken = () => cookies.remove(AUTH_TOKEN_COOKIE_NAME);

  const authenticated = getToken();

  const authLink = setContext((_, { headers }) => {
    const token = getToken();
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : '',
      },
    };
  });

  const client = new ApolloClient({
    link: ApolloLink.from([errorLink, authLink, uploadLink]),
    cache: new InMemoryCache(),
  });

  return (
    <ApolloProvider client={client}>
      <Switch>
        <Route exact path="/" render={() => <Login />} />
      </Switch>
    </ApolloProvider>
  );
}

export default App;
