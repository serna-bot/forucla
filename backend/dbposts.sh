#!/bin/bash

mongo --eval 'db.postmessages.deleteMany({})'

mongo --eval 'db.postmessages.insertOne({title: "The breeze in my face, sand in between my toes, and subtle scent of trash in the air…am I at the beach?", message:"No, I’m walking by the corner of Strathmore and Gayley, why the f is there a pile of sand in the middle of the sidewalk?", creator:"bbbruin23", channel:"Memes", createdAt: new Date("2016-05-18T16:00:00Z"), comments: ["Negative-Prior8495: its that barf drying solution they would use in elementary school", "james: Would you say you dislike sand? Is it because its coarse and rough and irritating and it gets everywhere?", "jesus: this post made me laugh out loud"]})'

mongo --eval 'db.postmessages.insertOne({title: "Ate my roommates bagel.", message:"Oops not sorry", creator:"Anonymous", channel:"Confessions", createdAt: new Date("2018-12-21T16:00:00Z"), comments: ["urmom: bro", "poop: ok buddy", "jesus: this post made me laugh out loud"]})'

mongo --eval 'db.postmessages.insertOne({title: "Do I work for Google or Facebook?", message:"I’m getting 500k at Google but Facebook is giving me 510k", creator:"dummy12", channel:"Career Related", createdAt: new Date("2022-03-18T16:00:00Z"), comments: ["urmom: wtf?", "poop: ok buddy", "jesus: this post made me laugh out loud"]})'

mongo --eval 'db.postmessages.insertOne({title: "Guys I got a gf!", message:"ur mom", creator:"Anonymous", channel:"Relationships", createdAt: new Date("2020-04-18T16:00:00Z"), comments: ["urmom: love u babe", "charles: congrats", "mark: but im dating my mom"]})'

mongo --eval 'db.postmessages.insertOne({title: "Do I work for Google or Facebook?", message:"I’m getting 500k at Google but Facebook is giving me 510k", creator:"dummy12", channel:"Career Related", createdAt: new Date("2022-03-18T16:00:00Z"), comments: ["urmom: wtf?", "poop: ok buddy", "jesus: this post made me laugh out loud"]})'

mongo --eval 'db.postmessages.insertOne({title: "Should I take CS 33, CS 111, CS 131, CS 180, MATH115A, EC ENGR 102, and EC ENGR132A?", message:"I think it’s ok but my friends call me stupid.", creator:"lostchild123", channel:"School Advice", createdAt: new Date("2022-06-01T03:10:00Z"), comments: ["123dog: r u stupid lmao", "james: sounds good", "popo: ye"]})'




