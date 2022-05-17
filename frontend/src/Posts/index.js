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
        let searchRes = [...response];
        console.log("this is the response",response);
        if (response != undefined || response.size() != 0) {
            const query = new URLSearchParams(window.location.search);
            console.log("size of before1:", response.length)
            if (query.has("category")) {
                const category = query.get("category")
                console.log("sort by category:", category);
                response.forEach(element => {
                    let index = searchRes.indexOf(element);
                    if (index !== -1) {
                        console.log("butt")
                        console.log("size of:", searchRes.length)
                        if (element.category != category) {
                            console.log("cat removal:", element);
                            searchRes.splice(index, 1);
                        }
                    }
                })
            }
            console.log("size of before2:", response.length)
            if (query.has("contains")) {
                const contains = query.get("contains");
                console.log("sort by contains:", contains);
                response.forEach(element => {
                    let index = searchRes.indexOf(element);
                    if (index !== -1) {
                        if (!element.title.includes(contains)) {
                            console.log("content removal:", element);
                            searchRes.splice(index, 1);
                        }
                    }
                })
            }
            console.log("size of before3:", response.length)
            if (query.has("time")) {
                const time = parseInt(query.get("time"));
                const currTime = new Date();
                console.log("sort by time:", query.get("time"));
                response.forEach(element => {
                    let index = searchRes.indexOf(element);
                    if (index !== -1) {
                        const checkingTime = new Date(element.createdAt);
                        if (!checkIfDateInRange(checkingTime, currTime, time)) {
                            console.log("time removal:", element);
                            searchRes.splice(index, 1);
                        }
                    }
                })
            }
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
            <a id="header-submit" href={"/submit"}><button>Submit a post!</button></a>
            <div></div>
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