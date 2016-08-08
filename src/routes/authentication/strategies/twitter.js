import express from 'express'
import passport from 'passport'
import { Strategy } from 'passport-twitter'
import config from 'config.production'

passport.use(new Strategy(config.twitter, (token, tokenSecret, profile, callback) => {
  // In this example, the user's Twitter profile is supplied as the user
  // record.  In a production-quality application, the Twitter profile should
  // be associated with a user record in the application's database, which
  // allows for account linking and authentication with other identity
  // providers.
  const user = {
    username: profile.username,
    displayName: profile.displayName,
    avatar: profile._json.profile_image_url,
    provider: profile.provider,
    metadata: profile._json,
    created_at: new Date()
  }
  console.log('passport.twitter', token, tokenSecret, user)
  return callback(null, profile)
}))
passport.serializeUser((user, callback) => callback(null, user))
passport.deserializeUser((data, callback) => callback(null, data))

const app = express()
app.use(passport.initialize())
app.use(passport.session())

app.get('/', passport.authenticate('twitter'))

app.get('/callback', passport.authenticate('twitter', {
  successRedirect: '/profile',
  failureRedirect: '/login'
}))

export default app
