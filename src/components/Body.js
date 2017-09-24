import PropTypes from 'prop-types';
import React from 'react';
import {List, Segment, Grid, Button, Input, Container} from 'semantic-ui-react'
import RepoList from './RepoList'
import User from './User'
import {withHandlers, withState } from 'recompose'
import fuzzysearch from 'fuzzysearch'
import {compose, tap, toLower} from 'ramda'
import Search from './SearchGithubUsers'

const fuzzy = searchString => item => fuzzysearch(toLower(searchString), toLower(item))
const l = tap(console.log)

//Basic Styling Layout and Filter
//TODO: Refactor to smaller components 

//TODO: Clean up withState and login prop (fleshing out some ideas for searching for user)
 
const enhance = compose(
    withState('data', 'filterData', {}), 
    withHandlers({
        filterResults: ({data, filterData}) => 
            e =>  filterData({
                    searchString: e.target.value,
                })
}))

const Filter = ({data, onChange}) => (<Input icon='filter' placeholder='Filter Repos ...' onChange={onChange} value={data} />)
const Body = enhance(({user, repos, data, filterResults, login, refetch, variables}) => {
    data.repos = repos
    console.log('Refetch', data.repos)
    //setTimeout(() => { console.log('REfetching?'); refetch({login : 'apathio'})}, 10000)
    return (
        <Segment style={{
            padding: '8em 0em'
        }} vertical>
        <Container>
        <Search />
        <Filter onChange={filterResults} data={ data.searchString || '' } />
            <Grid container stackable verticalAlign='middle' style={{ marginTop: '1em'}}>
                <Grid.Row>
                    <Grid.Column width={8}>
                        <User user={user}/>
                    </Grid.Column>
                </Grid.Row>
                <RepoList repos={data.repos && data.repos.filter(x => fuzzy(data.searchString || '')(x.name))}/>
                <Grid.Row>
                    <Grid.Column textAlign='center'>
                        <Button size='huge'>Check Them Out</Button>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
            </Container>
        </Segment>

    )
});

Body.propTypes = {
    user: PropTypes.object.isRequired,
    repos: PropTypes.array.isRequired
};



export default Body;
