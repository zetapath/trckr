export default (state) => ({

  reset() {
    state.db
      .set(state.key, [])
      .value();
  },

});
