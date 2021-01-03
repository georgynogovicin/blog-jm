import React from 'react';
import { connect, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { Pagination } from 'antd';
import Header from '../header';
import ArticleList from '../article-list';
import { setPage } from '../../services/actions/actions';

import classes from './app.module.scss';

const App = ({ articlesCount, currentPage }) => {
  const dispatch = useDispatch();

  const onChange = (pageNumber) => {
    if (pageNumber !== 1) {
      dispatch(setPage(pageNumber * 10));
    } else {
      dispatch(setPage(0));
    }
    // pageNumber === 1 ? dispatch(setPage(0)) : dispatch(setPage(pageNumber * 10));
  };

  const page = currentPage === 0 ? 1 : currentPage / 10;

  return (
    <div className={classes.app}>
      <Header />
      <ArticleList />
      <Pagination
        current={page}
        total={articlesCount}
        size="medium"
        showSizeChanger={false}
        style={{ textAlign: 'center', paddingBottom: '28px' }}
        onChange={onChange}
      />
    </div>
  );
};

App.propTypes = {
  articlesCount: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
};

const mapDispatchToProps = (state) => {
  return {
    articlesCount: state.articles.articlesCount,
    currentPage: state.currentPage,
  };
};

export default connect(mapDispatchToProps)(App);
