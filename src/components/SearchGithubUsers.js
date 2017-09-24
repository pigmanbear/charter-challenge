
import {path, compose, tap, isNil, map, pick, pluck, filter, isEmpty, not} from 'ramda'
import {gql, graphql} from 'react-apollo';
import {branch, renderComponent, withState, withHandlers, withProps} from 'recompose';
import Search from './Search'

// TODO: Review Fragments, gql in another file? Cleanup 'Not Found' Branch
// Search Query for Name, Possible Pagination for Repos, Watchers, Stargazers
// etc
// TODO: Cleanup with props (considering different methods for searching for
// user, return first one) https://developer.github.com/v4/
const GET_GITHUB_USERS = gql`
query FindUser($login : String!) {
    search(query : $login, type : USER, first : 10) {
        edges {
            node {
                ...on User {
                    login
                    avatarUrl
                    repositories(first : 0) {
                        totalCount
                    }
                    followers(first :0){
                        totalCount
                    }
                }
            }
        }
    }
}`




export default compose(
 graphql(GET_GITHUB_USERS, {
    options: props => ({
        variables: { login: props.login || '' }
    }),
    props: ({
        data: {
            loading,
            search,
            variables,
            refetch,
            login
        }
    }) => {
        return ({
           loading,
           users: search && compose(filter(compose(not, isEmpty)),map(pick(['login', 'repositories', 'followers','repositories'])),pluck(['node']),path(['edges']))(search),
           variables,
           refetch,
           login
        })
    }
}))(Search)
