import PropTypes from 'prop-types';
import React from 'react';
import {
  Grid,
  Statistic,
  Item,
  Label,
  Icon,
  Divider,
  Button
} from 'semantic-ui-react'
import {
  pick,
  path,
  compose,
  map,
  toLower,
  prop,
  sortWith,
  ascend,
  concat,
  prepend,
  reverse,
  filter
} from 'ramda'
import {emojify} from 'node-emoji'
import moment from 'moment'
import fuzzysearch from 'fuzzysearch'
import User from './User'

const fuzzy = searchString => item => fuzzysearch(toLower(searchString), toLower(item))

const topLevel = [
  'name',
  'createdAt',
  'pushedAt',
  'description',
  'url',
  'isFork'
]
const secondLevel = ['language', 'starGazers', 'forks', 'owner']
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

const sortList = (x) => sortWith(compose(map(ascend), map(prop), prepend(x), filter(y => y !== x))(concat(topLevel, secondLevel)))
const transformList = (sortString, order) => compose(d => order
  ? d
  : reverse(d), d => sortString
  ? sortList(sortString)(d)
  : d, repoData)

const ButtonExampleButton = ({loadMore, noMore, total}) => (
  <Button
    content={noMore
    ? 'All Loaded'
    : 'Load More Results'}
    icon='folder'
    label={{
    as: 'a',
    basic: true,
    content: total
  }}
    labelPosition='right'
    onClick={loadMore}
    disabled={noMore}
    />
)

const RepoList = ({
  loading,
  user,
  repos,
  login,
  filterString,
  sortString,
  sortOrder,
  pageInfo,
  loadMoreRepos
}) => {
  return (

    <div>
      <Grid.Row>
        <Grid.Column stretched>
          <User user={user}/>
        </Grid.Column>
      </Grid.Row>
      <Divider section style={{
        marginBottom: '1em'
      }}/>
      <ButtonExampleButton
        loadMore={loadMoreRepos}
        noMore={repos.length === user.repoCount}
        total={repos.length}/>
      <Item.Group>
        {repos && (transformList(sortString, sortOrder)(repos))
          .filter(x => fuzzy(filterString || '')(x.name))
          .map((repo, index) => (
            <Grid.Row key={index}>
              <Item>
                <Item.Content verticalAlign='middle'>
                  <Item.Header
                    as='a'
                    href={repo.url}
                    style={{
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
                    <p style={{
                      width: '80%'
                    }}>{emojify(repo.description)}</p>
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
                    <Label icon='upload' content={`Updated: ${moment(repo.pushedAt).fromNow()}`}/>

                  </Item.Extra>

                </Item.Content>
              </Item>
              <Divider section/>
            </Grid.Row>
          ))}

      </Item.Group>
    </div>
  )
}
RepoList.propTypes = {
  repos: PropTypes.array.isRequired,
  user: PropTypes.object.isRequired,
  sortOrder: PropTypes.bool,
  filterString: PropTypes.string,
  sortString: PropTypes.string,
  login: PropTypes.string
};

export default RepoList;
