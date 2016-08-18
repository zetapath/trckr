import React from 'react'

export default class CardOrder extends React.Component {

  // -- Render
  render() {
    return (
      <li>
        <a href={`/order/${this.props.id}`}>{this.props.id}</a>
        <small>{this.props.delivered}</small>
        <small>{this.props.createdAt}</small>
      </li>
    )
  }
}
