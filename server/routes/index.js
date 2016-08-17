import express from 'express'
import home from './home'
import falcorExpress from 'falcor-express'
import authentication from './authentication'
import profile from './profile'
import order from './order'
import falcorModelRouter from './falcorModelRouter'

const app = express()

app.use('/', home)
app.use('/auth', authentication)
app.use('/', profile)
app.use('/', order)
app.use('/falcor/model.json', falcorExpress.dataSourceRoute(falcorModelRouter))

export default app
