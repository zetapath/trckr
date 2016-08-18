import React from 'react'
import AppBar from '../../appbar'
import CardOrder from './components/CardOrder'

export default class Orders extends React.Component {

  // getInitialState () {
  //   return {
  //     error: null
  //   };
  // }

  // -- Lifecycle
  componentDidMount () {
    const model = new falcor.Model({
      source: new falcor.HttpDataSource('/falcor/model.json')
    })

    model
      .get(['orders', {from: 0, to: 3}, ['id', 'createdAt']])
      // .get("orders[0..3]['id', 'createdAt', 'provider']")
      .then(function(response) {
        console.log('Falcor/orders', response.json.orders)
      });

  }

  // -- Render
  render() {
    const orders = this.props.store || [];

    return (
      <section>
        <AppBar />

        <h2>Your orders ({ orders.length })</h2>
        <ul>
          { orders.map((order) => <CardOrder {...order} />) }
        </ul>
      </section>
    )
  }
}
