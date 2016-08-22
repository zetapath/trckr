import React from 'react';
import model from '../../../modules/model';
import { Button } from 'react-toolbox/lib/button';
import Dialog from 'react-toolbox/lib/dialog';
import Input from 'react-toolbox/lib/input';

export default class Orders extends React.Component {

  constructor() {
    super();
    this.state = {
      trackingNumber: undefined,
      title: undefined,
      actions: [
        { label: 'Cancel', onClick: this.handleClose },
        { label: 'Save', onClick: this.handleSave, disabled: true },
      ],
    };
  }

  // -- Events
  handleSave = () => {
    model
      .call(['order', 'add'], [this.state.trackingNumber, this.state.title], ['id', 'title'])
      .then((response) => {
        console.log('Falcor/order.add', response.json.order);
      });
  }

  handleClose = () => {
    this.props.onClose();
  }

  handleChange = (name, value) => {
    const actions = this.state.actions;
    actions[1].disabled = !(this.state.trackingNumber && this.state.title);
    this.setState({ ...this.state, [name]: value, actions });
  }

  // -- Render
  render() {
    return (
      <Dialog
        actions={this.state.actions}
        active={this.props.active}
        onEscKeyDown={this.props.onClose}
        onOverlayClick={this.props.onClose}
        title='New Order'
      >
        <p>Here you can add arbitrary content. Components like Pickers are using dialogs now.</p>
        <Input
          hint='Type the tracking number of the company'
          label='Tracking Number'
          name='trackingNumber'
          onChange={this.handleChange.bind(this, 'trackingNumber')}
          maxLength={32}
          required
          type='text'
          value={this.state.trackingNumber}
        />
        <Input
          hint='Type to be specific'
          label='Description'
          name='description'
          maxLength={128}
          multiline
          onChange={this.handleChange.bind(this, 'title')}
          required
          type='text'
          value={this.state.title}
        />
      </Dialog>
    );
  }
}
