import express from 'express'
import { twitter } from './strategies'

const app = express()

app.use('/twitter', twitter)

export default app
