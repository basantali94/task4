const express = require('express')
const News = require('./models/news')
const newsRouter = require('./routers/news')
require('./db/mongoose')
const app = express()
app.use(express.json())
app.use(newsRouter)
const port = 3000


app.listen(port,()=>console.log('Server is running'))
