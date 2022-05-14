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


const oauth2Client = new google.auth.OAuth2(
  "661398999303-avkfe6v1tr5dnlfts8odpb04eo64fbq3.apps.googleusercontent.com",
  "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",
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
  // const client = new OAuth2Client(CLIENT_ID);
  // let { token }  = req.body;
  // console.log(req);
  // const ticket = await client.verifyIdToken({
  //     idToken: token,
  //     audience: CLIENT_ID
  // }).catch((error) => {
  //   console.error(error);
  // });
  // console.log("dog");
  // const {name, email} = ticket.getPayload();  
  // if (email.substr(-10, 10) === "g.ucla.edu") {
  //   req.session.userId = user.id;
  //   res.status(201);
  //   res.json(user);
  //   res.cookie("token", token, {maxAge: 3600000});
  //   console.log ("cookie set: " + token);
  // }
  // else {
  //   res.status(400)
  // }
});

app.get("/handleGoogleRedirect", async (req, res) => {
  const code = req.query.code;
  console.log("code: ", code);
  oauth2Client.getToken(code, (err, tokens) => {
    if (err) {
      console.log("fuck shit");
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
        client_id: "661398999303-avkfe6v1tr5dnlfts8odpb04eo64fbq3.apps.googleusercontent.com",
        client_secret: "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",
        refreshToken: req.body.refreshToken,
        grant_type: "refresh_token",
      }),
    });

    const data = await request.json();
    console.log("stupid ass", data.access_token);

    res.json( {
      accessToken: data.access_token,
    });
  }
  catch(error) {
    res.json({error: error.message});
  }
});

// //data for the individual posts, title, text
// app.get("/get-title", (req, res) => {
//   const posts = [];
//   async function process(title) {
//     res.send(JSON.stringify({title: title}));
//   }
//   getDbCollection({name : req.query.name}, "title", process)
// });

// app.post("/set-title", (req, res) => { //title of the post
//   data = req.body;
//   insertDb(data, "title");
//   res.send({status : 200});;
// });

// app.get("/get-text", (req, res) => {
//   const posts = [];
//   async function process(text) {
//     res.send(JSON.stringify({text: text}));
//   }
//   getDbCollection({name : req.query.name}, "text", process)
// });

// app.post("/set-text", (req, res) => { //actual text of the pot
//   data = req.body;
//   insertDb(data, "text");
//   res.send({status : 200});;
// });

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
