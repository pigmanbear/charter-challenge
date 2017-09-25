import {path, compose, tap, isNil,pick} from 'ramda'
import {gql, graphql} from 'react-apollo'
import {branch, renderComponent, withProps} from 'recompose';
import Loading from './Loading'
import Header from './Header'
import NotFound from './NotFound'
import RepoList from './RepoList'

// TODO: Review Fragments, gql in another file? Cleanup 'Not Found' Branch
// Search Query for Name, Possible Pagination for Repos, Watchers, Stargazers
// etc
// TODO: Cleanup with props (considering different methods for searching for
// user, return first one) https://developer.github.com/v4/
const GET_GITHUB_REPOS = gql `
  query GetGitHubRepos($login: String!) {
    user(login: $login) {
      login
      avatarUrl
      bio
      followers(first:0){
        totalCount
      }
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

export default compose(graphql(GET_GITHUB_REPOS, {
  options: props => {
    return ({
      variables: {
        login: props.login || 'gaearon'
      }
    })
  },
  props: ({
    data: {
      loading,
      user,
      variables,
      login,
      refetch
    }
  }) => {
    return ({
      loading,
      repos: path([
        'repositories', 'nodes'
      ], user),
      user: user && Object.assign(pick([
        'login', 'avatarUrl', 'bio'
      ], user), {
        repoCount: path([
          'repositories', 'totalCount'
        ], user),
        followers:  path([
          'followers', 'totalCount'
        ], user)
      }),
      variables: variables,
      login: login,
      refetch: refetch
    })
  }
}), branch(({loading}) => loading, renderComponent(Loading)), branch(({user}) => isNil(user.login), renderComponent(NotFound)))(RepoList);
