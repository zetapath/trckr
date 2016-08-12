import { Router } from 'express'
import { cainiao } from '../providers'
import { Order } from '../models'

const router = new Router()

router.get('/order/save/:id', (req, res) => {

  cainiao(req.params.id)
    .then((info) => {
      const session = req.session.store
      const order = Order.saveCainiao(info, session.id)

      res.json({
        message: `Track order ${order.id}`,
        order
      })
    })
    .catch((error) => {
      res.status(500).send('🤔 Something broke!')
    })
})

router.get('/order/:id', (req, res) => {
  res.send(`Track order ${req.params.id}`)
})

export default router
