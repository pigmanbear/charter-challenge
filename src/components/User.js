import React from 'react'
import PropTypes from 'prop-types'

const User = ({ user }) => (
      <div>
      <p>
        <b>User:</b> {user}
      </p>
    </div>
)

User.propTypes = {
  user: PropTypes.string.isRequired
};

export default User;

