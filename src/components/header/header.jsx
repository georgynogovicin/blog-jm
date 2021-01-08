import React from 'react';
import { Link } from 'react-router-dom';

import classes from './header.module.scss';

const Header = () => {
  return (
    <header className={classes.header}>
      <Link to="/" className={classes['header__app-name']}>
        Realworld Blog
      </Link>
      <Link to="/sign-in" className={classes.header__info}>
        Sign In
      </Link>
      <Link to="/sign-up" className={classes['btn-sign-up']}>
        Sign Up
      </Link>
    </header>
  );
};

export default Header;
