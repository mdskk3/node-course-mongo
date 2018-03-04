const {MongoClient, ObjectID} = require('mongodb');

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

  // db.collection('Todos').find({
  //   _id: new ObjectID('5a9bc927e4ca5715198d5463')
  // }).toArray().then((docs) => {
  //   console.log('Todos');
  //   console.log(JSON.stringify(docs, undefined,2));
  // }, (err) => {
  //   console.log('Unable to fetch data', err)
  // });

  db.collection('Todos').find().count().then((count) => {
    console.log(`Todos count: ${count}`);
  }, (err) => {
    console.log('Unable to fetch data', err)
  });

  db.collection('Users').find({name: 'Andrew'}).toArray().then((docs) => {
    console.log(JSON.stringify(docs, undefined,2));
  }, (err) => {
    console.log('Unable to fetch data', err)
  });


  //CLoses connection with the mongodb server
//  db.close();
  //Mongov3 -- instead of above close, we use below close
  //client.close();
});
