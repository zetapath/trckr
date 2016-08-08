import { Router } from 'express'

const router = new Router()

router.get('/signin', (req, res) => {
  res.send('New here? 💋')
})

router.get('/login', (req, res) => {
  res.send('New here? 💋')
})

router.get('/profile', (req, res) => {
  res.send('Hi {unknown}!')
})

router.get('/logout', (req, res) => {
  res.send('See you tomorrow? 🤔')
  req.logout()
  res.redirect('/')
})

export default router
