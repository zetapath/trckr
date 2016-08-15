import Model from '../base'
import cainiao from './orderCainiao'

export default (() => {
  const state = new Model({ file: 'common', key: 'orders' })

  return Object.assign(
    state,
    cainiao(state)
  )
})()
