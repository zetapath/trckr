import express from 'express'
import session from 'express-session'
import path from 'path'
import routes from './routes'

// Create a new Express application.
const app = express()

// Configure view engine to render EJS templates.
app.set('views', path.join(__dirname, '/views'))
app.set('view engine', 'ejs')

// Use application-level middleware for common functionality, including
// logging, parsing, and session handling.
app.use(require('body-parser').urlencoded({ extended: true }))
app.use(session({ secret: 'keyboard cat', resave: true, saveUninitialized: true  }))

// Define routes.
app.use('/static', express.static('static'))
app.use('/', routes)

// Start listening
app.listen(8888, () => console.log('Listening on http://127.0.0.1:8888'))
