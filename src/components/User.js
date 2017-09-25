import React from 'react'
import PropTypes from 'prop-types'
import {Item, Icon} from 'semantic-ui-react'

const User = ({user}) => (
    <Item.Group>
        <Item>
            <Item.Image size='small' src={user.avatarUrl}/>
            <Item.Content
                verticalAlign='middle'
                style={{
                width: '70%'
            }}>
                <Item.Header>{user.login}</Item.Header>
                <Item.Meta>
                    <Icon name='folder'/> {user
                        .repoCount
                        .toString()
}</Item.Meta>
                <Item.Description>{user.bio}</Item.Description>
                <Item.Extra><Icon name='users'/> {user
                        .followers
                        .toString()
}</Item.Extra>
            </Item.Content>

        </Item>
    </Item.Group>
)

User.propTypes = {
    user: PropTypes.object.isRequired
};

export default User;
