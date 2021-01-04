import React from 'react';
// import { BrowserRouter as Router, Route } from 'react-router-dom';
import Header from '../header';
import ArticleList from '../article-list';

import classes from './app.module.scss';

const App = () => {
  return (
    <div className={classes.app}>
      <Header />
      <ArticleList />
    </div>
  );
};

export default App;
