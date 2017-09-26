import React from 'react'
import PropTypes from 'prop-types'
import {map} from 'ramda'
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
    results={users
    ? map(user => Object.assign({}, {
        title: user.login,
        description: user.bio,
        image: user.avatarUrl,
        price: user
            .repositories
            .totalCount
            .toString()
    }), users)
    : users}
    value={searchString || ''}/>)

SearchService.propTypes = {
    users: PropTypes.array,
    login: PropTypes.string,
    handleSearch: PropTypes.func.isRequired,
    handleSelect: PropTypes.func.isRequired,
    searchString: PropTypes.string,
}
export default SearchService