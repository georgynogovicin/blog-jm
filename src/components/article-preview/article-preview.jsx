import React from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { HeartOutlined, HeartFilled } from '@ant-design/icons';
import ReactMarkdown from 'react-markdown';
import { Link } from 'react-router-dom';
import AuthorAvatar from '../author-avatar';
import cropText from '../../services/helpers/crop-text';

import classes from './article-preview.module.scss';

const ArticlePreview = ({ slug, title, body, description, tagList, author, createdAt, favorited, favoritesCount }) => {
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  const singleArticle = useSelector((state) => state.articles.singleArticle);

  const tags =
    tagList.length > 0
      ? tagList.map((item) => {
          return (
            <button disabled={!isLoggedIn} key={item} type="button" className={classes['tag-button']}>
              {cropText(item, 20)}
            </button>
          );
        })
      : null;

  const heart = !favorited ? (
    <HeartOutlined style={{ fontSize: '1rem', color: 'rgba(0, 0, 0, 0.75)' }} />
  ) : (
    <HeartFilled style={{ fontSize: '1rem', color: '#FF0707' }} />
  );

  const descrClass = singleArticle ? '--active' : null;

  return (
    <li className={classes['preview-card']}>
      <div className={classes['preview-card__header-wrapper']}>
        <div className={classes['preview-card__header']}>
          <Link to={`/articles/${slug}`} className={classes['preview-card__header-link']}>
            {title}
          </Link>
          <button type="button" className={classes['like-button']} label="Like">
            {heart}
          </button>
          <span className={classes['preview-card__favorites-count']}>{favoritesCount}</span>
          <div className={classes['preview-card__tags']}>{tags}</div>
          <p className={classes[`preview-card__descr${descrClass}`]}>{description}</p>
        </div>
        <AuthorAvatar author={author} createdAt={createdAt} />
      </div>
      <div className={classes['preview-card__body']}>
        {singleArticle ? <ReactMarkdown>{body}</ReactMarkdown> : null}
      </div>
    </li>
  );
};

ArticlePreview.propTypes = {
  slug: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  tagList: PropTypes.instanceOf(Array).isRequired,
  author: PropTypes.instanceOf(Object).isRequired,
  createdAt: PropTypes.string.isRequired,
  favorited: PropTypes.bool.isRequired,
  favoritesCount: PropTypes.number.isRequired,
  description: PropTypes.string.isRequired,
};

export default ArticlePreview;
