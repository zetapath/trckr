import { Router } from 'express'
import { User } from '../models'

const router = new Router()

router.get('/signin', (req, res) => {
  res.send('New here? 💋')
})

router.get('/login', (req, res) => {
  res.send('New here? 💋')
})

router.get('/profile', (req, res) => {
  const session = res.locals.session
  res.json(session)
})

router.get('/logout', (req, res) => {
  req.session.destroy()
  res.redirect('/')
})

export default router
