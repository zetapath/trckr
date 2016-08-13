import React from 'react'
import CardOrder from './CardOrder'

export default class Orders extends React.Component {

  // -- Render
  render() {
    return (
      <section>
        <h2>Your orders ({ this.props.store.length })</h2>
        <ul>
          { this.props.store.map((order) => <CardOrder {...order} />) }
        </ul>
      </section>
    )
  }
}
