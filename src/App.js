import ApolloClient, {createNetworkInterface} from 'apollo-client';
import React, {Component} from 'react';
import {ApolloProvider, IntrospectionFragmentMatcher} from 'react-apollo';
import Header from './components/Header'
import GitHubRepos from './components/GitHubRepos';
import logo from './logo.svg';
import {GraphQLClient} from 'graphql-request'
import {asyncReactor} from 'async-reactor';
import Loading from './components/Loading'
import Body from './components/Body'

const simpleClient = new GraphQLClient('https://api.github.com/graphql', {
  headers: {
    "Authorization": `Bearer ${process.env.REACT_APP_TOKEN}`
  }
})
const query = `{
  __schema {
    types {
      kind
      name
      possibleTypes {
        name
      }
    }
  }
}`

// http://dev.apollodata.com/react/initialization.html#fragment-matcher Creating
// Async Function to Automatically Retrieve Schema As Per docs, in build process
// would make more sense for production

async function creatApolloClient() {
  let schema = await simpleClient
    .request(query)
    .then(x => x)
  const myFragmentMatcher = await new IntrospectionFragmentMatcher({introspectionQueryResultData: schema})
  const networkInterface = await createNetworkInterface({
    uri: 'https://api.github.com/graphql',
    opts: {
      headers: {
        // https://help.github.com/articles/creating-a-personal-access-token-for-the-com
        // mand-line/
        "Authorization": `Bearer ${process.env.REACT_APP_TOKEN}`
      }
    }
  });
  const client = await new ApolloClient({networkInterface, fragmentMatcher: myFragmentMatcher});
  return await class App extends Component {
    render() {
      return (
        <ApolloProvider client={client}>
          <div>
            <Header/>
            <Body/>
          </div>
        </ApolloProvider>
      )
    }
  }
}

export default asyncReactor(creatApolloClient, Loading);
