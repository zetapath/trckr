import express from 'express'
import home from './home'

import authentication from './authentication'
import profile from './profile'
import order from './order'

const app = express()

app.use('/', home)
app.use('/auth', authentication)
app.use('/', profile)
app.use('/', order)

export default app
