import express from 'express'
import passport from 'passport'
import { Strategy } from 'passport-twitter'
import { User } from '../../models'

passport.use(new Strategy(global.config.twitter, (token, tokenSecret, profile, callback) => {
  return callback(null, User.fromTwitter(profile))
}))
passport.serializeUser((user, callback) => callback(null, user))
passport.deserializeUser((data, callback) => callback(null, data))

const app = express()
app.use(passport.initialize())

app.get('/', passport.authenticate('twitter'))

app.get('/callback',
  passport.authenticate('twitter', { failureRedirect: '/login' }),
  (req, res) => {
    req.session.uuid = req.user.id
    res.redirect('/profile')
  }
)

export default app
