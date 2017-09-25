import {
    path,
    compose,
    map,
    pick,
    pluck,
    filter,
    isEmpty,
    not
} from 'ramda'
import {gql, graphql} from 'react-apollo';
import Search from './Search'

// TODO: Review Fragments, gql in another file? Cleanup 'Not Found' Branch
// Search Query for Name, Possible Pagination for Repos, Watchers, Stargazers
// etc
// TODO: Cleanup with props (considering different methods for searching for
// user, return first one) https://developer.github.com/v4/
const GET_GITHUB_USERS = gql `
query FindUser($login : String!) {
    search(query : $login, type : USER, first : 10) {
        edges {
            node {
                ...on User {
                    login
                    avatarUrl
                    bio
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

const prepareUsers = compose(
    filter(compose(not, isEmpty)), 
    map(pick(['login', 'bio', 'avatarUrl', 'followers', 'repositories'])), 
    pluck(['node']), 
    path(['edges'])
)

export default compose(graphql(GET_GITHUB_USERS, {
    options: props => ({
        variables: {
            login: props.login || ''
        }
    }),
    props: ({
        data: {
            loading,
            search,
            login
        }
    }) => {
        return ({
            loading,
            users: search && prepareUsers(search),
            login
        })
    }
}))(Search)
