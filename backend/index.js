var MongoClient = require('mongodb').MongoClient;
MongoClient.connect('mongodb://localhost:27017/foo', (err, db) => {
  if (err) {
    console.log('cannot connect to MongoDB', err);
  } else {
    console.log('connected to MongoDB!');
  }
});
