//const MongoClient = require('mongodb').MongoClient;
// Object restructuring
// var user = {name: 'Andrew', age: 25};
// var {name} = user;
//
// console.log(name);

const {MongoClient, ObjectID} = require('mongodb');
// ObjectId handling
// var obj = new ObjectID();
// console.log(obj);

//Mongov3 -- in callback instead of db we have to use client
//(err, client)

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
  if (err) {
    return console.log('Unable to connect to MongoDB server');
  }
  //Use return function as above to come out of function on error and stop furhter execution or put the success code in else block
  console.log('Connected to MongoDB server');
  //Mongov3 -- To connect to DB we add the below line
  //const db = client.db('TodoApp')

  // db.collection('Todos').insertOne({
  //   text: 'Something to do',
  //   completed: true
  // }, (err, result) => {
  //   if (err) {
  //     return console.log('Unable to insert data', err);
  //   }
  //   //.ops contains the documents list
  //   console.log(JSON.stringify(result.ops, undefined, 2))
  // });

  // db.collection('Users').insertOne({
  //   // the uniuq identifier _id can be set in mongo as _id: 123,
  //   name: 'Andrew',
  //   age: 25,
  //   location: 'Philadelphia'
  // }, (err, result) => {
  //   if (err) {
  //     return console.log('Unable to insert data', err);
  //   }
  //   console.log(JSON.stringify(result.ops, undefined, 2))
  //   //to get timestamp used in created object id _id
  //   console.log(result.ops[0]._id.getTimeStamp());
  // });


  //CLoses connection with the mongodb server
  db.close();
  //Mongov3 -- instead of above close, we use below close
  //client.close();
});
