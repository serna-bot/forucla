import "./Header.scss";
import Search from "./Search/";
// import {login} from "../../Homepage/index.js"
// import {logOut} from "../../Homepage/index.js"
import bear_homepage from "../../assets/bear_homepage.png"
import anon_profile from "../../assets/anon_profile.png"
import { useEffect, useState } from "react";

function signOut() {
    sessionStorage.clear();
    console.log("signed out");
    window.location.href = `http://localhost:3000`;
};

function signIn() {
    window.location.href = `http://localhost:3000`;
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
    var anMode = "AnON";
    if (!currAnon) {
        anMode= "AnOFF";
    }
    let [anonMode, setAnonMode] = useState (currAnon);
    let username = undefined;
    if (sessionStorage["username"]) {
        username = sessionStorage.getItem("username");
    }
    function changeAnon () {
        console.log(currAnon);
        setAnonMode(!currAnon);
        sessionStorage.setItem("anonMode", !currAnon);
        console.log(currAnon);
    }
    function anonModeStyling() {
        if (anonMode) {
            return "anon-dropbtn";
        }
        return "dropbtn"
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
                                            <p>{anMode}</p>
                                    </label>
                                </div>
                                <div className="dropdown">
                                    <button className={anonModeStyling()}> 
                                    
                                    {anonMode ?
                                    <div id="pic-user">
                                        <img src={anon_profile} alt="profPic" id="anon-pic"></img>
                                        <p>Anonymous</p>
                                    </div>
                                    : <div id="pic-user">
                                        <img src={sessionStorage.getItem("profilePic")} alt="profPic" id="user-pic"></img>
                                        <p>{username}</p>
                                    </div>
                                    }</button>
                                    <div className="dropdown-content">
                                        <button onClick={signOut}> Logout</button>
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