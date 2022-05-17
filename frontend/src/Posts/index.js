import { useEffect, useState } from "react";
import Header from "../shared/Header";
import "./Posts.scss";
import IndivPosts from "./IndivPosts";

function checkIfDateInRange(timeOfPost, currTime, range) {
    const newPostTime = timeOfPost.getTime();
    const upperBound = currTime.getTime();
    const timeInMS = range * 60 * 60 * 1000;
    const lowerBound = upperBound - timeInMS;
    if (newPostTime >= lowerBound && newPostTime <= upperBound) {
        console.log("yah", timeOfPost)
        return true;
    }
    return false;
}

function Posts() {
    let [posts, setPosts] = useState(undefined);
    let username = sessionStorage.getItem("username");
    let searchRes = posts;
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
        console.log("this is the response",response);
        if (response !== undefined || response.size() != 0) {
            searchRes = response;
            console.log("thing",searchRes);
            const query = new URLSearchParams(window.location.search);
            if (query.has("category")) {
                const category = query.get("category")
                console.log("sort by category:", category);
                searchRes.forEach(element => {
                    if (element.category != category) {
                        console.log("poop:", element);
                        searchRes.splice(searchRes.indexOf(element), 1);
                    }
                })
                if (searchRes[0].category != category) {
                    searchRes.splice(0, 1);
                }
            }
            if (query.has("contains")) {
                const contains = query.get("contains");
                console.log("sort by contains:", contains);
                searchRes.forEach(element => {
                    if (!element.title.includes(contains)) {
                        searchRes.splice(searchRes.indexOf(element), 1);
                    }
                })
                if (!searchRes[0].title.includes(contains)) {
                    searchRes.splice(0, 1);
                }
            }
            if (query.has("time")) {
                const time = parseInt(query.get("time"));
                const currTime = new Date();
                console.log("sort by time:", query.get("time"));
                searchRes.forEach(element => {
                    const checkingTime = new Date(element.createdAt);
                    if (!checkIfDateInRange(checkingTime, currTime, time)) {
                        searchRes.splice(searchRes.indexOf(element), 1);
                    }
                })
                const checkingTime = new Date(searchRes[0].createdAt);
                if (!checkIfDateInRange(checkingTime, currTime, time)) {
                    searchRes.splice(0, 1);
                }
            }
            console.log("current post:",response["posts"]);
        }
        setPosts(searchRes);
    }
    useEffect(()=>{
        if (posts === undefined) {
            getPosts();
        }
    }, [posts]);
    return (
        <div className="Posts">
            <Header/>
            <div id="post-title">
                <h1>{username}</h1>
            </div>    
            <div id="indiv-posts"> 
                {posts === undefined ?
                    <h1>loading</h1>
                    : 
                    posts.map(function(currVal) {
                        return (<IndivPosts
                            _id = {currVal._id}
                            title = {currVal.title}
                            message = {currVal.message}
                            category = {currVal.category}
                            creator = {currVal.creator}
                            createdAt = {currVal.createdAt}
                        />
                    )})
                }
            </div>    
        </div>
    );
}

export default Posts;