import { useEffect, useState } from "react";
import "./Posts.scss";
import IndivPosts from "./IndivPosts";

function Posts() {
    let [posts, setPosts] = useState(undefined);
    let username = sessionStorage.getItem("username");
    async function getPosts() {
        console.log("i've been called");
        let request = await fetch("http://localhost:4000/posts", {
            method: "GET",
            headers: {
                "Content-Type" : "application/json"
            },
            credentials: "include",
         });
        let response = await request.json();
        setPosts(response);
        console.log(response);
    }
    useEffect(()=>{
        if (posts === undefined) {
            getPosts();
        }
    }, [posts]);
    if (posts != undefined) {
        console.log("here are the posts");
        posts.map(function(currVal) {
            console.log(currVal.title);
            console.log(currVal.desc);
        })
    }
    return (
        <div className="Posts">
            <div id="post-title">
                <h1>{username}</h1>
            </div>    
            <div id="indiv-posts"> 
                {posts === undefined ?
                    <h1>loading</h1>
                    : posts.map(function(currVal) {
                        return (<IndivPosts
                            _id = {currVal._id}
                            title = {currVal.title}
                            desc = {currVal.desc}
                            category = {currVal.category}
                        />
                    )})
                }
            </div>      
        </div>
    );
}

export default Posts;