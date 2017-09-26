import React from 'react'
import PropTypes from 'prop-types'
import {Input} from 'semantic-ui-react'

const Filter = ({filterString, onChange}) => (<Input
    icon='filter'
    placeholder='Filter Repos ...'
    onChange={onChange}
    value={filterString}/>)

Filter.proptypes = {
    onChange: PropTypes.func.isRequired,
    data: PropTypes.string
}

export default Filter