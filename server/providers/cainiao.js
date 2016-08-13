import fetch from 'node-fetch'
import cheerio  from 'cheerio'

const TOKEN = 'textarea#waybill_list_val_box'
const URL = 'http://global.cainiao.com/detail.htm?mailNoList='

export default function(trackingNumber) {
  return new Promise((resolve, reject) => {
    fetch(`${URL}${trackingNumber}`)
      .then((response) => response.text())
      .then((body) => {
        const data = JSON.parse(cheerio.load(body)(TOKEN).text()).data[0]
        if (data) {
          resolve(data)
        } else {
          reject('Something wrong...')
        }
      })
      .catch(reject)
  })
}
