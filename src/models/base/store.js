import lowdb from 'lowdb'
// import fileAsync from 'lowdb/lib/file-sync'
import fileSync from 'lowdb/lib/file-sync'
import path from 'path'
import fs from 'fs'

export default (state) => {
  const folder = path.resolve('.', 'store')
  if (!fs.existsSync(folder)) fs.mkdirSync(folder)

  const db = lowdb(`${folder}/${state.file}.json`, { storage: fileSync })
  const defaults = {}
  defaults[state.model] = []
  db.defaults(defaults).value()
  state.db = db

  return state
}
