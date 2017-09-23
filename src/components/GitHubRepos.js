import { path, compose, tap, isNil} from 'ramda'
import { gql, graphql } from 'react-apollo';
import { branch, renderComponent, withProps } from 'recompose';
import Loading from './Loading';
import Body from './Body';
import Header from './Header'
import NotFound from './NotFound'

//TODO: Review Fragments, gql in another file? Cleanup 'Not Found' Branch Search Query for Name, Possible Pagination for Repos, Watchers, Stargazers etc
//TODO: Cleanup with props (considering different methods for searching for user, return first one)

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
  withProps(props => ({...props,login: 'gaearon'})),
  graphql(GET_GITHUB_REPOS, {
    options: props => {
      console.log('Props', props)
      return ({
      variables: { login: tap(console.log,props.login) }
    })},
    props: ({ data: { loading, user, variables,login } }) =>  ({
      loading,
      repos: path(['repositories','nodes'],user),
      user:  Object.assign({}, {login: path(['login'],user), repoCount: path(['repositories', 'totalCount'], user)}),
      variables: variables
    }) 
  }),
  branch (
    ({ loading }) => loading,
    renderComponent(Loading)
  ),
  branch (
    ({user}) => isNil(user.login),
    renderComponent(NotFound),
  )
)(Body);



//Find Query User from graphiql (return is nested and would need to alter props above)

// query FindUser($login: String!){
//   search(query:$login, type:USER, first:1){
//     userCount
//     edges {
//       node{
//       ... on User {
//         login
//         repositories(first: 25) {
//         totalCount
//         pageInfo{
//           hasNextPage
//           hasPreviousPage
//           startCursor
//           endCursor
//         }
//         nodes {
//           id
//           name
//           createdAt
//           description
//           isFork
//           url
//           pushedAt
//           primaryLanguage {
//             name
//           }
//           owner {
//             login
//           }
//           watchers(first:0){
//             totalCount
//           }
//           stargazers(first:0) {
//             totalCount
//           }
//           forks(first:0){
//             totalCount
//           }
//         }
  
//       }
//       }
//       }
//     }
//   }
// }