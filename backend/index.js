require('dotenv').config();
var MongoClient = require('mongodb').MongoClient;

MongoClient.connect(process.env.MONGO_URL, (err, db) => {
  if (err) {
    console.log('cannot connect to MongoDB', err);
  } else {
    console.log('connected to MongoDB!');
  }
});
