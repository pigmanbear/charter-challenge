import PropTypes from 'prop-types';
import React from 'react';
import {List, Segment, Grid, Button, Input} from 'semantic-ui-react'
import RepoList from './RepoList'
import User from './User'
import {withHandlers, withState } from 'recompose'
import fuzzysearch from 'fuzzysearch'
import {compose, tap} from 'ramda'

const fuzzy = searchString => item => fuzzysearch(searchString, item)
const l =tap(console.log)

//Basic Styling Layout and Filter
//TODO: Refactor to smaller components

 
const enhance = compose(
    withState('data', 'filterData', {repos: [], searchString: ''}), 
    withHandlers({
        filterResults: ({data, filterData}) => 
            e =>  filterData({
                    searchString: e.target.value
                }),
}))

const Filter = ({data, onChange}) => (<Input icon='filter' placeholder='Filter Repos ...' onChange={onChange} value={data} style={{paddingLeft: '4em'}}/>)
const Body = enhance(({user, repos, data, filterResults}) => {
   data.repos = repos

    return (
        <Segment style={{
            padding: '8em 0em'
        }} vertical>
        <Filter onChange={filterResults} data={ data.searchString } />

            <Grid container stackable verticalAlign='middle' celled>
                <Grid.Row>
                    <Grid.Column width={8}>
                        <User user={user}/>
                    </Grid.Column>
                </Grid.Row>
                <RepoList repos={data.repos.filter(x => fuzzy(data.searchString)(x.name))}/>
                <Grid.Row>
                    <Grid.Column textAlign='center'>
                        <Button size='huge'>Check Them Out</Button>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </Segment>

    )
});

Body.propTypes = {
    user: PropTypes.string.isRequired,
    repos: PropTypes.array.isRequired
};

export default Body;
