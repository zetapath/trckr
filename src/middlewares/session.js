import store from 'src/store'
const db = store()

export default (req, res, next) => {
  db.read()

  // console.log(req.session, req.method, req.url);
  const id = req.session.uuid
  if (id) {
    const user = db.get('users').find({ id }).value()
    if (user) {
      req.session.store = user
      console.log("👻", req.session.store.username)
    }
  }
  next()
}
