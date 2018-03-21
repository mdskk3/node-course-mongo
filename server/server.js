var express = require('express');
var bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');

var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');

var app = express();
const port = process.env.PORT || 3000;

if(process.env.PORT) {
    process.env.MONGODB_URI = "mongodb://system:manager@ds121099.mlab.com:21099/mdskk3-mongolab/TodoApp";
}

app.use(bodyParser.json());

app.post('/todos', (req, res) => {
  var todo = new Todo ({
    text: req.body.text
  });

  todo.save().then((doc) => {
    res.send(doc);
  }, (err) => {
    res.status(400).send(err);
  });
});

app.get('/todos', (req,res) => {
  Todo.find().then((todos) => {
    res.send({todos});
  }, (e) => {
    res.status(400).send(e);
  });
});

app.get('/todos/:id', (req, res) => {
  var id = req.params.id;
  if(!ObjectID.isValid(id)){
      return res.status(404).send();
  }

  Todo.findById(id).then((todo) =>{
    if(!todo){
      return res.status(404).send();
    }
      res.send({todo});
  }).catch((e) => {
    res.status(400).send();
  });
})

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});

module.exports = {app};
