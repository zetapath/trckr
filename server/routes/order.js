import React from 'react'
import ReactDOMServer from 'react-dom/server'
import { Router } from 'express'
import { cainiao } from '../providers'
import { Order } from '../models'
import Orders from '../../components/Orders'

const router = new Router()

// List of orders for current session
router.get('/orders', (req, res) => {
  const sessionId = res.locals.session.id
  const orders = Order.find({
    query: { user: sessionId }
  })

  res.render('index.ejs', {
    store: {},
    session: res.locals.session,
    markup: ReactDOMServer.renderToString(<Orders store={orders}/>)
  })
})

// Info of a determinate order using store id
router.get('/order/:id', (req, res) => {
  const sessionId = res.locals.session.id
  const order = Order.find({
    query: { id: req.params.id, user: sessionId }
  })

  if (order) {
    res.json(order)
  } else {
    res.status(500).send("🤔 You don't have registered this order")
  }
})

// Remove a determinate order using store id
router.delete('/order/:id', (req, res) => {
  res.status(500).send('💩')
})

// Add a new order for current session
router.get('/order/save/:id', (req, res) => {
  cainiao(req.params.id)
    .then((info) => {
      const sessionId = res.locals.session.id
      const order = Order.cainiao(info, sessionId)

      res.json({
        message: `Track order ${order.id}`,
        order
      })
    })
    .catch((error) => {
      res.status(500).send(`🤔 Something broke: ${error}`)
    })
})

export default router
