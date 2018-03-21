const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

// Todo.remove({}).then((result) =>{
//   console.log(result);
// });
Todo.findOneAndRemove({_id: '5ab23aebe0bc9866f611b206'}).then((todo) => {
  console.log(todo);
});

Todo.findByIdAndRemove('5ab23aebe0bc9866f611b206').then((todo) => {
  console.log(todo);
});
