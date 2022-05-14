import { useEffect, useState } from "react";
import Cookies from "js-cookie";
// import GoogleLogin from "react-google-login";
import { GoogleLogin } from '@react-oauth/google';
import { GoogleOAuthProvider } from '@react-oauth/google';
import "./Homepage.scss";
import { setTokens } from "./token";
import { getEmail } from "./email.js";

// let client_id = "454105536452-d65nbgs30tvjn7gidu1tnkrjhiod19c8.apps.googleusercontent.com;
// let scopes = "https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.email";

function Homepage() {
  useEffect(() => {
    handleTokens();
  }, []);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const fail = async (data) => {
    console.log("Oh no: ");
    console.log(data);
  }
  const handleLogin = async () => {
    console.log("shit");
    try {
      const res = await fetch("http://localhost:4000/login", { 
      method: "POST",
      });
      const response = await res.json();
      console.log(response);
      window.location.href = response.url;
    }
    catch (error) {
      console.log("eerroro", error);
      throw new Error("Issue with Login", error.message);
    }
    
  };

  const handleTokens = () => {
    const query = new URLSearchParams(window.location.search);
    const accessToken = query.get("accessToken");
    const refreshToken = query.get("refreshToken");
    const expirationDate = newExpirationDate();
    if (accessToken && refreshToken) {
      storeToken(accessToken, refreshToken, expirationDate);
      setIsLoggedIn(true);
      console.log("Logged in");
    }
  };

  const newExpirationDate = () => {
    var expiration = new Date();
    expiration.setHours(expiration.getHours() + 1);
    return expiration;
  };

  const storeToken = async (token, refreshToken, expirationDate) => {
    sessionStorage.setItem("accessToken", token);
    sessionStorage.setItem("refreshToken", refreshToken);
    sessionStorage.setItem("expirationDate", expirationDate);
    console.log("storing token");
  };

  const signOut = () => {
    setIsLoggedIn(false);
    sessionStorage.clear();
    console.log("signed out");
  };

  

  return (
    <GoogleOAuthProvider clientId="661398999303-avkfe6v1tr5dnlfts8odpb04eo64fbq3.apps.googleusercontent.com">
      <div className="home-mes"> 
          <h1>The forum for UCLA students and only UCLA students.</h1>
          <div id="login-mes">
          { !isLoggedIn ? 
            <div>
              <div> 
                <GoogleLogin
                    clientId="661398999303-avkfe6v1tr5dnlfts8odpb04eo64fbq3.apps.googleusercontent.com"
                    buttonText="Log in with your UCLA Google Account"
                    onSuccess={handleLogin}
                    onFailure={fail}
                    cookiePolicy={'single_host_origin'}
                ></GoogleLogin>
              </div>
            </div>
            : (<>
            <button onClick= {getEmail}> email</button>
            <button onClick={signOut}>Sign Out</button>
            </>
          )}
          </div>
      </div>
      </GoogleOAuthProvider>
  );
}

export default Homepage;