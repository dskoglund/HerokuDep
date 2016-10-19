const express = require('express')
const bookRouter = require('./book-routes')
const bodyParser = require('body-parser')

const jsonParser = bodyParser.json()

function createApp(db) {

  const app = express()

  app.use(jsonParser)
  app.use('/books', bookRouter(db))

  return app
}

module.exports = createApp
