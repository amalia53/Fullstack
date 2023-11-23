const config = require('./utils/config')
const express = require('express')
app = express()
const cors = require('cors')
const blogsRouter = require("./controllers/blogs")
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const mongoose = require("mongoose")

mongoose.set('strictQuery', false)
mongoose.connect(config.DB_URI)

app.use(cors())
app.use(express.json())

app.use(express.json())

app.use('/api/blogs', blogsRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)

module.exports = app