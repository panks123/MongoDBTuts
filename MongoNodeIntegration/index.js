const express = require('express')
const MongoClient = require('mongodb').MongoClient

const app= express()
const port= 5000


// DataBase setup
// install mongoDBclient using `npm install mongodb`

// Connect to the mongoDBClient

const connectionURL='mongodb://localhost:27017';
let db;


MongoClient.connect('mongodb://localhost:27017', (err, client) => {
// MongoClient.connect('mongodb://userName:password@localhost:27017', (err, client) => { // f your database is authenticated then use this line
  if (err) throw err

  db = client.db('ecom')

})

app.get('/',(req,res)=>{
    db.collection('products').find().toArray((err, result) => {
        if (err) throw err

        // console.log(result)

        res.send(result)
    })
})

app.listen(port, ()=>{
    console.log("Listening at port : ", port)
})


// Use mongoose instead when u are developing an app in production