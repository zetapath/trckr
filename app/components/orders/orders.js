import React from 'react';
import CardOrder from './components/CardOrder';
import style from './orders.css';
import model from '../../modules/model'

const fields = [
  'id',
  'provider',
  'trackingNumber',
  'title',
  'status',
  'description',
  'origin.value',
  'destination.value',
  'updatedAt',
];

export default class Orders extends React.Component {

  constructor() {
    super();
    this.state = { orders: {} };
  }

  // -- Lifecycle
  componentWillMount() {
    model
      .get(['orders', { from: 0, to: 32 }, fields])
      .then((response) => {
        this.setState({ orders: response.json.orders });
      });
  }

  // -- Events
  handleToggle = () => {
    this.setState({ active: !this.state.active });
  }

  // -- Render
  render() {
    const orders = this.state.orders;
    return (
      <ul className={style.root}>
        { Object.keys(orders).map((key) => <CardOrder key={key} {...orders[key]} />) }
      </ul>
    );
  }
}
