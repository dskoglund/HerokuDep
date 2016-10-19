const bookRouter = require('./book-routes')
const MongoClient = require('mongodb').MongoClient
const createApp = require('./create-app')

const MONGO_URI = 'mongodb://localhost:27017/test-books'

MongoClient.connect(MONGO_URI, (err, db) => {

  const app = createApp(db)

  app.listen(3000, () => {
    console.log('listening.......')
  })
})
