/*eslint-disable */
import React from 'react';
import { connect, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { parseISO, format } from 'date-fns';
import { HeartOutlined, HeartFilled } from '@ant-design/icons';
import ReactMarkdown from 'react-markdown';
import { Link } from 'react-router-dom';

import classes from './article-preview.module.scss';

import noImage from '../../img/box-mockup_1017-8601.jpg';

const ArticlePreview = ({
  slug,
  title,
  body,
  description,
  tagList: [first, second],
  author: { username, image },
  createdAt,
  favorited,
  favoritesCount,
  isLoggedIn,
  singleArticle,
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

  const heart = !favorited ? (
    <HeartOutlined style={{ fontSize: '1rem', color: 'rgba(0, 0, 0, 0.75)' }} />
  ) : (
    <HeartFilled style={{ fontSize: '1rem', color: '#FF0707' }} />
  );

  const descClass = singleArticle ? '--active' : null;

  return (
    <li className={classes['preview-card']}>
      <div className={classes['preview-card__body']}>
        <div className={classes['preview-card__header-wrapper']}>
          <Link to={`/articles/${slug}`} className={classes['preview-card__header']}>
            {title}
          </Link>
          <button type="button" className={classes['like-button']} label="Like">
            {heart}
          </button>
          <span className={classes['favorites-count']}>{favoritesCount}</span>
        </div>
        {tagButtonFirst}
        {tagButtonSecond}
        <span className={classes[`preview-card__descr${descClass}`]}>{description}</span>
        {singleArticle ? <ReactMarkdown children={body} /> : null}
      </div>
      <div className={classes.author}>
        <h3 className={classes.author__name}>{username}</h3>
        <p className={classes['author__create-date']}>{format(date, 'MMMM d, yyyy')}</p>
      </div>
      <img src={userImage} alt={`${username} icon`} className={classes.image} />
    </li>
  );
};

ArticlePreview.defaultProps = {
  singleArticle: null,
};

ArticlePreview.propTypes = {
  slug: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  tagList: PropTypes.instanceOf(Array).isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
  author: PropTypes.instanceOf(Object).isRequired,
  createdAt: PropTypes.string.isRequired,
  favorited: PropTypes.bool.isRequired,
  favoritesCount: PropTypes.number.isRequired,
  description: PropTypes.string.isRequired,
  singleArticle: PropTypes.instanceOf(Object),
};

const mapDispatchToProps = (state) => {
  return {
    isLoggedIn: state.isLoggedIn,
    singleArticle: state.articles.singleArticle,
  };
};

export default connect(mapDispatchToProps)(ArticlePreview);
