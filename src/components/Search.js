import React from 'react'
import PropTypes from 'prop-types'
import {path, compose, tap, isNil, map} from 'ramda'
import {withState, withHandlers, withProps} from 'recompose';
import { Search } from 'semantic-ui-react'


// const addState = withState('state', 'stateChangeHandler', {} )

// const addHandler = withHandlers({
//     handleResultSelect: (e, d) => { 
//         console.log(e)
//         console.log(d)
//     }

// })

const SearchService = ({loading, users, refetch, variables, handleSearch, handleSelect, searchString, state, login }) => (

<Search
    loading={loading}
    onResultSelect={(e,{ result }) => handleSelect(result.title)}
    onSearchChange={handleSearch}
    results={users ? map(x => Object.assign({}, {title: x.login}), users ) : users }
    value={searchString || ''}
  />
)


 

export default SearchService