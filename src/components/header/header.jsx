import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import HeaderAuth from '../header-auth';
import HeaderUserView from '../header-user-view';

import classes from './header.module.scss';

const Header = () => {
  const isLoggedIn = useSelector((state) => state.isLoggedIn);

  return (
    <header className={classes.header}>
      <Link to="/" className={classes['header__app-name']}>
        Realworld Blog
      </Link>
      {isLoggedIn ? <HeaderUserView /> : <HeaderAuth />}
    </header>
  );
};

export default Header;
