import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { GoogleLogin } from '@react-oauth/google';
import { GoogleOAuthProvider } from '@react-oauth/google';
import "./Homepage.scss";
import { setTokens } from "./token";
import { getEmail } from "./email.js";

let client_id = "454105536452-d65nbgs30tvjn7gidu1tnkrjhiod19c8.apps.googleusercontent.com";

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
    // console.log(data);
  };

  const handleTokens = async () => {
    const query = new URLSearchParams(window.location.search);
    const accessToken = query.get("accessToken");
    console.log(query.get("accessToken"));
    const refreshToken = query.get("refreshToken");
    const expirationDate = newExpirationDate();
    if (accessToken && refreshToken) {
      storeToken(accessToken, refreshToken, expirationDate);
      setIsLoggedIn(true);
      console.log("Logged in");
    }
    let getUsername = await getEmail();
    getUsername = getUsername.substr(0, getUsername.indexOf("@"));
    sessionStorage.setItem("username", getUsername);
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
    
    console.log("storing token", sessionStorage.getItem("accessToken"));
  };

  const signOut = () => {
    setIsLoggedIn(false);
    sessionStorage.clear();
    console.log("signed out");
    window.location.href = `http://localhost:3000`;
  };

  const goToHome = () => {
    window.location.href = `http://localhost:3000/posts`;
  };

  return (
    <GoogleOAuthProvider clientId= {client_id}>
      <div className="home-mes"> 
          <div id="login-mes">
          { !isLoggedIn ? 
            <div>
              <h1>The forum for UCLA students and only UCLA students.</h1>
              <div> 
                <GoogleLogin
                    clientId={client_id}
                    buttonText="Log in with your UCLA Google Account"
                    onSuccess={handleLogin}
                    onFailure={fail}
                    cookiePolicy={'single_host_origin'}
                ></GoogleLogin>
              </div>
            </div>
            : (<>
            <h1>Welcome!</h1>
            <button onClick={goToHome}> Go to Homepage</button>
            <button onClick={signOut}>Sign Out</button>
            </>
          )}
          </div>
      </div>
      </GoogleOAuthProvider>
  );
}

export default Homepage;