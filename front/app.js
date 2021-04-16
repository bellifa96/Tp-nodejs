
const fetch = require('node-fetch');
const express = require('express');
const axios = require('axios')

const app = express();

const bodyParser= require('body-parser')

app.use(bodyParser.urlencoded({ extended: true }))

app.set('view engine', 'ejs')


app.listen(3001, function() {

    console.log('listening on 3001')
})


app.get('/', function (req, res) {
    fetch("http://localhost:3002")
        .then(result => result.json())
        .then(json =>     res.render(__dirname + '/Views/index.ejs',{items : json}))
        .catch(err => console.error(err));
})


app.get('/form/new', function (req, res) {

    res.sendFile(__dirname + '/Views/form.html')

})


app.post('/new', function (req, res) {

    axios
        .post('http://localhost:3002/api/new', req.body)
        .then(resuslt => {
            res.redirect('/')
        })
        .catch(error => {
            console.error(error)
        })

})

app.post('/update', function (req, res) {

    axios
        .put('http://localhost:3002/api/update', {data : req.body,id:req.query.id })
        .then(resuslt => {
            res.redirect('/')
        })
        .catch(error => {
            console.error(error)
        })

})


app.get('/form/update', function (req, res) {
    fetch("http://localhost:3002/api/show?id="+req.query.id)
        .then(result => result.json())
        .then(json =>     res.render(__dirname + '/Views/form.ejs',{item : json}))
        .catch(err => console.error(err));

})

app.get('/show', function (req, res) {

    fetch("http://localhost:3002/api/show?id="+req.query.id)
        .then(result => result.json())
        .then(json =>     res.render(__dirname + '/Views/show.ejs',{item : json}))
        .catch(err => console.error(err));

})

app.get('/delete', function (req, res) {

    axios
        .put('http://localhost:3002/api/delete', {id:req.query.id })
        .then(resuslt => {
            res.redirect('/')
        })
        .catch(error => {
            console.error(error)
        })
})