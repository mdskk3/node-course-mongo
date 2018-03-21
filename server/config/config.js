var env = process.env.NODE_ENV || 'development';

console.log(`*******${env}*******`)

var db = {
  dev : 'mongodb://localhost:27017/TodoApp',
  test : 'mongodb://localhost:27017/TodoAppTest',
  mlab : 'mongodb://system:manager@ds121099.mlab.com:21099/mdskk3-mongolab/TodoApp'
};
if(process.env.PORT){
  process.env.MONGODB_URI = db.mlab;
} else {
  process.env.PORT = 3000;
  if(env === 'development'){
    process.env.MONGODB_URI = db.dev;
  } else if (env === 'test'){
    process.env.MONGODB_URI = db.test;
  }
}

// Base Code
// if (env ==='development'){
//   process.env.PORT = 3000;
//   process.env.MONGODB_URI = 'mongodb://localhost:27017/TodoApp';
// } else if (env === 'test'){
//   process.env.PORT = 3000;
//   process.env.MONGODB_URI = 'mongodb://localhost:27017/TodoAppTest';
// }
// Alternative 2
// if(env === 'development') {
//  db = 'mongodb://localhost:27017/TodoApp';
//  port = 3000;
// } else if(env === 'production') {
//  db = 'mongodb://username:password@ds235785.mlab.com:35785/todo-list';
//  port = process.env.PORT;
// } else if(env === 'test') {
//   db = 'mongodb://localhost:27017/TodoAppTest';
//   port = 5050;
// }
