import React from 'react'
import ReactDOMServer from 'react-dom/server'
import { Router } from 'express'
import Home from '../../components/Home'

const router = new Router()

router.get('/', (req, res) => {
  const bindings = {
    store: {},
    session: res.locals.session,
    markup: '<h2>Hello World</h2>'
  }

  res.render('index.ejs', bindings)
})

export default router
