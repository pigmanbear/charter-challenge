import ApolloClient, { createNetworkInterface } from 'apollo-client';
import React, { Component } from 'react';
import { ApolloProvider } from 'react-apollo';

import GitHubRepos from './components/GitHubRepos';

import logo from './logo.svg';
import './App.css';

const networkInterface = createNetworkInterface({
  uri: 'https://api.github.com/graphql',
  opts: {
    headers: {
      "Authorization": "Bearer fbbf7bd453c7e3fad43595b4ee697b5327e0e53c"
    }
  }
});
const client = new ApolloClient({
  networkInterface
});

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <div className="App">
          <div className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h2>Welcome to React</h2>
          </div>
          <GitHubRepos />
        </div>
      </ApolloProvider>
    );
  }
}

export default App;
