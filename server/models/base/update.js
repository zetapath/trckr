import uuid from 'uuid';

export default (state) => ({

  update(props) {
    props.data.updatedAt = new Date();
    let item = state.db
      .get(state.key)
      .find(props.query)
      .assign(props.data)
      .value();


    if ((!item || !item.id) && props.data && props.upsert) {
      const id = uuid();
      props.data.id = id;
      props.data.createdAt = new Date();
      delete props.data.updatedAt;

      item = state.db
        .get(state.key)
        .push(props.data)
        .find({ id })
        .value();
    }

    return item;
  },

});
