# ForUCLA

ForUCLA is a web application that aims to connect bruins to UCLA. We provide a list of UCLA-related events and links to necessary websites like BruinLearn and MyUCLA. Most importantly, we provide a forum where bruins can connect with one and another to ask for career advice, information on club recruitment, share memes, etc!

## Features:

- User Login/Authentication via Google
- Ability to post textual content
- Ability to comment, upvote, and downvote on posts
- Different, organized categories to post on
- Search functionality for posts
- Ability to post anonymously

## Technologies:

- MongoDB
- Express.js
- Node.js
- React.js
- SCSS
- JavaScript

## Setup:

In order to run this application locally, you will first need to download or clone a copy of this repository.

### Backend:

Note that you need to obtain a Google OAuth key using your UCLA email in order for the login to function. You can obtain a key here:
https://console.cloud.google.com/apis/dashboard

Ensure that you enable the People API and that the OAuth Consent Screen, User Type is set to internal.

Create a new project and create a credential with
http://localhost:3000, http://localhost, http://localhost:4000 in the Authorized JavaScript origins.

Under Authorized redirect URIs, include the following:
http://localhost:4000/handleGoogleRedirect, http://localhost:3000/handleGoogleRedirect, http://localhost:4000/login, http://localhost:3000/login

Make sure you have MongoDB downloaded and running (see the documentation here: https://www.mongodb.com/docs/manual/).

In the package.json, modify the npm start script to be:

```
"start": "node --experimental-json-modules server.js"
```

Then type the following into your terminal to start the backend:

```
cd backend
npm install
npm start
```

Make sure you have version 14.18.0 of Node and version 6.14.15 of npm. You can check the versions using the following commands:

```
node -v
npm -v
```

### Frontend:

To start the front, open a new terminal and type the following:

```
cd frontend
npm install
npm start
```

The app should be running now

### Data:

To populate the database, you can use the following shell script:

```
cd backend
./dbposts.sh
```

## Authors:

This project was created by Serena Ong, Brandon Yan, Kenneth Park, Ishita Ghosh, and Soohyun Mun for a project for CS 35L taught by Professor Paul Eggert in Spring 2022 at UCLA.
