import { Router } from 'express'

const router = new Router()

router.get('/signin', (req, res) => {
  res.send('New here? 💋')
})

router.get('/login', (req, res) => {
  res.send('New here? 💋')
})

router.get('/profile', (req, res) => {
  const session = req.session.store
  res.send(`Hi ${JSON.stringify(session.displayName)}!`)
})

router.get('/logout', (req, res) => {
  req.session.destroy()
  res.redirect('/')
})

export default router
