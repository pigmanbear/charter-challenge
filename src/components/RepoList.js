import PropTypes from 'prop-types';
import React from 'react';
import {
  List,
  Segment,
  Grid,
  Button,
  Statistic,
  Item,
  Label,
  Icon,
  Divider
} from 'semantic-ui-react'
import {pick, path, compose, tap, map} from 'ramda'
import {emojify} from 'node-emoji'
import moment from 'moment'

//Styling Layout
//TODO: Presentational Grid (Table)

const topLevel = ['name', 'createdAt', 'description', 'isFork', 'url', 'pushedAt']
const nested = ['primaryLanguage', 'stargazers', 'forks', 'owner']
const allFields = pick(topLevel.concat(nested))
const topFields = pick(topLevel)
const language = path(['primaryLanguage', 'name'])
const starGazers = path(['stargazers', 'totalCount'])
const forks = path(['forks', 'totalCount'])
const owner = path(['owner', 'login'])

const repoData = map(compose(x => Object.assign(topFields(x), {
  language: language(x),
  starGazers: starGazers(x),
  forks: forks(x),
  owner: owner(x)
}), allFields))

//TODO: Sort by various fields, scaffold in file, get working, then refactor

const RepoList = ({repos}) => {
  console.log(repoData(repos))
  return (
    <div>
      {repos && repoData(repos).map((repo, index) => (
        <Grid.Row key={index}>
          <Item>
            <Item.Content verticalAlign='middle'>
              <Item.Header as='a' href={repo.url} style={{
                fontSize: '2em'
              }}>
                {repo.name}
              </Item.Header>
              <Item.Meta
                style={{
                fontWeight: 100,
                marginTop: '10px',
                color: 'hsl(221, 61%, 80%)'
              }}>
                Created: {moment(repo.createdAt).format('MMM Do, YYYY')}
              </Item.Meta>
              <Item.Description
                style={{
                marginTop: '1em',
                marginBottom: '1em',
                minWidth: '600px'
              }}>
                <p>{emojify(repo.description)}</p>
                <Statistic size='mini' floated='right'>
                <Statistic.Value>
                  <Icon name='star' color='yellow'/> {repo.starGazers}</Statistic.Value>
                <Statistic.Label>stars</Statistic.Label>
              </Statistic>
              <Statistic size='mini' floated='right'>
                <Statistic.Value>
                  <Icon name='fork' color='grey'/> {repo.forks}</Statistic.Value>
                <Statistic.Label>forks</Statistic.Label>
              </Statistic>

              </Item.Description>
              <Item.Extra>
                <Label icon='code' content={repo.language}/>
                <Label icon='upload' content={`Updated:  ${moment(repo.pushedAt).fromNow()}`}/>

              </Item.Extra>

            </Item.Content>
          </Item>
          <Divider section/>
        </Grid.Row>

      ))}
    </div>
  )
}
RepoList.propTypes = {
  repos: PropTypes.array.isRequired
};

export default RepoList;
