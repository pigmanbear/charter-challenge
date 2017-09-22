import { path, compose, tap} from 'ramda'
import { gql, graphql } from 'react-apollo';
import { branch, renderComponent } from 'recompose';
import Loading from './Loading';
import RepoList from './RepoList';
import Header from './Header'



// https://developer.github.com/v4/
const GET_GITHUB_REPOS = gql`
  query GetGitHubRepos($login: String!) {
    user(login: $login) {
      login
      repositories(first: 25) {
        nodes {
          name
        }
      }
    }
  }
`;


export default compose(
  Header,
  graphql(GET_GITHUB_REPOS, {
    options: {
      variables: { login: "gaearon" }
    },
    props: ({ data: { loading, user, variables } }) =>  ({
      loading,
      repos: path(['repositories','nodes'])(user),
      user:  path(['login'])(user),
      variables: variables
    }) 
  }),
  branch (
    ({ loading }) => loading,
    renderComponent(Loading)
  )
)(RepoList);
