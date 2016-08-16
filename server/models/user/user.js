import Model from '../base'
import fromFacebook from './fromFacebook'
import fromTwitter from './fromTwitter'

export default (() => {
  const state = new Model({ file: 'common', key: 'users' })

  return Object.assign(
    state,
    fromFacebook(state),
    fromTwitter(state)
  )
})()
