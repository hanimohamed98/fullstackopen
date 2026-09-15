const express = require('express')
const mongoose = require('mongoose')
const dns = require('dns')
const config = require('./utils/config')
const blogRouter = require('./controllers/blogs')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')

const app = express()

dns.setServers(['8.8.8.8', '1.1.1.1'])

mongoose
  .connect(config.MONGODB_URI, { family: 4 })
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
  })

app.use(express.json())

app.use('/api/blogs', blogRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)

const errorHandler = (error, request, response, next) => {
    if (error.name === 'JsonWebTokenError') {
        return response.status(401).json({ error: 'token missing or invalid' })
    }
    next (error)
}

app.use(errorHandler)

module.exports = app

eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImhhbmkiLCJpZCI6IjZhYTgzODI1MjdmZTZhYTg4YWU0NmI5YSIsImlhdCI6MTc4OTQ3NTQ2MH0._Odqs-NPSH17LJ1RnzwFunDjXJFQcqSE9-2V8cXo9Xc