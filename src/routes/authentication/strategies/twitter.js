import express from 'express'
import passport from 'passport'
import { Strategy } from 'passport-twitter'
import { User } from '../../../models'

passport.use(new Strategy(global.config.twitter, (token, tokenSecret, profile, callback) => {
  const user = User.update({
    query: { provider: 'twitter', username: profile.username },
    data: {
      username: profile.username,
      displayName: profile.displayName,
      avatar: profile._json.profile_image_url,
      provider: profile.provider,
      metadata: { token, tokenSecret }
    },
    upsert: true
  })

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
