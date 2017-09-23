import React from 'react'
import PropTypes from 'prop-types'

const User = ({ user }) => (
      <div>
      <p>
        <b>User:</b> {user.login}
      </p>
      <b>Total Repository Count: </b> {user.repoCount}
    </div>
)

User.propTypes = {
  user: PropTypes.object.isRequired
};

export default User;

