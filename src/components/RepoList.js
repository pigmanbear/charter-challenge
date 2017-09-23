import PropTypes from 'prop-types';
import React from 'react';
import {List, Segment, Grid, Button} from 'semantic-ui-react'

//Styling Layout
//TODO: Presentational Grid (Table)
const RepoList = ({repos}) => (
  <div>
    {repos && repos.map((repo, index) => (
      <Grid.Row key={index}>
        {repo.name}
      </Grid.Row>
    ))}
  </div>
)
RepoList.propTypes = {
  repos: PropTypes.array.isRequired
};

export default RepoList;
