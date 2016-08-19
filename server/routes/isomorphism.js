import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { Router } from 'express';
import { Order } from '../models';

const router = new Router();

// List of orders for current session
router.get('/orders', (req, res) => {
  const sessionId = res.locals.session.id;
  const orders = Order.find({
    query: { user: sessionId },
  });

  res.render('index.ejs', {
    store: {},
    session: res.locals.session,
    markup: ReactDOMServer.renderToString(<Orders store={orders}/>),
  });
});

export default router;
