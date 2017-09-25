import React from 'react'
import {Input} from 'semantic-ui-react'

const Filter = ({data, onChange}) => (
    <Input
        icon='filter'
        placeholder='Filter Repos ...'
        onChange={onChange}
        value={data}/>
)

export default Filter