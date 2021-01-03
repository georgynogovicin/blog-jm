/*eslint-disable */
import React, { useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import ArticlePreview from '../article-preview';
import { getArticles } from '../../services/actions/actions';

import classes from './article-list.module.scss';

const ArticleList = ({ articles, currentPage }) => {
  const dispatch = useDispatch();

  console.log(currentPage);

  useEffect(() => {
    dispatch(getArticles(currentPage));
  }, [dispatch, currentPage]);

  const list = articles.map((item) => {
    const { id, ...props } = item;
    return <ArticlePreview key={id} {...props} />;
  });

  return (
    <main className={classes.content}>
      <ul className={classes['article-list']}>{list}</ul>
    </main>
  );
};

ArticleList.propTypes = {
  articles: PropTypes.instanceOf(Array).isRequired,
  currentPage: PropTypes.number.isRequired,
};

const mapDispatchToProps = (state) => {
  return {
    articles: state.articles.articlesList,
    currentPage: state.currentPage,
  };
};

export default connect(mapDispatchToProps)(ArticleList);
