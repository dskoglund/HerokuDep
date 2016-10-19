const { MongoClient } = require('mongodb')
const request = require('request')
const { expect } = require('chai')
const createApp = require('../create-app')

const TEST_DB = 'mongodb://localhost:27017/test-books'
const TEST_PORT = 3001
const TEST_URI = 'http://localhost:' + TEST_PORT

describe('Books API', () => {
  let db
  let server
  let books

  before(done => {
    MongoClient.connect(TEST_DB, (err, _db) => {
      if(err) {
        return done(err)
      }
      db = _db
      books = db.collection('books')
      const app = createApp(db)
      server = app.listen(TEST_PORT, () => {
        done()
      })
    })
  })

  after(done => {
    db.close(true, () => {
      server.close()
      done()
    })
  })

  beforeEach(done => {
    books.remove({}, err => {
      if(err) {
        return done(err)
      }
      books.insertMany([{title: "cats"},{title: "dogs"}], err => {
        if(err) {
          return done(err)
        }
        done()
      })
    })
  })

  describe('GET /books', () => {
    it("returns a list of books", done => {
      request.get(TEST_URI + '/books', { json : true }, (err, res, body) => {
        expect(err).to.be.null
        expect(res).to.have.property('statusCode', 200)
        expect(body).to.have.lengthOf(2)
        done()
      })
    })
  })

  describe('POST /books', () => {
    it("stores a new book in the database", done => {
      request.post(TEST_URI + '/books', { json : true }, (err, res, body) => {
        expect(err).to.be.null
        expect(res).to.have.property('statusCode', 200)
        done()
      })
    })
  })

  describe('PUT /books/:title', () => {
    it("updates a book in the database", done => {
      const newBook = { title: "kids" }
      request.put(TEST_URI + '/books/dogs ', { json : newBook }, (err, res, body) => {
        expect(err).to.be.null
        expect(res).to.have.property('statusCode', 200)
        done()
      })
    })
  })

  describe('DELETE /books/:title', () => {
    it("removes a book from the database", done => {
      request.delete(TEST_URI + '/books/cats', {json : true}, (err, res, body) => {
        expect(err).to.be.null
        expect(res).to.have.property('statusCode', 200)
        db.collection('books').find().toArray((err, docs) => {
          expect(docs).to.have.lengthOf(1)
          done()
        })
      })
    })
  })

})
