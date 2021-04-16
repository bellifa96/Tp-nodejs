const app  = require('../app')

const MongoClient = require('mongodb').MongoClient

const uri = "mongodb+srv://immo:immo@cluster0.4fndh.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"

const ObjectId = require('mongodb').ObjectId

MongoClient.connect(uri,async (err, client) => {
    if (err) return console.error(err)

    let db = await client.db('immo')
    global.ad = await db.collection('ad')
    console.log('Connected to Database')

})

function create (body){

    ad.insertOne(body)
        .then(result => {
            console.log(result)
        })

}

function update(id,data){

    ad.findOneAndUpdate({_id:ObjectId(id)},{$set:data})
        .then(result => {
            console.log(result)
            return result

        })

}

function supprimer(id){

    ad.deleteOne(ObjectId(id))
        .then(result => {
         //   console.log(result)
            return result
        })

}




module.exports = {create,update,supprimer}