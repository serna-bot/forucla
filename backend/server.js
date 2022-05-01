express = require("express");
const cookieParser = require("cookie-parser");
const app = express();
const bodyParser = require('body-parser');
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
app.use(bodyParser.json());

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

app.get("/posts", (req, res) => {
  const posts = [];
  res.send("ur mom");
  // res.json(posts);
});

// app.post("/posts", (req, res) => {
//   //TODO: code to add new post
//   res.json(req.body);
// });

app.put("/posts/:id", (req, res) => {
  const { id } = req.params;
  //TODO: code to update posts
  res.json(req.body);
});

// app.delete("/posts/:id", (req, res) => {
//   const { id } = req.params;
//   //TODO: code to update posts
//   res.json({ deleted: id });
// });
//post then get recursive get so you get post until u get first since both are asynchronous 
