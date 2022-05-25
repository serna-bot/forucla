import "./Header.scss";
import Search from "./Search/";
// import {login} from "../../Homepage/index.js"
// import {logOut} from "../../Homepage/index.js"
import bear_homepage from "../../assets/bear_homepage.png"
import { useEffect, useState } from "react";

function signOut() {
    sessionStorage.clear();
    console.log("signed out");
    window.location.href = `http://localhost:3000`;
};

function signIn() {
    window.location.href = `http://localhost:3000`;
}

function gotoProfile() {
    // window.location.href = `http://localhost:3000`;
}

function goHome() {
    window.location.href = `http://localhost:3000/posts`;
    sessionStorage.removeItem("searchTitle");
    sessionStorage.removeItem("searchTime");
    sessionStorage.removeItem("searchChannel");
    sessionStorage.removeItem("channels");
}

function Header() {
    const currAnon = sessionStorage.getItem("anonMode") === 'true';
    let [anonMode, setAnonMode] = useState (currAnon);
    let username = undefined;
    if (sessionStorage["username"]) {
        username = sessionStorage.getItem("username");
    }
    function changeAnon () {
        setAnonMode(!currAnon);
        sessionStorage.setItem("anonMode", !currAnon);
    }
    return (
    <div className="header_styling">
        <div id="logo" onClick={goHome}> 
            <h1 id="for_styling">FOR</h1><h1 id="ucla_styling">UCLA</h1> 
            <img src={bear_homepage} alt="bear_logo"/>
        </div>
        <Search/>
        <div className="userProfile">
            {
                (() => {
                    if (sessionStorage["username"])
                        return (
                            <div id="logged-in">
                                <div id="anon-toggle">
                                    <input id="switch" type="checkbox" checked={anonMode} onClick={changeAnon}/>
                                    <label for="switch" data-off = "AnOFF" data-on = "AnON">
                                    </label>
                                </div>
                                <div className="dropdown">
                                    <button className="dropbtn"> 
                                    <img src={sessionStorage.getItem("profilePic")} alt="profPic"></img>
                                    {anonMode ?
                                    <p>AnonMode</p>
                                    : <p>{username}</p>
                                    }</button>
                                    <div className="dropdown-content">
                                        <button onClick={signOut}> Logout</button>
                                        <button onClick={gotoProfile}> Profile</button>
                                    </div>
                                </div>
                            </div>
                        );
                    else  
                        return (
                            <div id="guest-mode">
                                <div className="dropdown">
                                    <button className="dropbtn"><p>Guest</p></button>
                                    <div className="dropdown-content">
                                        <button onClick={signIn}> Login</button>
                                    </div>
                                </div>
                            </div>
                        );
                })()
            }
        </div>
        
    </div>
    );
}
export default Header;