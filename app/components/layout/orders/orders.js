import React from 'react';
import AppBar from '../../appbar';
import CardOrder from './components/CardOrder';
import style from './orders.css';

const fields = [
  'id',
  'trackingNumber',
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
    const model = new falcor.Model({
      source: new falcor.HttpDataSource('/falcor/model.json'),
    })

    model
      .get(['orders', { from: 0, to: 32 }, fields])
      .then((response) => {
        this.setState({ orders: response.json.orders });
      });
  }

  // -- Render
  render() {
    const orders = this.state.orders;
    return (
      <section>
        <AppBar />
        <h2>Your orders ({ orders.length })</h2>
        <ul className={style.list}>
          { Object.keys(orders).map((key) => <CardOrder key={key} {...orders[key]} />) }
        </ul>
      </section>
    );
  }
}
