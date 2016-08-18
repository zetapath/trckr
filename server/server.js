import express from 'express'
import session from 'express-session'
import bodyParser from 'body-parser'
import path from 'path'
import { middlewareSession, middlewareError } from './middlewares'
import routes from './routes'

const FileStore = require('session-file-store')(session)
global.config.session.store = new FileStore()


// 🌏 Create a new Express application.
const app = express()
// Configure view engine to render EJS templates.
app.set('views', path.resolve('.', 'src/views')) // @TODO: Pass config between routers
app.set('view engine', 'ejs')

// Use application-level middleware
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
// if (isProduction) {
//   app.set('trust proxy', 1) // trust first proxy
//   global.config.session.cookie.secure = true // serve secure cookies
// }
app.use(session(global.config.session))

// Define routes.
app.use('/static', express.static('static'))
app.use('/build', express.static('build'))
app.use(middlewareSession)
app.use(middlewareError)
app.use('/', routes)

// Start Server
app.listen(8888, (error) => {
  if (error) {
    console.log('error', error)
    return
  }
  console.log('Listening on http://127.0.0.1:8888')
})