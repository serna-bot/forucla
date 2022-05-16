const express = require("express");
const cookieParser = require("cookie-parser");
// import bodyParser from 'body-parser';
const cors = require("cors");
const app = express();

const db = require("./mongo.js");

require("dotenv").config({ path: "./config.env" });

// app.use(bodyParser.json({ limit: "30mb" }))
// app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }))
app.use(express.json());

const { google } = require("googleapis");

// const axios = require("axios");
const ObjectID = require('mongodb').ObjectID;

const port = process.env.PORT || 4000;
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

const CONNECTION_URL = '';

const { MinKey } = require("mongodb");

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});

function insertDb(item, col) {
  let tempDbCollection = db.collection(col);
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
  getDbCollection({}, "posts", process)
});

app.post("/set-posts", (req, res) => { //
  let data = req.body;
  insertDb(data, "posts");
  res.send({status : 200});;
});

let {clientId, clientSecret} = require("./googlesso.json");
const oauth2Client = new google.auth.OAuth2(
  clientId,
  clientSecret,
  "http://localhost:4000/handleGoogleRedirect" // server redirect url handler
);

app.post("/login", cors(), (req, res) => {
  const url = oauth2Client.generateAuthUrl({
    access_type: "offline",
    scope: [
      "https://www.googleapis.com/auth/userinfo.email",
    ],
    prompt: "consent",
  });
  res.send({url});
});

app.get("/handleGoogleRedirect", async (req, res) => {
  const code = req.query.code;
  console.log("code: ", code);
  oauth2Client.getToken(code, (err, tokens) => {
    if (err) {
      console.log("handleGoogleRedirect Error:");
      throw new Error("Issue with login", err.message);
    }
    const accessToken = tokens.access_token;
    const refreshToken = tokens.refresh_token;
    res.redirect(
      `http://localhost:3000?accessToken=${accessToken}&refreshToken=${refreshToken}`
    );
  });
});

app.post("/getValidToken", async (req, res) => {
  try {
    const request = await fetch("https://www.googleapis.com/oauth2/v4/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        client_id: clientId,
        client_secret: clientSecret,
        refreshToken: req.body.refreshToken,
        grant_type: "refresh_token",
      }),
    });

    const data = await request.json();
    console.log("Access token from getValidToken:", data.access_token);

    res.json( {
      accessToken: data.access_token,
    });
  }
  catch(error) {
    res.json({error: error.message});
  }
});

// function findPost(search, posts, n) {
  
//   const searchResults = new Set();
 
// }

// app.get("/search-post", async (req, res) => {
//   const searchQuery = new Set();
//   const allPosts = [];
//   async function process(allPosts) {
//     res.send(JSON.stringify({posts: allPosts}));
//   }
//   getDbCollection({}, "posts", process);
//   allPosts.forEach(indivPost => {
//     if (indivPost.category.includes()) {
//       searchQuery.add(indivPost);
//       console.log(indivPost);
//     }
//   });
// });