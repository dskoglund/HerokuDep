const Router = require('express').Router
const assert = require('assert')

const bookRouter = function(db) {
    const books = db.collection('books')
    const router = new Router()

    router.get('/', (req, res) => {
      books.find().toArray((err, docs) => {
        if(err) {
          return res.sendStatus(500)
        }
        res.json(docs)
      })
    })

    router.post('/', (req, res) => {
      books.insertOne(req.body, (err, result) => {
        if(err) {
          return res.sendStatus(500)
        }
        res.json(result.ops[0])
      })
    })

    router.delete('/:title', (req, res) => {
      books.deleteOne({ "title": req.params.title }, (err, result) => {
        if(err) {
          return res.sendStatus(500)
        }
        res.json(result)
      })
    })

    router.put('/:title', (req, res) => {
      books.updateOne({ "title": req.params.title }, { $set: req.body }, (err, result) => {
        if(err) {
          return res.sendStatus(500)
        }
        res.json(result)
      })
    })

    return router
}

module.exports = bookRouter;
