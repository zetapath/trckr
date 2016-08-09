import { User } from '../models'

export default (req, res, next) => {
  const route = req.url.split('/')[1]
  if (route === 'static') return next()

  let user
  const id = req.session.uuid
  if (id) {
    user = User.find({ query: { id }, limit: 1 })
    if (user) {
      req.session.store = user
      console.log(`👻 session ${user.username}`)
    }
  }

  if (!user && route !== '' && route !== 'login' && route !== 'auth') {
    return res.redirect('/login')
  }
  next()
}
