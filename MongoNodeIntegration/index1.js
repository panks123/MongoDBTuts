const express = require('express');
const { ObjectId } = require('mongodb');
const MongoClient = require('mongodb').MongoClient

const app= express()
const port= 5000


// DataBase setup
// install mongoDBclient using `npm install mongodb`

// Connect to the mongoDBClient

const connectionURL='mongodb://localhost:27017';
let db;

(async function(){
    try{
        const client = await MongoClient.connect(connectionURL)
        db = client.db('ecom')
    }
    catch(err)
    {
        throw err;
    }
})();

app.get('/', async (req,res)=>{
    try{
        let result = await db.collection('products').find().toArray()
        res.send(result)
    }
    catch(err){

    }
})


app.get('/insert', async (req,res)=>{
    try{
        let result = await db.collection('products').insertOne({ 
            name: "Camera", 
            price: 450
        })
        res.send(result)
    }
    catch(err){

    }
})

app.get('/fetchOne', async (req,res)=>{
    try{
        let result = await db.collection('products').findOne({ name : "Camera"})
        res.send(result)
    }
    catch(err){

    }
})

app.get('/deleteOne', async (req,res)=>{
    try{
        let result = await db.collection('products').deleteOne({ name : {$eq: "Camera"}})
        res.send(result)
    }
    catch(err){

    }
})

app.listen(port, ()=>{
    console.log("Listening at port : ", port)
})