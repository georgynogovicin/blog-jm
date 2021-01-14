import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Header from '../header';
import ArticleList from '../article-list';
import SingleArticlePage from '../single-article-page';
import SignInForm from '../sign-in-form';
import SignUpForm from '../sign-up-form';
import EditProfile from '../edit-profile';
import { getUserFromLocalStorage } from '../../services/api/localStroage';
import { setLogIn, setCurrentUser, setError } from '../../services/actions/actions';
import request from '../../services/api/api';

import classes from './app.module.scss';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const getUser = async () => {
      const user = getUserFromLocalStorage();

      if (user) {
        const { token } = user;

        try {
          const currentUser = await request.getCurrentUser(token);

          if (currentUser.user) {
            dispatch(setCurrentUser(currentUser.user));
            dispatch(setLogIn());
          }
        } catch (error) {
          dispatch(setError(error));
        }
      }
    };

    getUser();
  }, [dispatch]);

  return (
    <div className={classes.app}>
      <Router>
        <Header />
        <Route path={['/', '/articles']} component={ArticleList} exact />
        <Route path="/articles/:slug" component={SingleArticlePage} exact />
        <Route path="/sign-in" component={SignInForm} exact />
        <Route path="/sign-up" component={SignUpForm} exact />
        <Route path="/profile" component={EditProfile} exact />
      </Router>
    </div>
  );
};

export default App;
