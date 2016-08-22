import React from 'react';
import { Link } from 'react-router';
import AppBar from 'react-toolbox/lib/app_bar';
import Navigation from 'react-toolbox/lib/navigation';
import session from '../../../modules/session';
import style from './AppBar.css';

export default (props) => {
  return (
    <AppBar fixed flat className={style.root}>
      <Link to='/' className={style.brand}>Trckr</Link>
      <Navigation type='horizontal' className={style.navigation}>
        { !session ? <Link to='/signin' activeClassName={style.active}>Sign In</Link> : null }
        { session ? <Link to='/orders' activeClassName={style.active}>Orders</Link> : null }
        { session ? <Link to='/profile' activeClassName={style.active}>profile</Link> : null }
      </Navigation>
    </AppBar>
  );
};
