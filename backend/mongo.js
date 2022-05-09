import mongodb from 'mongodb';

const MongoClient  = mongodb.MongoClient;
const url = "mongodb://localhost:27017";

const conn = new MongoClient(url, {
  useNewUrlParser: true
});

conn.connect((err, db) => {
  if (err) {
    console.log(err);
  } else {
    console.log("Connected to db");
  }
});

export default conn.db('test');
	       