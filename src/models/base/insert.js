import uuid from 'uuid'

export default (state) => ({

  insert(props = {}) {
    props.id = uuid()
    props.createdAt = new Date()
    let item = state.db
      .get(state.key)
      .push(props)
      .value()

    return item[0]
  }
})
