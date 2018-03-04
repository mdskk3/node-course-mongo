var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/TodoApp');

var Todo = mongoose.model('Todo', {
  text: {
    type: String,
    required: true,
    minlength: 1,
    trim: true
  },
  completed: {
    type: Boolean,
    default: false
  },
  completedAt: {
    type: Number,
    default: null
  }
});

var User = mongoose.model('User', {
  email: {
    type: String,
    trim: true,
    required: true,
    minlength: 1,
  }
});

var newUser = new User({
  email: "  andrew@example.com   "
});

newUser.save().then((doc) => {
  console.log(JSON.stringify(doc, undefined,2));
}, (err) => {
  console.log('Unable to Save to DB');
});

// var newTodo = new Todo({
//   text: 'Cook Dinner'
// });
//
// newTodo.save().then((doc) => {
//   console.log('Saved ToDo', doc)
// }, (err) => {
//   console.log('Unable to Save to DB')
// });

// var otherTodo = new Todo ({
//   text: 'Feed the cat',
//   completed: true,
//   completedAt: 123
// });
//
// otherTodo.save().then((doc) => {
//   console.log(JSON.stringify(doc, undefined,2));
// }, (err) => {
//   console.log('Unable to Save to DB', err);
// });
