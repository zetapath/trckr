const provider = 'twitter'

export default (state) => ({

  fromTwitter(props = {}) {
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
