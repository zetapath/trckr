const provider = 'facebook'

export default (state) => ({

  fromFacebook(props = {}) {
    return state.update({
      query: { provider, providerId: props.id },
      data: {
        provider,
        providerId: props.id,
        username: props.username,
        displayName: props.displayName,
        url: props.profileUrl,
        language: props._json.lang,
        timezone: props._json.time_zone,
      },
      upsert: true,
    });
  },

});
