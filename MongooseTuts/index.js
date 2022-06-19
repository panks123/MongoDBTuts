// Include the mongoose library
const mongoose = require('mongoose')

// Connecting to the mongod process in the localhost
mongoose.connect('mongodb://localhost:27017/panksKart', {useNewUrlParser: true})  // it will set up a connection with the database.

const db = mongoose.connection // For making a connection to the MongoDb database

db.on('error', console.error.bind(console, 'connection error:'))  // console.error.bind(console, 'connection error:') -> This is the callback which will be fired when there is some error which occures while connecting

db.once("open", () =>{
    // This is the callback which will be fired ince the connection is successful
    console.log("We are connected")
})

// We can create schema to mention what data we want to store

let kittySchema= new mongoose.Schema({
    name: String
})

// Above we have just created the Schema

// We can add methods  too to iur Schema
kittySchema.methods.speak = function(){
    var greeting = this.name ? `Meow name is ${this.name}` : "I don't have a name"
    // console.log(greeting)
}
// NOTE: methods must be added to the schema before compiling it with mongoose.model()


// Now we compile the schema into a model

let Kitten = mongoose.model('panksKitten', kittySchema) // here the first argument is the name of the model and second argument is the name of the schema which will be converted into model

let panksKitty= new Kitten({name: 'panksKitty'}) // creating the document of modelType Kitten i.e. model named 'panksKitten'
// console.log(panksKitty, ": ", panksKitty.name)
// panksKitty.speak() 

let panksKitty1= new Kitten({name: 'panksKitty1'})

// Till now we have just created the a document but we have not saved it into the database

// Now let's save the document into the database

panksKitty.save((err, panksKitty)=>{
    if(err) return console.error(err);
    panksKitty.speak()
})

// .save() function saves the document into a collection named plural of the modelName of the Schema (It makes it plural i.e 'panksKittens'- done by mongoose automatically)
// It takes a callback which will be executed when the document is saved into the database

panksKitty1.save((err, document2)=>{
    if(err) return console.error(err);
    // document2.speak()
})

// Querying

// Kitten.find({name: "panksKitty"}, (err, kittens)=>{
//     // This find() will return all the documents whose name is 'panksKitty'
//     if(err) return console.error(err)
//     console.log(kittens)
// })

Kitten.find({name: "panksKitty2"}, (err, kittens)=>{
    // This find() will return all the documents whose name is 'panksKitty1'
    if(err) return console.error(err)
    console.log(kittens) // kitten is the list of all the matched documents, if no match the list will be empty
})