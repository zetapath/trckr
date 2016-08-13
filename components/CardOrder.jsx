import React from 'react'

export default class CardOrder extends React.Component {

  // -- Render
  render() {
    return (
      <li>
        <strong>{this.props.id}</strong>
        <small>{this.props.createdAt}</small>
      </li>
    )
  }
}
