import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { HeartOutlined, HeartFilled } from '@ant-design/icons';
import ReactMarkdown from 'react-markdown';
import { Link, useHistory } from 'react-router-dom';
import { Popconfirm } from 'antd';
import AuthorAvatar from '../author-avatar';
import cropText from '../../services/helpers/crop-text';
import request from '../../services/api/api';
import { setError } from '../../services/actions/actions';
import { redirectToArticles, redirectToEditArticle, redirectToSignIn } from '../../services/routes/routes';

import classes from './article-preview.module.scss';

const ArticlePreview = ({ isList, article }) => {
  const [singleArticle, setSingleArticle] = useState(article);

  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  const currentUser = useSelector((state) => state.currentUser);
  const authToken = useSelector((state) => state.currentUser.token);

  const dispatch = useDispatch();

  const history = useHistory();

  const { slug, title, body, description, tagList, author, createdAt, favorited, favoritesCount } = singleArticle;

  useEffect(() => {
    setSingleArticle(article);
  }, [article]);

  const onDeleteArticle = () => {
    request.deleteArticle(slug, authToken);
    history.push(redirectToArticles());
  };

  const onEditArticle = () => {
    history.push(redirectToEditArticle(slug));
  };

  const favoriteArticleHandler = async () => {
    try {
      if (isLoggedIn) {
        const res = await request.favoriteArticle(slug, authToken, favorited);
        setSingleArticle(res.article);
      } else {
        history.push(redirectToSignIn());
      }
    } catch (error) {
      dispatch(setError(error));
    }
  };

  const isOwnArticle = currentUser.username === author.username && !isList;

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

  return (
    <li className={classes['preview-card']}>
      <div className={classes['preview-card__header-wrapper']}>
        <div className={classes['preview-card__header']}>
          <Link to={`/articles/${slug}`} className={classes['preview-card__header-link']}>
            {title}
          </Link>
          <button type="button" className={classes['like-button']} label="Like" onClick={favoriteArticleHandler}>
            {heart}
          </button>
          <span className={classes['preview-card__favorites-count']}>{favoritesCount}</span>
          <div className={classes['preview-card__tags']}>{tags}</div>
          <p className={classes[`preview-card__descr${isList || '--active'}`]}>{description}</p>
        </div>
        <div className={classes.author}>
          <AuthorAvatar author={author} createdAt={createdAt} />
          {isOwnArticle && (
            <div className={classes['author__edit-block']}>
              <Popconfirm
                title="Are you sure to delete this article?"
                placement="rightTop"
                okText="Yes"
                cancelText="No"
                onConfirm={onDeleteArticle}
              >
                <button type="button" className={classes['edit-button']}>
                  Delete
                </button>
              </Popconfirm>
              <button type="button" className={classes['delete-button']} onClick={onEditArticle}>
                Edit
              </button>
            </div>
          )}
        </div>
      </div>
      <div className={classes['preview-card__body']}>{isList || <ReactMarkdown>{body}</ReactMarkdown>}</div>
    </li>
  );
};

ArticlePreview.propTypes = {
  article: PropTypes.instanceOf(Object).isRequired,
  isList: PropTypes.bool.isRequired,
};

export default ArticlePreview;
