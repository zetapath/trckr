export default (state) => ({

  find(props = {}) {
    const method = props.unique ? 'find' : 'filter'

    return state.db
      .get(state.model)
      .filter(props.query)
      .map(props.field)
      .sortBy(props.sortBy)
      .take(props.limit || 4096)
      .value()
  }
})
