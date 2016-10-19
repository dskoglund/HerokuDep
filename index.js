const MongoClient = require('mongodb').MongoClient
const createApp = require('./create-app')

const DEFAULT_MONGO_URI = 'mongodb://localhost:27017/books'
const NODE_ENV = process.env.NODE_ENV || 'developement'
const MONGODB_URI = process.env.MONGODB_URI || DEFAULT_MONGO_URI

const PORT = process.env.PORT || 3000

MongoClient.connect(MONGODB_URI, (err, db) => {

  const app = createApp(db)

  app.listen(PORT, () => {
    NODE_ENV !== 'production' &&
    console.log('listening.......')
  })
})
