import express from 'express';
import session from 'express-session';
import status from 'express-status-monitor';
import bodyParser from 'body-parser';

import path from 'path';
import sessionFileStore from 'session-file-store';
import { middlewareSession, middlewareError } from './middlewares';
import routes from './routes';

// 🌏 Create a new Express application.
const app = express();

app.set('views', path.resolve('.', 'src/views')); // @TODO: 🤔 Pass config between routers
app.set('view engine', 'ejs');

// app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Session configuration
const FileStore = sessionFileStore(session);
global.config.session.store = new FileStore();
app.use(session(global.config.session));

// Define routes.
app.use('/static', express.static('static'));
app.use(status());
app.use(middlewareSession);
app.use(middlewareError);
app.use('/', routes);

// Start Server
app.listen(8888, (error) => {
  if (error) {
    console.log('error', error);
    return;
  }
  console.log('Listening on http://127.0.0.1:8888');
});
