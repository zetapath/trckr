import { Router } from 'express';
import { cainiao } from '../providers';
import { Order } from '../models';

const router = new Router();

// List of orders for current session
router.get('/orders', (req, res) => {
  res.render('index.ejs', {
    store: {},
    session: res.locals.session,
  });
});

// Info of a determinate order using store id
router.get('/order/:id', (req, res) => {
  const sessionId = res.locals.session.id;
  const order = Order.find({
    query: { id: req.params.id, user: sessionId },
  });

  if (order) {
    res.json(order);
  } else {
    res.status(500).send("🤔 You don't have registered this order");
  }
});

export default router;
