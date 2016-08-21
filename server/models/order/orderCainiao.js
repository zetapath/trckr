import moment from 'moment';

const provider = 'cainiao';

export default (state) => ({

  cainiao(props = {}, user, title) {
    const query = { provider, trackingNumber: props.mailNo };

    const data = {
      provider,
      title,
      user,
      trackingNumber: props.mailNo,
      description: props.statusDesc,
      status: props.status,
      delivered: (props.status.toLowerCase() === 'signin'),
      packages: undefined,
      origin: {
        id: props.section1.mailNo,
        value: props.section1.countryName,
        url: props.section1.url },
      destination: {
        id: props.section2.mailNo,
        value: props.section2.countryName,
        url: props.section2.url },
    };

    const checkpoints = props.section1.detailList.concat(props.section2.detailList);
    data.checkpoints = checkpoints.map(checkpoint => ({
      location: undefined,
      description: checkpoint.desc,
      status: checkpoint.status,
      created_at: moment(checkpoint.time).format(),
    }));

    if (user) {
      query.user = user;
    }
    return state.update({ query, data, upsert: true });
  },

});
