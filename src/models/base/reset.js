export default (state) => ({

  reset() {
    state.db
      .set(state.model, [])
      .value()
  }

})
