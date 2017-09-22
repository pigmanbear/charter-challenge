import ApolloClient, {createNetworkInterface} from 'apollo-client';
import React, {Component} from 'react';
import {ApolloProvider} from 'react-apollo';
import Header from './components/Header'
import GitHubRepos from './components/GitHubRepos';
import logo from './logo.svg';

const networkInterface = createNetworkInterface({
  uri: 'https://api.github.com/graphql',
  opts: {
    headers: {
      // https://help.github.com/articles/creating-a-personal-access-token-for-the-com
      // mand-line/
      "Authorization": `Bearer ${process.env.REACT_APP_TOKEN}`
    }
  }
});
const client = new ApolloClient({networkInterface});

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <div>
          <GitHubRepos/>
        </div>
      </ApolloProvider>
    );
  }
}

export default App;
