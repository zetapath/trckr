import React from 'react';
import AppBar from '../../appbar';
import style from './app.css';

export default class Orders extends React.Component {

  // -- Render
  render() {
    return (
      <section className={style.root}>
        <AppBar />
        {this.props.children}
      </section>
    );
  }
}
