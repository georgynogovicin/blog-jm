import React, { useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { Spin, Pagination } from 'antd';
import ArticlePreview from '../article-preview';
import { getArticles, setPage } from '../../services/actions/actions';

import classes from './article-list.module.scss';

const ArticleList = ({ articles, currentPage, articlesCount }) => {
  const dispatch = useDispatch();

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

ArticleList.propTypes = {
  articles: PropTypes.instanceOf(Array).isRequired,
  currentPage: PropTypes.number.isRequired,
  articlesCount: PropTypes.number.isRequired,
};

const mapDispatchToProps = (state) => {
  return {
    articles: state.articles.articlesList,
    currentPage: state.currentPage,
    articlesCount: state.articles.articlesCount,
  };
};

export default connect(mapDispatchToProps)(ArticleList);
