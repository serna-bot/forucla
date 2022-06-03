import { useEffect, useState, useNavigate } from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { GoogleOAuthProvider } from '@react-oauth/google';
import './Homepage.scss';
import { getEmail } from './email.js';
import { getPhoto } from './email.js';
import welcome3 from '../assets/welcome3.mp4';

let client_id = '454105536452-d65nbgs30tvjn7gidu1tnkrjhiod19c8.apps.googleusercontent.com';

function Homepage() {
  useEffect(() => {
    handleTokens();
  }, []);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState(undefined);
  const fail = async (data) => {
    console.log('Oh no: ');
    console.log(data);
  };
  const handleLogin = async () => {
    try {
      const res = await fetch('http://localhost:4000/login', {
        method: 'POST',
      });
      const response = await res.json();
      console.log(response);
      window.location.href = response.url;
    } catch (error) {
      console.log('eerroro', error);
      throw new Error('Issue with Login', error.message);
    }
    // console.log(data);
  };

  const handleTokens = async () => {
    const query = new URLSearchParams(window.location.search);
    const accessToken = query.get('accessToken');
    console.log(query.get('accessToken'));
    const refreshToken = query.get('refreshToken');
    const expirationDate = newExpirationDate();
    if (accessToken && refreshToken) {
      storeToken(accessToken, refreshToken, expirationDate);
      setIsLoggedIn(true);
      console.log('Logged in');
    }
    let getUsername = await getEmail();
    let getProfPic = await getPhoto();
    getUsername = getUsername.substr(0, getUsername.indexOf('@'));
    sessionStorage.setItem('username', getUsername);
    sessionStorage.setItem('profilePic', getProfPic);
    setUsername(getUsername);
  };

  const newExpirationDate = () => {
    var expiration = new Date();
    expiration.setHours(expiration.getHours() + 1);
    return expiration;
  };

  const storeToken = async (token, refreshToken, expirationDate) => {
    sessionStorage.setItem('accessToken', token);
    sessionStorage.setItem('refreshToken', refreshToken);
    sessionStorage.setItem('expirationDate', expirationDate);
    sessionStorage.setItem('anonMode', false);
    console.log('storing token', sessionStorage.getItem('accessToken'));
  };

  const goToHome = () => {
    window.location.href = `http://localhost:3000/posts`;
  };

  const goToSubmit = () => {
    window.location.href = `http://localhost:3000/submit`;
  };

  const Route = () => {
    useEffect(() => {
      window.location.href = `http://localhost:3000/posts`;
    });

    return <div></div>;
  };

  return (
    <GoogleOAuthProvider clientId={client_id}>
      <div className='home-mes'>
        <div id='login-mes'>
          {!isLoggedIn ? (
            <div className='welcome' id='text_dec'>
              <video autoplay='' muted loop id='myVideo'>
                {' '}
                <source src={welcome3} type='video/mp4'></source>
              </video>
              <div className='overlay_blue'>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>

                <div>
                  <h1> Welcome to ForUCLA </h1>
                  <br></br>
                  <br></br>
                  <button class='button-55' onClick={handleLogin}>
                    {' '}
                    Log with your UCLA Google Account{' '}
                  </button>
                  <h2 className='h2-line'>OR</h2>
                  <button class='button-55' onClick={goToHome}>
                    {' '}
                    &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; Browse as a guest! &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp;&nbsp; &nbsp;{' '}
                  </button>
                </div>
              </div>
              <br></br>
              <br></br>
              <div className='overlay_emblem'> </div>
            </div>
          ) : (
            <Route />
          )}
        </div>
      </div>
    </GoogleOAuthProvider>
  );
}

export default Homepage;
