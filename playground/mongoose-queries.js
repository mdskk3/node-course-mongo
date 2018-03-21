const {ObjectID} = require('mongodb');
const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

// var id = '5ab21dbd95671e78227a84a0';
// if(!ObjectID.isValid(id)){
//   console.log("ID is not valid");
// }
// Todo.find({
//   _id: id
// }).then((todos) => {
//   console.log('Todos', todos);
// });
// //returns only one result. If multiple data is present, it returns the first data
// Todo.findOne({
//   _id: id
// }).then((todo) => {
//   console.log('Todo', todo);
// });
// Todo.findById(id).then((todo) => {
//   if(!todo){
//     return console.log('Id not found');
//   }
//   console.log('Todo by Id', todo);
// }).catch((e) => console.log(e));

var id = '5a9bef5511ad2e106c1d566a';

User.findById(id).then((user) =>{
  if(!user){
    return console.log("User not found");
  }
  console.log(JSON.stringify(user, undefined,2));
}).catch((e) => {
  console.log(e);
});
