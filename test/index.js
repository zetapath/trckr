import { cainiao, dhl } from '../src/providers'

const onError = (error) => console.log('ERROR', error)

const onValue = (value) => console.log('TRCKR', value)

cainiao('LP00056635120304')
  .then(onValue)
  .catch(onError)

// seur('2016010819280164411955')
//   .then( (value) => console.log(value) )
//   .catch(onError)

// dhl('3582210155')
//   .then(onValue)
//   .catch(onError)
