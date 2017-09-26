import {
  path,
  compose,
  isNil,
  pick,
  set,
  lensPath
} from 'ramda'
import {gql, graphql} from 'react-apollo'
import {branch, renderComponent} from 'recompose';
import Loading from './Loading'
import NotFound from './NotFound'
import RepoList from './RepoList'

// TODO: Possible Pagination? https://developer.github.com/v4/

const GET_GITHUB_REPOS = gql `
  query GetGitHubRepos($login: String!, $cursor: String) {
    user(login: $login) {
      login
      avatarUrl
      bio
      followers(first:0){
        totalCount
      }
      repositories(first: 25, after:$cursor) {
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
      login,
      fetchMore
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
        followers: path([
          'followers', 'totalCount'
        ], user)
      }),
      login: login,
      pageInfo: path([
        'repositories', 'pageInfo'
      ], user),
      loadMoreRepos: () => {
        return fetchMore({
          query: GET_GITHUB_REPOS,
          variables: {
            login: user.login,
            cursor: user.repositories.pageInfo.endCursor
          },
          updateQuery: (prev, {fetchMoreResult}) => ({
            ...set(lensPath(['user', 'repositories', 'nodes']), prev.user.repositories.nodes.concat(fetchMoreResult.user.repositories.nodes), fetchMoreResult)
          })

        })
      }
    })
  }
}), branch(({loading}) => loading, renderComponent(Loading)), branch(({user}) => user && isNil(user.login), renderComponent(NotFound)))(RepoList);
