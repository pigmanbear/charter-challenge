import PropTypes from 'prop-types';
import React from 'react';
import {
    Segment,
    Grid,
    Container,
    Dropdown,
    Menu
} from 'semantic-ui-react'
import GithubRepos from './GitHubRepos'
import {withHandlers, withState} from 'recompose'
import {compose} from 'ramda'
import Search from './SearchGithubUsers'
import Filter from './Filter'

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
            sortOrder: selection === data.sortBy
                ? !data.sortOrder
                : true
        }))
    }
}))

const Body = ({data, filterResults, handleSearchChange, handleSearchSelection, handleSortSelection}) =>  (
        <Segment style={{
            padding: '1em 0em'
        }} vertical>
            <Container>
                <Grid container stackable centered verticalAlign='middle' columns={3} divided>
                    <Grid.Row>
                        <Grid.Column textAlign='center'>
                            <Menu fluid vertical inverted>
                                <Menu.Item className='header'>Github User Search</Menu.Item>
                            </Menu>
                            <Search
                                handleSearch={handleSearchChange}
                                handleSelect={handleSearchSelection}
                                searchString={data.searchString}
                                login={data.searchString}/>
                        </Grid.Column>
                        <Grid.Column textAlign='center'>
                            <Menu fluid vertical inverted>
                                <Menu.Item className='header'>Filter by Name</Menu.Item>
                            </Menu>
                            <Filter onChange={filterResults} data={data.filterString || ''}/>
                        </Grid.Column>
                        <Grid.Column textAlign='center'>
                            <Menu fluid vertical inverted>
                                <Menu.Item className='header'>Sort by Details</Menu.Item>
                            </Menu>
                            <Dropdown
                                button
                                floating
                                className='icon'
                                labeled
                                text='Sort'
                                options={sortOptions}
                                icon='sort'
                                onChange={(e, {value}) => handleSortSelection(value)}/>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
                <Grid
                    container
                    stackable
                    verticalAlign='middle'
                    columns={1}
                    style={{
                    marginTop: '1em'
                }}>
                    <GithubRepos
                        filterString={data.filterString}
                        login={data.login}
                        sortString={data.sortBy || ''}
                        sortOrder={data.sortOrder || false}/>
                </Grid>
            </Container>
        </Segment>
    )

Body.prototypes = {
    data: PropTypes.object, 
    filterResults: PropTypes.func, 
    handleSearchChange: PropTypes.func,
    handleSearchSelection: PropTypes.func,
    handleSortSelection: PropTypes.func
}

export default enhance(Body);
