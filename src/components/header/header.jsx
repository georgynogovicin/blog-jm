import React from 'react';

import classes from './header.module.scss';

const Header = () => {
  return (
    <header className={classes.header}>
      <h1 className={classes['header__app-name']}>Realworld Blog</h1>
      <h2 className={classes.header__info}>Sign In</h2>
      <button type="button" className={classes['btn-sign-up']}>
        Sign Up
      </button>
    </header>
  );
};

export default Header;
