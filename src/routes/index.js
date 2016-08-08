import express from 'express'
import home from './home'

import authentication from './authentication'
import profile from './profile'
import trackInfo from './trackInfo'

const app = express()

app.use('/', home)
app.use('/auth', authentication)
app.use('/', profile)
app.use('/', trackInfo)

export default app
