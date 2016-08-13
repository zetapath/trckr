import moment from 'moment'

const provider = 'cainiao'

export default (state) => ({

  saveCainiao(props = {}, user) {
    // -- Process Element
    const order = {
      user,
      provider,
      trackingNumber: props.mailNo,
      description: props.statusDesc,
      status: props.status,
      packages: undefined,
      origin: {
        id: props.section1.mailNo,
        value: props.section1.countryName,
        url: props.section1.url },
      destination: {
        id: props.section2.mailNo,
        value: props.section2.countryName,
        url: props.section2.url }
    }

    const checkpoints = props.section1.detailList.concat(props.section2.detailList)
    order.checkpoints = checkpoints.map(checkpoint => ({
      location: undefined,
      description: checkpoint.desc,
      status: checkpoint.status,
      created_at: moment(checkpoint.time).format()
    }))

    return state.update({
      query: { user, provider, trackingNumber: props.mailNo },
      data: order,
      upsert: true
    })
  }
})
