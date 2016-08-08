import { Router } from 'express'

const router = new Router()

router.get('/', (req, res) => {
  const bindings = {
    store: {},
    markup: '<p>Hello world!</p>'
  }
  res.render('index.ejs', bindings)
})

export default router
