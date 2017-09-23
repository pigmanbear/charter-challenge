import { path, compose, tap} from 'ramda'
import { gql, graphql } from 'react-apollo';
import { branch, renderComponent } from 'recompose';
import Loading from './Loading';
import Body from './Body';
import Header from './Header'



// https://developer.github.com/v4/
const GET_GITHUB_REPOS = gql`
  query GetGitHubRepos($login: String!) {
    user(login: $login) {
      login
      repositories(first: 25) {
        totalCount
        pageInfo{
          hasNextPage
          hasPreviousPage
          startCursor
          endCursor
        }
        nodes {
          id
          name
          createdAt
          description
          isFork
          url
          pushedAt
          primaryLanguage {
            name
          }
          owner {
            login
          }
          watchers(first:0){
            totalCount
          }
          stargazers(first:0) {
            totalCount
          }
          forks(first:0){
            totalCount
          }
        }
  
      }
    }
  }`


export default compose(
  Header,
  graphql(GET_GITHUB_REPOS, {
    options: {
      variables: { login: "gaearon" }
    },
    props: ({ data: { loading, user, variables } }) =>  ({
      loading,
      repos: path(['repositories','nodes'],user),
      user:  Object.assign({}, {login: path(['login'],user), repoCount: path(['repositories', 'totalCount'], user)}),
      variables: variables
    }) 
  }),
  branch (
    ({ loading }) => loading,
    renderComponent(Loading)
  )
)(Body);
