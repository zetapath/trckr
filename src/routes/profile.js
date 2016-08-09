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
  if (session) {
    res.send(`Hi ${JSON.stringify(session.displayName)}!`)
  } else {
    res.redirect('/login')
  }
})

router.get('/logout', (req, res) => {
  req.session.destroy()
  res.redirect('/')
})

export default router
