import React from 'react';
import model from '../../modules/model'
import style from './order.css';

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
      .get(`order['${id}']['id', 'trackingNumber', 'title', 'description', 'status', 'delivered', 'updatedAt']`)
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
    const order = this.state.order;
    return (
      <article className={style.root}>
        { this.state.loading ? 'loading' : undefined }
        <div className={style.header}>
          <h3>{order.title}</h3>
          <small>{order.trackingNumber}</small>
        </div>
        <ul>
          <li>{order.updatedAt}</li>
          <li>{order.status}</li>
          <li>{order.description}</li>
        </ul>
      </article>
    );
  }
}
