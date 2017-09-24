import React from 'react'
import PropTypes from 'prop-types'
import {path, compose, tap, isNil, map} from 'ramda'
import {withState, withHandlers, withProps} from 'recompose';
import { Search } from 'semantic-ui-react'


const addState = withState('state', 'stateChangeHandler', {} )

const addHandlers = withHandlers({
    handleSearch: ({state, stateChangeHandler}) => (e,data) => 
        stateChangeHandler({
            searchString: e.target.value
        }),

})

const SearchService = ({loading, users, refetch, variables, handleSearch, state, login }) => {
console.log(users, state)
    return(
<Search
    loading={loading}
    onResultSelect={(e, { result }) =>  {console.log('result selected', result.title ); console.log(e); handleSearch({target: {value: result.title}})}}
    onSearchChange={x => {handleSearch(x); refetch({login: x.target.value}) }}
    results={users ? map(x => Object.assign({}, {title: x.login}), users ) : users }
    value={state.searchString || ''}
  />
    )
}



export default compose(addState,addHandlers)(SearchService)