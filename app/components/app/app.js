import React from 'react';
import { Button } from 'react-toolbox/lib/button';
import Tooltip from 'react-toolbox/lib/tooltip';
import AppBar from './components/AppBar';
import DialogNewOrder from './components/DialogNewOrder';
import style from './app.css';

const TooltipButton = Tooltip(Button);

export default class Orders extends React.Component {

  constructor() {
    super();
    this.state = { dialog: false };
  }

  handleToggle = () => {
    this.setState({ dialog: !this.state.dialog });
  }

  // -- Render
  render() {
    return (
      <section className={style.root}>
        <AppBar />
        <TooltipButton
          icon='add'
          tooltip='New package'
          className={style.newOrder}
          floating
          accent
          onClick={this.handleToggle}
        />
        <DialogNewOrder
          active={this.state.dialog}
          onClose={this.handleToggle}
        />
        {this.props.children}
      </section>
    );
  }
}
