import express from 'express'
import session from 'express-session'
import bodyParser from 'body-parser'
import path from 'path'
import { middlewareSession, middlewareError } from './middlewares'
import routes from './routes'

const FileStore = require('session-file-store')(session)
global.config.session.store = new FileStore()
// import FileStore from 'session-file-store'
// FileStore(session)

// 🌏 Create a new Express application.
const app = express()
// Configure view engine to render EJS templates.
app.set('views', path.resolve('.', 'src/views')) // @TODO: Pass config between routers
app.set('view engine', 'ejs')
// Use application-level middleware
app.use(bodyParser.urlencoded({ extended: true }))
// if (isProduction) {
//   app.set('trust proxy', 1) // trust first proxy
//   global.config.session.cookie.secure = true // serve secure cookies
// }
app.use(session(global.config.session))

// Define routes.
app.use('/static', express.static('static'))
app.use(middlewareSession)
app.use(middlewareError)
app.use('/', routes)

app.listen(8888, () => {
  console.log('Listening on http://127.0.0.1:8888')
})
