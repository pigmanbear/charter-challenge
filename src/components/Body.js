import PropTypes from 'prop-types';
import React from 'react';
import {
    List,
    Segment,
    Grid,
    Button,
    Input,
    Container,
    Dropdown
} from 'semantic-ui-react'
import GithubRepos from './GitHubRepos'
import User from './User'
import {withHandlers, withState} from 'recompose'
import {compose, tap, toLower} from 'ramda'
import Search from './SearchGithubUsers'
import Filter from './Filter'

const l = tap(console.log)

const sortOptions = [
    {
        text: 'Language',
        value: 'language'
    }, {
        text: 'Repository',
        value: 'name'
    }, {
        text: 'Forks',
        value: 'forks'
    }, {
        text: 'Stars',
        value: 'starGazers'
    }, {
        text: 'Created',
        value: 'createdAt'
    }, {
        text: 'Updated',
        value: 'pushedAt'
    }

]

const enhance = compose(withState('data', 'filterData', {}), withHandlers({
    filterResults: ({data, filterData}) => e => filterData(Object.assign(data, {filterString: e.target.value})),
    handleSearchChange: ({data, filterData}) => e => {
        filterData(Object.assign(data, {searchString: e.target.value}))
    },
    handleSearchSelection: ({data, filterData}) => selection => {
        filterData(Object.assign({}, {
            searchString: selection,
            login: selection
        }))
    },
    handleSortSelection: ({data, filterData}) => selection => {
        filterData(Object.assign(data, {
            sortBy: selection,
            sortOrder: selection === data.sortBy ? !data.sortOrder : true
        }))
    }
}))

const Body = ({data, filterResults, handleSearchChange, handleSearchSelection, handleSortSelection}) => {
    return (
        <Segment style={{
            padding: '4em 0em'
        }} vertical>
            <Container>
                <Search
                    handleSearch={handleSearchChange}
                    handleSelect={handleSearchSelection}
                    searchString={data.searchString}
                    login={data.searchString}/>
                <Filter onChange={filterResults} data={data.filterString || ''}/>
                <Dropdown
                    selection
                    placeholder='Sort By ...'
                    options={sortOptions}
                    icon='sort'
                    onChange={(e, {value}) => handleSortSelection(value)}
                    />
                <Grid
                    container
                    stackable
                    verticalAlign='middle'
                    style={{
                    marginTop: '1em'
                }}>
                    <GithubRepos
                        filterString={data.filterString}
                        login={data.login}
                        sortString={data.sortBy}
                        sortOrder={data.sortOrder}/>
                </Grid>
            </Container>
        </Segment>
    )
};

export default enhance(Body);
