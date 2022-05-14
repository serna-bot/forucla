const express = require("express");
const cookieParser = require("cookie-parser");
import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';

import db from "./mongo.js";

// require("dotenv").config({ path: "./config.env" });

app.use(bodyParser.json({ limit: "30mb" }))
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }))
app.use(express.json());

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

// const { MinKey } = require("mongodb");

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

app.post("/login", async (req, res) => {
  const {OAuth2Client} = require('google-auth-library');
  const CLIENT_ID = "661398999303-0to1gmb9v5im56fjttr6v3ab7l774651.apps.googleusercontent.com"
  const client = new OAuth2Client(CLIENT_ID);
  const { token }  = req.body
  const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.CLIENT_ID
  });
    
  const {name, email} = ticket.getPayload();  
  if (email.substr(-10, 10) === "g.ucla.edu") {
    const user = await db.insert({ 
      email: email,
      name: name,
    }, "userProfile");
    req.session.userId = user.id;
    res.status(201);
    res.json(user);
    res.cookie("token", token, {maxAge: 3600000});
    console.log ("cookie set: " + token);
  }
  else {
    res.status(400)
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
