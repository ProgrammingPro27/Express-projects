const express = require("express");
const { getDb, connectToDb } = require('./scripts/db')
const { ObjectId } = require('mongodb')

const app = express();

app.use(express.json())

app.use("/scripts", express.static(__dirname + "/scripts"));
app.use("/styles", express.static(__dirname + "/styles"));
app.use("/pages", express.static(__dirname + "/pages"));
app.use("/requisite", express.static(__dirname + "/requisite"));

app.get("/", (req, res) => {
  res.sendFile("/pages/index.html", { root: __dirname });
})
app.get("/page1", (req, res) => {
  res.sendFile("/pages/index2.html", { root: __dirname });
})

// db connection
let db

connectToDb((err) => {
  if (!err) {
    app.listen(3000, () => {
      console.log('app listening on port 3000')
    })
    db = getDb()
  }
})

// db query
app.get('/people', (req, res) => {
  // current page
  const page = req.query.p || 0
  const booksPerPage = 5

  let books = []
  let count;
  db.collection('collectionOne').count().then((numberOfEntries) => {
    count = numberOfEntries
  })

  db.collection('collectionOne')
    .find()
    //.sort({ author: 1 })
    .skip(page * booksPerPage)
    .limit(booksPerPage)
    .forEach(book => books.push(book))
    .then(() => {
      res.status(200).json({ books, count, booksPerPage })
    })
    .catch(() => {
      res.status(500).json({ error: 'Could not fetch the documents' })
    })
})

app.get('/people/:id', (req, res) => {

  if (ObjectId.isValid(req.params.id)) {

    db.collection('collectionOne')
      .findOne({ _id: new ObjectId(req.params.id) })
      .then(doc => {
        res.status(200).json(doc)
      })
      .catch(err => {
        res.status(500).json({ error: 'Could not fetch the document' })
      })

  } else {
    res.status(500).json({ error: 'Could not fetch the document' })
  }

})

app.post('/people', (req, res) => {
  const book = req.body

  db.collection('collectionOne')
    .insertOne(book)
    .then(result => {
      res.status(201).json(result)
    })
    .catch(err => {
      res.status(500).json({ err: 'Could not create new document' })
    })
})

app.delete('/people/:id', (req, res) => {

  if (ObjectId.isValid(req.params.id)) {

    db.collection('collectionOne')
      .deleteOne({ _id: new ObjectId(req.params.id) })
      .then(result => {
        res.status(200).json(result)
      })
      .catch(err => {
        res.status(500).json({ error: 'Could not delete document' })
      })

  } else {
    res.status(500).json({ error: 'Could not delete document' })
  }
})

app.patch('/people/:id', (req, res) => {
  const updates = req.body

  if (ObjectId.isValid(req.params.id)) {

    db.collection('collectionOne')
      .updateOne({ _id: new ObjectId(req.params.id) }, { $set: updates })
      .then(result => {
        res.status(200).json(result)
      })
      .catch(err => {
        res.status(500).json({ error: 'Could not update document' })
      })

  } else {
    res.status(500).json({ error: 'Could not update document' })
  }
})