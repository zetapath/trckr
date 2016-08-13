import Model from '../base'
import saveCainiao from './saveCainiao'

export default (() => {
  const state = new Model({ file: 'common', key: 'orders' })

  return Object.assign(
    state,
    saveCainiao(state)
  )
})()
