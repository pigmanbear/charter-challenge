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
      // https://help.github.com/articles/creating-a-personal-access-token-for-the-command-line/
      "Authorization": "Bearer YOUR_GITHUB_PERSONAL_ACCESS_TOKEN"
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
