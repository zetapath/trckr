import React from 'react';
import style from './order.css';
import model from '../../../modules/model'

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

export default class Order extends React.Component {

  constructor() {
    super();
    this.state = {
      loading: true,
      order: {},
    };
  }

  // -- Lifecycle
  componentWillMount() {
    this.setState({ loading: true });
    const id = this.props.params.id;
    model
      .get(`order['${id}']['id', 'createdAt']`)
      .then((response) => {
        if (response.json && response.json.order) {
          this.setState({
            loading: false,
            order: response.json.order[id],
          });
        }
      });
  }

  // -- Render
  render() {
    return (
      <section className={style.root}>
        <h1>Order info</h1>
        {
          this.state.loading ? 'loading' : undefined
        }
        <h2>{this.state.order.id}</h2>
        <strong>{this.state.order.createdAt}</strong>
      </section>
    );
  }
}
