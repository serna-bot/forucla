express = require("express");
const cookieParser = require("cookie-parser");
const app = express();
const cors = require("cors");

require("dotenv").config({ path: "./config.env" });

const axios = require("axios");
const ObjectID = require('mongodb').ObjectID;

const port = process.env.PORT || 4000;
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());

var db = require("./mongo.js");

const { MinKey } = require("mongodb");

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});

function insertDb(item, col) {
  var tempDbCollection = db.collection(col);
  tempDbCollection.insertOne(item, function (err, res) {
      if (err) console.log(err);
  });
}

function getDbCollection (item, col, process) {
  db.collection(col).find(item).toArray().then(process);
}

//collection of all the posts
app.get("/get-posts", (req, res) => {
  const posts = [];
  async function process(posts) {
    res.send(JSON.stringify({posts: posts}));
  }
  getDbCollection()
});

app.post("/set-posts", (req, res) => {
  data = req.body;
  insertDb(data, "posts");
  res.send({status : 200});;
});


//data for the individual posts, title, text
app.get("/get-title", (req, res) => {
  const posts = [];
  async function process(title) {
    res.send(JSON.stringify({title: title}));
  }
  getDbCollection({name : req.query.name}, "title", process)
});

app.post("/set-title", (req, res) => {
  data = req.body;
  insertDb(data, "title");
  res.send({status : 200});;
});

app.get("/get-text", (req, res) => {
  const posts = [];
  async function process(text) {
    res.send(JSON.stringify({text: text}));
  }
  getDbCollection({name : req.query.name}, "text", process)
});

app.post("/set-text", (req, res) => {
  data = req.body;
  insertDb(data, "text");
  res.send({status : 200});;
});

// app.put("/posts/:id", (req, res) => {
//   const { id } = req.params;
//   //TODO: code to update posts
//   res.json(req.body);
// });

// app.delete("/posts/:id", (req, res) => {
//   const { id } = req.params;
//   //TODO: code to update posts
//   res.json({ deleted: id });
// });
//post then get recursive get so you get post until u get first since both are asynchronous 
