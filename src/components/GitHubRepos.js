import { path, compose} from 'ramda'
import { gql, graphql } from 'react-apollo';
import { branch, renderComponent } from 'recompose';
import Loading from './Loading';
import RepoList from './RepoList';


// https://developer.github.com/v4/
const GET_GITHUB_REPOS = gql`
  query GetGitHubRepos {
    user(login: "gaearon") {
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
  graphql(GET_GITHUB_REPOS, {
    props: ({ data: { loading, user } }) =>  ({
      loading,
      repos: path(['repositories','nodes'])(user),
      user:  path(['login'])(user)
    }) 
  }),
  branch (
    ({ loading }) => loading,
    renderComponent(Loading)
  )
)(RepoList);
