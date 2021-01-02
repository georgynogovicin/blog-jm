import React from 'react';
import { Pagination } from 'antd';
import Header from '../header';
import ArticleList from '../article-list';

import classes from './app.module.scss';

const App = () => {
  return (
    <div className={classes.app}>
      <Header />
      <ArticleList />
      <Pagination />
    </div>
  );
};

export default App;
