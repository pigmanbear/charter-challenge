import React from 'react'
import PropTypes from 'prop-types'
import {path, compose, tap, isNil, map} from 'ramda'
import {withState, withHandlers, withProps} from 'recompose';
import {Search} from 'semantic-ui-react'

const SearchService = ({
    loading,
    users,
    handleSearch,
    handleSelect,
    searchString,
    login
}) => (<Search
    loading={loading}
    onResultSelect={(e, {result}) => handleSelect(result.title)}
    onSearchChange={handleSearch}
    results={tap(console.log,users)
    ? map(user => Object.assign({}, {
        title: user.login,
        description: user.bio,
        image: user.avatarUrl,
        price: user.repositories.totalCount.toString()
    }), users)
    : users}
    value={searchString || ''}/>)

export default SearchService