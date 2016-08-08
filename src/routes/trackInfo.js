import { Router } from 'express'

const router = new Router()

router.get('/trackinfo/:id', (req, res) => {
  res.send(`Track order ${req.params.id}`)
})

export default router
