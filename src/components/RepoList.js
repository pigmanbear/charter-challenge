import PropTypes from 'prop-types';
import React from 'react';
import { List, Segment, Grid, Button } from 'semantic-ui-react'



//Styling Layout
//TODO: Presentational Grid (Table)
const RepoList = ({user, repos}) =>  (
  <Segment style={{ padding: '8em 0em' }} vertical>
  <Grid container stackable verticalAlign='middle' celled>
    <Grid.Row>
      <Grid.Column width={8}>
      <div>
      <p>
        <b>User:</b> {user}
      </p>
    </div>
      </Grid.Column>
      <Grid.Column floated='right' width={6}>
      </Grid.Column>
    </Grid.Row>
    {repos && repos.map((repo, index) => (
      <Grid.Row key={index}>
        {repo.name}
      </Grid.Row>
    ))}
    <Grid.Row>
      <Grid.Column textAlign='center'>
        <Button size='huge'>Check Them Out</Button>
      </Grid.Column>
    </Grid.Row>
  </Grid>
  </Segment>

);

RepoList.propTypes = {
  user: PropTypes.string.isRequired,
  repos: PropTypes.array.isRequired
};


export default RepoList;

