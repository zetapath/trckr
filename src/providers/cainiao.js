'use strict';

import fetch from 'node-fetch';
import cheerio  from 'cheerio';

const TOKEN = 'textarea#waybill_list_val_box';
const URL = 'http://global.cainiao.com/detail.htm?mailNoList';

export default (TrackingNumber) => {
  return new Promise( (resolve, reject) => {

    fetch(`${URL}=${TrackingNumber}`)
      .then( (response) => response.text() )
      .then( (body) => {
        const state = JSON.parse( cheerio.load(body)(TOKEN).text() ).data[0];
        resolve(state);
      });

    }
  )
}
