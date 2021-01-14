import React from 'react';
import { format, parseISO } from 'date-fns';
import PropTypes from 'prop-types';

import noImage from '../../img/box-mockup_1017-8601.jpg';

import classes from './author-avatar.module.scss';

const AuthorAvatar = ({ author: { username, image }, createdAt }) => {
  const getDate = (date) => {
    if (date) {
      return format(parseISO(date), 'MMMM d, yyyy');
    }
    return null;
  };

  return (
    <div className={classes.author}>
      <div>
        <h3 className={classes.author__name}>{username}</h3>
        <p className={classes['author__create-date']}>{getDate(createdAt)}</p>
      </div>
      <img
        onError={(event) => event.target.setAttribute('src', noImage)}
        src={image || noImage}
        alt={`${username} icon`}
        className={classes.author__image}
      />
    </div>
  );
};

AuthorAvatar.defaultProps = {
  createdAt: null,
};

AuthorAvatar.propTypes = {
  author: PropTypes.shape({
    username: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
  }).isRequired,
  createdAt: PropTypes.string,
};

export default AuthorAvatar;
