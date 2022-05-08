import { useEffect, useState } from "react";
import "./Posts.scss";
import IndivPosts from "./IndivPosts";

function Posts() {
    let [posts, setPosts] = useState(undefined);
    let [name, setName] = useState(undefined);
    async function getPosts() {
        const params = new URL(window.location.href).searchParams;
        console.log(params.get("name"));
        setName(params.get("name"));
    }
}

export default Posts;