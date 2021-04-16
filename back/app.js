const ad = require('./Controller')
const express = require('express');
const app = express();

const MongoClient = require('mongodb').MongoClient

const uri = "mongodb+srv://immo:immo@cluster0.4fndh.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"

const ObjectId = require('mongodb').ObjectId
MongoClient.connect(uri, (err, client) => {
    if (err) return console.error(err)

    let db =  client.db('immo')
    global.adCollection =  db.collection('ad')
    console.log('Connected to Database')

})
app.use(express.json())
const bodyParser= require('body-parser')
app.use(bodyParser.urlencoded({ extended: true }))



app.listen(3002, function() {

    console.log('listening on 3000')
})



app.get('/', function (req, res) {

    adCollection.find().toArray(function(err, result) {
        if (err) throw err;
        res.send(result)
    });
})

app.get('/api/show', function (req, res) {

    console.log(req.query.id)
    adCollection.findOne(ObjectId(req.query.id))
        .then(result => {
            console.log(result)
            res.send(result)

        })
})


app.put('/api/update', function (req, res) {
   // console.log(req.body.data,req.body.id)
   res.send( ad.update(req.body.id,req.body.data) )
})

app.delete('/api/delete', function (req, res) {
    console.log(req.query.id)
    res.send(ad.supprimer(req.query.id))
})

app.post('/api/new', (req, res) => {

    res.send(ad.create(req.body))
})
