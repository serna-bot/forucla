import "./Header.scss";
import Search from "./Search/";
import { useEffect, useState } from "react";

function Header() {
    return (
    <header>
        <div id="header-redirects">
            <Search/>
            <a id="header-submit" href={"/submit"}><button>Submit</button></a>
        </div>
    </header>
    );
}
export default Header;