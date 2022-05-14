import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import GoogleLogin from "react-google-login";
import "./Homepage.scss";

// let client_id = "454105536452-d65nbgs30tvjn7gidu1tnkrjhiod19c8.apps.googleusercontent.com;
// let scopes = "https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.email";

function Homepage() {
    // let [email, setEmail] = useState(undefined);
    // async function login(code) {
    //     if (Cookies.get("token") === undefined || Cookies.get("token") === "undefined") {
    //         return ( <a id = "google_sign_in" href= {`https://accounts.google.com/o/oauth2/auth/identifier?scope=${scopes}&client_id=${client_id}`}>
    //             <span>Sign in with UCLA Google login</span>
    //             </a>);
    //     }
    //     else {
    //         var id_token = googleUser.getAuthResponse().id_token;
    //         console.log("ID Token: " + id_token);
    //         var profile = googleUser.getBasicProfile();
    //         let email = profile.getEmail();
    //         if (!(email.search("@ucla.edu")) && !(email.search("@g.ucla.edu"))) {
    //             <span>Please sign in with a Google account associated with UCLA.</span>
    //         }
    //     } 
    // }
    const handleLogin = async googleData => {
        const res = await fetch("http://localhost:4000/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          credentials: "include",
          body: JSON.stringify({
            token: googleData.tokenId
          }),
        }).catch((error) => {
          console.error(error);
        })
        if (googleData.tokenId != undefined) {
          console.log(googleData.tokenId);
        }
        console.log("fuck shit");
        let response = await res.json()
        if (response.logged) {
          window.location.reload(false);
        }
    }
    useEffect(() => {
      
      handleLogin()
    });
    return (
        <div className="home-mes"> 
            <h1>The forum for UCLA students and only UCLA students.</h1>
            <div id="login-mes">
            { (Cookies.get("token") === undefined || Cookies.get("token") == "undefined") ? 
              <div>
                <div> 
                  <GoogleLogin
                      clientId="661398999303-0to1gmb9v5im56fjttr6v3ab7l774651.apps.googleusercontent.com"
                      buttonText="Log in with your UCLA Google Account"
                      onSuccess={handleLogin}
                      onFailure={handleLogin}
                      cookiePolicy={'single_host_origin'}
                  />
                </div>
              </div>
              : <div> ur mom</div>}
            </div>
        </div>
        
    );
}

export default Homepage;