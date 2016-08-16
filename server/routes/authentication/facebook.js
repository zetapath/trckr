import express from 'express'
import passport from 'passport'
import { Strategy } from 'passport-facebook'
import { User } from '../../models'

passport.use(new Strategy(global.config.facebook, (token, tokenSecret, profile, callback) => {
  return callback(null, User.fromFacebook(profile))
}))
passport.serializeUser((user, callback) => callback(null, user))
passport.deserializeUser((data, callback) => callback(null, data))

const app = express()
app.use(passport.initialize())

app.get('/', passport.authenticate('facebook'))

app.get('/callback',
  passport.authenticate('facebook', { failureRedirect: '/login' }),
  (req, res) => {
    req.session.uuid = req.user.id
    res.redirect('/profile')
  }
)

export default app
