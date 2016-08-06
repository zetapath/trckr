import fetch from 'node-fetch'
import moment from 'moment'

const URL = 'http://www.dhl.com/shipmentTracking?languageCode=en&AWB='
const dateFormat = 'dddd, MMMM DD, YYYY hh:mm'

export default function(TrackingNumber) {
  return new Promise((resolve, reject) => {
    fetch(`${URL}${TrackingNumber}`)
      .then((response) => response.json())
      .then((json) => {
        if (json.results && json.results.length > 0) {
          const data = json.results[0]

          const state = {
            id: data.id,
            description: data.description,
            status: data.delivery.status,
            packages: data.pieces.value,
            origin: { id: undefined, value: data.origin.value, url: data.origin.url },
            destination: { id: undefined, value: data.destination.value, url: data.destination.url }
          }

          state.checkpoints = data.checkpoints.map((checkpoint) => ({
            location: checkpoint.location,
            description: checkpoint.description,
            status: undefined,
            created_at: moment(`${checkpoint.date}${checkpoint.time}`, dateFormat).format()
          }))

          resolve(state)
        } else {
          reject('No result found for your DHL query. Please try again.')
        }
      })
  })
}
