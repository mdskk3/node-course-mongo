const mongoose = require('mongoose');
// const REMOTE_MONGO = 'mongodb://system:manager@ds121099.mlab.com:21099/mdskk3-mongolab';
// const LOCAL_MONGO = 'mongodb://localhost:27017/TodoApp';
// const MONGO_URI = process.env.PORT ? REMOTE_MONGO : LOCAL_MONGO;
//mongoose.connect(MONGO_URI)
// if(process.env.PORT) {
//     process.env.MONGODB_URI = "mongodb://system:manager@ds121099.mlab.com:21099/mdskk3-mongolab/TodoApp";
// }
mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI);

module.exports = {mongoose};
