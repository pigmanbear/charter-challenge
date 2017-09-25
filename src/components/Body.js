import PropTypes from 'prop-types';
import React from 'react';
import {
    List,
    Segment,
    Grid,
    Button,
    Input,
    Container
} from 'semantic-ui-react'
import GithubRepos from './GitHubRepos'
import User from './User'
import {withHandlers, withState} from 'recompose'
import {compose, tap, toLower} from 'ramda'
import Search from './SearchGithubUsers'
import Filter from './Filter'

const l = tap(console.log)

//Basic Styling Layout and Filter
//TODO: Refactor to smaller components

// TODO: Clean up withState and login prop (fleshing out some ideas for
// searching for user)

const enhance = compose(withState('data', 'filterData', {}), withHandlers({
    filterResults: ({data, filterData}) => e => filterData(Object.assign(data, {filterString: e.target.value})),
    handleSearchChange: ({data, filterData}) => e => {
        filterData(Object.assign(data, {searchString: e.target.value}))
    },
    handleSelection: ({data, filterData}) => selection => {
        filterData(Object.assign({}, {
            searchString: selection,
            login: selection
        }))
    }
}))

const Body = enhance(({data, filterResults, handleSearchChange, handleSelection}) => {
    return (
        <Segment style={{
            padding: '4em 0em'
        }} vertical>
            <Container>
                <Search
                    handleSearch={handleSearchChange}
                    handleSelect={handleSelection}
                    searchString={data.searchString}
                    login={data.searchString}/>
                <Filter onChange={filterResults} data={data.filterString || ''}/>
                <Grid
                    container
                    stackable
                    verticalAlign='middle'
                    style={{
                    marginTop: '1em'
                }}>
                    <GithubRepos filterString={data.filterString} login={data.login}/>
                </Grid>
            </Container>
        </Segment>
    )
});

export default Body;
