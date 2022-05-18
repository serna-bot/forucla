import express from 'express';
import bodyParser from 'body-parser';
// import cookieParser from 'cookie-parser';
import mongoose from 'mongoose';
import cors from 'cors';

import postRoutes from './routes/posts.js';
import loginRoutes from './routes/login.js';

const app = express();

app.use(bodyParser.json({ limit: '30mb' }));
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }));
app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true,
  })
);

app.use('/posts', postRoutes);
app.use('/login', loginRoutes);

const CONNECTION_URL = 'mongodb://localhost:27017';
const PORT = process.env.port || 4000;

mongoose
  .connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() =>
    app.listen(PORT, () => {
      console.log(`Server running on port: ${PORT}`);
    })
  )
  .catch((error) => console.log(error.message));

// app.post('/login', cors(), (req, res) => {
//   const url = oauth2Client.generateAuthUrl({
//     access_type: 'offline',
//     scope: ['https://www.googleapis.com/auth/userinfo.email'],
//     prompt: 'consent',
//   });
//   res.send({ url });
// });

// app.get('/handleGoogleRedirect', async (req, res) => {
//   const code = req.query.code;
//   console.log('code: ', code);
//   oauth2Client.getToken(code, (err, tokens) => {
//     if (err) {
//       console.log('handleGoogleRedirect Error:');
//       throw new Error('Issue with login', err.message);
//     }
//     const accessToken = tokens.access_token;
//     const refreshToken = tokens.refresh_token;
//     res.redirect(`http://localhost:3000?accessToken=${accessToken}&refreshToken=${refreshToken}`);
//   });
// });

// app.post('/getValidToken', async (req, res) => {
//   try {
//     const request = await fetch('https://www.googleapis.com/oauth2/v4/token', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({
//         client_id: clientId,
//         client_secret: clientSecret,
//         refreshToken: req.body.refreshToken,
//         grant_type: 'refresh_token',
//       }),
//     });

//     const data = await request.json();
//     console.log('Access token from getValidToken:', data.access_token);

//     res.json({
//       accessToken: data.access_token,
//     });
//   } catch (error) {
//     res.json({ error: error.message });
//   }
// });
