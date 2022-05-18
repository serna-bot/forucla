import "./Header.scss";
import Search from "./Search/";
// import {login} from "../../Homepage/index.js"
// import {logOut} from "../../Homepage/index.js"
import { useEffect, useState } from "react";

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
    <header>
        <div id="header-redirects">
            <Search/>
        </div>
        <div>
            <button onClick={changeAnon}>Anon Mode</button>
            </div>  
            <div>
                {anonMode ?
                <h1>Anon Monkey</h1>
                : <h1>{username}</h1>
                }
            </div>
            {/* <div>
                {username === undefined ?
                <button onClick={login}> Login </button>
                : <button onClick={logOut}>Sign Out</button>
                }
                
            </div> */}
    </header>
    );
}
export default Header;