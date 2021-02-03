import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Spin, Pagination } from 'antd';
import ArticlePreview from '../article-preview';
import { getArticles, setPage, setArticlesIsUnloaded } from '../../services/actions/actions';

import classes from './article-list.module.scss';

const ArticleList = () => {
  const dispatch = useDispatch();
  const articles = useSelector((state) => state.articles.articlesList);
  const currentPage = useSelector((state) => state.currentPage);
  const articlesCount = useSelector((state) => state.articles.articlesCount);
  const authToken = useSelector((state) => state.currentUser.token);
  const isLoaded = useSelector((state) => state.articles.articlesIsLoaded);

  useEffect(() => {
    dispatch(getArticles(currentPage, authToken));
  }, [dispatch, currentPage, authToken]);

  const onChange = (pageNumber) => {
    dispatch(setArticlesIsUnloaded());
    if (pageNumber !== 1) {
      dispatch(setPage(pageNumber * 10));
    } else {
      dispatch(setPage(0));
    }
  };

  const page = currentPage === 0 ? 1 : currentPage / 10;

  const list = articles.map((item) => {
    const { slug, ...article } = item;
    return <ArticlePreview key={slug} isList article={article} slug={slug} />;
  });

  const spinner = <Spin style={{ position: 'absolute', top: '50%', left: '50%' }} size="large" />;
  const pagination = list.length ? (
    <Pagination
      current={page}
      total={articlesCount}
      size="medium"
      showSizeChanger={false}
      className={classes.pagination}
      onChange={onChange}
    />
  ) : null;

  return (
    <main className={classes.content}>
      <ul className={classes['article-list']}>
        {!isLoaded || list}
        {!isLoaded || pagination}
      </ul>
      {isLoaded || spinner}
    </main>
  );
};

export default ArticleList;
