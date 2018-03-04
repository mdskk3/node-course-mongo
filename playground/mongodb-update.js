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

  // db.collection('Todos').findOneAndUpdate({
  //   _id: new ObjectID("5a9be2a3e4ca5715198d57b1")
  // }, {
  //   $set: {
  //     completed: true
  //   }
  // }, {
  //   returnOriginal: false
  // }).then((result) => {
  //   console.log(result);
  // });

  db.collection('Users').findOneAndUpdate({
    _id: new ObjectID("5a9be6e2e4ca5715198d58fd")
  }, {
    $inc: {
      age: 1
    }, $set: {
      name: "Andrew"
    }
  }, {
    returnOriginal: false
  }).then((result) => {
    console.log(result);
  });

  //CLoses connection with the mongodb server
  //  db.close();
  //Mongov3 -- instead of above close, we use below close
  //client.close();
});
