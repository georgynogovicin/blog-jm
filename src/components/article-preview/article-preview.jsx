import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { parseISO, format } from 'date-fns';
import cropText from '../../services/helpers/crop-text';

import classes from './article-preview.module.scss';

import noImage from '../../img/box-mockup_1017-8601.jpg';

const ArticlePreview = ({
  title,
  body,
  tagList: [first, second],
  author: { username, image },
  createdAt,
  isLoggedIn,
}) => {
  const tagButtonFirst = first ? (
    <button disabled={!isLoggedIn} type="button" className={classes['tag-button']}>
      {first}
    </button>
  ) : null;
  const tagButtonSecond = second ? (
    <button disabled={!isLoggedIn} type="button" className={classes['tag-button']}>
      {second}
    </button>
  ) : null;

  const date = parseISO(createdAt);
  const userImage = image || noImage;

  return (
    <li className={classes['preview-card']}>
      <div className={classes['preview-card__body']}>
        <h3 className={classes['preview-card__header']}>{title}</h3>
        {tagButtonFirst}
        {tagButtonSecond}
        <p className={classes['preview-card__text']}>{cropText(body, 280)}</p>
      </div>
      <div className={classes.author}>
        <h3 className={classes.author__name}>{username}</h3>
        <p className={classes['author__create-date']}>{format(date, 'MMMM d, yyyy')}</p>
      </div>
      <img src={userImage} alt={`${username} icon`} className={classes.image} />
    </li>
  );
};

ArticlePreview.propTypes = {
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  tagList: PropTypes.instanceOf(Array).isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
  author: PropTypes.instanceOf(Object).isRequired,
  createdAt: PropTypes.string.isRequired,
};

const mapDispatchToProps = (state) => {
  return {
    isLoggedIn: state.isLoggedIn,
  };
};

export default connect(mapDispatchToProps)(ArticlePreview);
