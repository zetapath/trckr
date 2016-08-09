export default (state) => ({

  remove(props = {}) {
    return state.db.get(state.model)
      .remove(props.query)
      .value()
  }
})
