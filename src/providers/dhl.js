'use strict';

import fetch from 'node-fetch';
import moment from 'moment';

const URL = 'http://www.dhl.com/shipmentTracking?languageCode=en&AWB=';

export default (TrackingNumber) => {
  return new Promise( (resolve, reject) => {

    fetch(`${URL}${TrackingNumber}`)
      .then( (response) => response.json() )
      .then( (json) => {
        if (json.results && json.results.length > 0) {
          const data = json.results[0];

          const state = {
            id: data.id,
            description: data.description,
            status: data.delivery.status,
            packages: data.pieces.value,
            origin: { value: data.origin.value, url: data.origin.url },
            destination: { value: data.destination.value, url: data.destination.url },
          };

          state.checkpoints = data.checkpoints.map( (checkpoint) => {
            return {
              location: checkpoint.location,
              description: checkpoint.description,
              created_at: moment(`${checkpoint.date} ${checkpoint.time}`).format()
            };
          })

          resolve(state);
        } else {
          reject('No result found for your DHL query. Please try again.');
        }
      });
  })
}
