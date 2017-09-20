import PropTypes from 'prop-types';
import React from 'react';

const RepoList = ({ user, repos }) => (
  <div>
    <p>
      <b>User:</b> {user}
    </p>
    <ul>
      {repos && repos.map((repo, index) => (
        <li key={index}>
          {repo.name}
        </li>
      ))}
    </ul>
  </div>
);

RepoList.propTypes = {
  user: PropTypes.string.isRequired,
  repos: PropTypes.array.isRequired
};

export default RepoList;
