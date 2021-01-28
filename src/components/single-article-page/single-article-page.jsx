import React, { useEffect } from 'react';
import { Spin } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getSingleArticle, removeSingleArticle, setSingleArticleIsUnloaded } from '../../services/actions/actions';
import ArticlePreview from '../article-preview';

import classes from './single-artcile-page.module.scss';

const SingleArticlePage = () => {
  const { slug } = useParams();
  const dispatch = useDispatch();
  const authToken = useSelector((state) => state.currentUser.token);
  const isLoaded = useSelector((state) => state.articles.singleArticleIsLoaded);
  const article = useSelector((state) => state.articles.singleArticle);

  useEffect(() => {
    dispatch(getSingleArticle(slug, authToken));
    return () => {
      dispatch(removeSingleArticle());
      dispatch(setSingleArticleIsUnloaded());
    };
  }, [authToken, slug, dispatch]);

  const spinner = <Spin style={{ position: 'absolute', top: '50%', left: '50%' }} size="large" />;

  return (
    <main className={classes.content}>
      {!isLoaded || (
        <ul className={classes['article-list']}>
          <ArticlePreview slug={slug} isList={false} article={article} />
        </ul>
      )}
      {isLoaded || spinner}
    </main>
  );
};

export default SingleArticlePage;
