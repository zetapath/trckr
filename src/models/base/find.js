export default (state) => ({

  find(props = {}) {
    let item
    if (props.limit === 1) {
      item = state.db.get(state.model).find(props.query)
    } else {
      item = state.db
        .get(state.model)
        .filter(props.query)
        .map(props.field)
        .sortBy(props.sortBy)
        .take(props.limit || 4096)
    }

    return item.value()
  }
})
