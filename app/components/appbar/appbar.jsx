import React from 'react';
import { Link } from 'react-router';
import AppBar from 'react-toolbox/lib/app_bar';
import { Button } from 'react-toolbox/lib/button';
import Navigation from 'react-toolbox/lib/navigation';
import Tooltip from 'react-toolbox/lib/tooltip';
import style from './appbar.css';

const TooltipButton = Tooltip(Button);

export default (props) => {
  return (
    <AppBar fixed flat className={style.root}>
      <Link to='/' className={style.brand}>Trckr</Link>

      <Navigation type='horizontal' className={style.navigation}>
        <Link activeClassName='active' to='/signin'>Sign In</Link>
        <Link to='/orders' active>Orders</Link>
      </Navigation>

      <TooltipButton icon='add' tooltip='Add a new package' floating accent />
    </AppBar>
  );
};
