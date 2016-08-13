import Model from '../base'
import fromTwitter from './fromTwitter'

export default (() => {
  const state = new Model({ file: 'common', key: 'users' })

  return Object.assign(
    state,
    fromTwitter(state)
  )
})()
