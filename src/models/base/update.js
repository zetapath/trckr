import uuid from 'uuid'

export default (state) => ({

  update(props) {
    let item = state.db
      .get(state.key)
      .find(props.query)
      .assign(props.data)
      .value()

    if ((!item || !item.id ) && props.data && props.upsert) {
      props.data.id = uuid()
      props.data.createdAt = new Date()
      item = state.db
        .get(state.key)
        .push(props.data)
        .value()[0]
    }

    return item
  }
})
