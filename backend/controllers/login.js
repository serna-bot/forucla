import { google } from 'googleapis';

import apiKey from '../googlesso.json';

const clientId = apiKey.clientId;
const clientSecret = apiKey.clientSecret;

const oauth2Client = new google.auth.OAuth2(
  clientId,
  clientSecret,
  'http://localhost:4000/login/handleGoogleRedirect' // server redirect url handler
);

export const login = (req, res) => {
  const url = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: ['https://www.googleapis.com/auth/userinfo.email'],
    prompt: 'consent',
  });
  res.send({ url });
};

export const handleGoogleRedirect = async (req, res) => {
  const code = req.query.code;
  console.log('code: ', code);
  oauth2Client.getToken(code, (err, tokens) => {
    if (err) {
      console.log('handleGoogleRedirect Error:');
      throw new Error('Issue with login', err.message);
    }
    const accessToken = tokens.access_token;
    const refreshToken = tokens.refresh_token;
    res.redirect(`http://localhost:3000?accessToken=${accessToken}&refreshToken=${refreshToken}`);
  });
};

export const getValidToken = async (req, res) => {
  try {
    const request = await fetch('https://www.googleapis.com/oauth2/v4/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        client_id: clientId,
        client_secret: clientSecret,
        refreshToken: req.body.refreshToken,
        grant_type: 'refresh_token',
      }),
    });

    const data = await request.json();
    console.log('Access token from getValidToken:', data.access_token);

    res.json({
      accessToken: data.access_token,
    });
  } catch (error) {
    res.json({ error: error.message });
  }
};
