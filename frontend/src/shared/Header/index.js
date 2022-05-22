import "./Header.scss";
import Search from "./Search/";
// import {login} from "../../Homepage/index.js"
// import {logOut} from "../../Homepage/index.js"
import bear_homepage from "../../assets/bear_homepage.png"
import { useEffect, useState } from "react";

function getAnon() {
    return sessionStorage.getItem('anonMode') === 'true';
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
        <a href="http://localhost:3000/posts">
            <div id="logo"> 
                <h1 id="for_styling">FOR</h1><h1 id="ucla_styling">UCLA</h1> 
                <img src={bear_homepage} alt="bear_logo"/>
            </div>
        </a>
        <Search/>
        <div id="anon-toggle">
            <input id="switch" type="checkbox" checked={getAnon} onClick={changeAnon}/>
            <label for="switch" data-off = "AnOFF" data-on = "AnON">
            </label>
        </div>
        {/* <a>
            <button onClick={changeAnon}>Anon Mode</button>
        </a>   */}
        <div>
            {anonMode ?
            <p>Anon Monkey</p>
            : <p>{username}</p>
            }
        </div>
        {/* <div>
            {username === undefined ?
            <button onClick={login}> Login </button>
            : <button onClick={logOut}>Sign Out</button>
            }
            
        </div> */}
    </div>
    );
}
export default Header;