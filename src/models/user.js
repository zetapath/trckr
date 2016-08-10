import Model from './base'


const extend = (state) => ({

  saveTwitter(props = {}) {
    const provider = 'twitter'

    return state.update({
      query: { provider, username: props.username },
      data: {
        provider,
        username: props.username,
        displayName: props.displayName,
        description: props._json.description,
        avatar: props._json.profile_image_url,
        language: props._json.lang,
        timezone: props._json.time_zone
      },
      upsert: true
    })
  }

})

export default (() => {
  const state = new Model({ file: 'common', key: 'users' })

  return Object.assign(state, extend(state))
})()
