import { Router } from 'express'
import { cainiao } from '../providers'
import { Order } from '../models'

const router = new Router()

router.get('/orders', (req, res) => {
  const sessionId = req.session.store.id
  const orders = Order.find({
    query: { user: sessionId }
  })

  res.json(orders)
})

router.get('/order/:id', (req, res) => {
  const sessionId = req.session.store.id
  const order = Order.find({
    query: { id: req.params.id, user: sessionId }
  })

  if (order) {
    res.json(order)
  } else {
    res.status(500).send("🤔 You don't have registered this order")
  }
})

router.delete('/order/:id', (req, res) => {
  res.status(500).send('💩')
})

router.get('/order/save/:id', (req, res) => {
  cainiao(req.params.id)
    .then((info) => {
      const sessionId = req.session.store.id
      const order = Order.saveCainiao(info, sessionId)

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
