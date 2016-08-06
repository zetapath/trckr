import fetch from 'node-fetch'
import cheerio  from 'cheerio'
import moment from 'moment'

const TOKEN = 'textarea#waybill_list_val_box'
const URL = 'http://global.cainiao.com/detail.htm?mailNoList='

export default function(TrackingNumber) {
  return new Promise((resolve, reject) => {
    fetch(`${URL}${TrackingNumber}`)
      .then((response) => response.text())
      .then((body) => {
        const data = JSON.parse(cheerio.load(body)(TOKEN).text()).data[0]

        const state = {
          id: data.mailNo,
          description: data.statusDesc,
          status: data.status,
          packages: undefined,
          origin: {
            id: data.section1.mailNo,
            value: data.section1.countryName,
            url: data.section1.url },
          destination: {
            id: data.section2.mailNo,
            value: data.section2.countryName,
            url: data.section2.url }
        }

        const checkpoints = data.section1.detailList.concat(data.section2.detailList)
        state.checkpoints = checkpoints.map(checkpoint => ({
          location: undefined,
          description: checkpoint.desc,
          status: checkpoint.status,
          created_at: moment(checkpoint.time).format()
        }))

        resolve(state)
      })
      .catch(reject)
  })
}
