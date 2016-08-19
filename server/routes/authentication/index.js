import express from 'express';
import twitter from './twitter';
import facebook from './facebook';

const app = express();

app.use('/twitter', twitter);
app.use('/facebook', facebook);

export default app;
