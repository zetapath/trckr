import express from 'express'
import passport from 'passport'
import { Strategy } from 'passport-twitter'
import config from 'config.production'
import store from 'src/store'
import uuid from 'uuid'
const db = store()

passport.use(new Strategy(config.twitter, (token, tokenSecret, profile, callback) => {
  let user = db.get('users').find({ provider: 'twitter', username: profile.username }).value()
  if (!user) {
    user = db
      .get('users')
      .push({
        id: uuid(),
        username: profile.username,
        displayName: profile.displayName,
        avatar: profile._json.profile_image_url,
        provider: profile.provider,
        metadata: { token, tokenSecret },
        // metadata: profile._json,
        created_at: new Date()
      })
      .value()[0]
  }
  return callback(null, user)
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
