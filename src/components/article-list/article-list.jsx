import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Spin, Pagination } from 'antd';
import ArticlePreview from '../article-preview';
import { getArticles, setPage } from '../../services/actions/actions';

import classes from './article-list.module.scss';

const ArticleList = () => {
  const dispatch = useDispatch();
  const articles = useSelector((state) => state.articles.articlesList);
  const currentPage = useSelector((state) => state.currentPage);
  const articlesCount = useSelector((state) => state.articles.articlesCount);

  useEffect(() => {
    dispatch(getArticles(currentPage));
  }, [dispatch, currentPage]);

  const onChange = (pageNumber) => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
    if (pageNumber !== 1) {
      dispatch(setPage(pageNumber * 10));
    } else {
      dispatch(setPage(0));
    }
  };

  const page = currentPage === 0 ? 1 : currentPage / 10;

  const list = articles.map((item) => {
    const { id, ...props } = item;
    return <ArticlePreview key={id} {...props} />;
  });

  const spinner = !list.length ? <Spin style={{ position: 'absolute', top: '50%', left: '50%' }} size="large" /> : null;
  const pagination = list.length ? (
    <Pagination
      current={page}
      total={articlesCount}
      size="medium"
      showSizeChanger={false}
      style={{ textAlign: 'center', paddingBottom: '28px' }}
      onChange={onChange}
    />
  ) : null;

  return (
    <main className={classes.content}>
      <ul className={classes['article-list']}>
        {list}
        {pagination}
      </ul>
      {spinner}
    </main>
  );
};

export default ArticleList;
