// -- More info: https://github.com/typicode/lowdb
import lowdb from 'lowdb'
import fileAsync from 'lowdb/lib/file-async'
import path from 'path'
import fs from 'fs'
// -- Internal
const folder = path.resolve('.', 'store')
if (!fs.existsSync(folder)) fs.mkdirSync(folder)

export default (file = 'db.json', defaults = { trackingNumbers: [], users: [], tokens: [] }) => {
  const store = lowdb(`${folder}/${file}`, { storage: fileAsync })

  if (defaults) store.defaults(defaults).value()

  return store
}
