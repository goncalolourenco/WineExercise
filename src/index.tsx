import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

// apollo imports
import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { ApolloProvider } from '@apollo/react-hooks';

// ui library imports
import { ThemeProvider, CSSReset } from '@chakra-ui/core';

const cache = new InMemoryCache();
const client = new ApolloClient({
  cache,
  link: new HttpLink({
    uri: 'http://wines-api-graphql.herokuapp.com/graphql',
    fetchOptions: {
      mode: 'no-cors'
    }
  })
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <ThemeProvider>
      {/* <CSSReset /> */}
      <App />
    </ThemeProvider>
  </ApolloProvider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
