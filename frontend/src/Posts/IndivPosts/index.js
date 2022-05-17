import { useEffect, useState } from "react";
import "./IndivPosts.scss";

function IndivPosts (props) {
    // const [title, setTitle] = useState(undefined);
    // const [desc, setDesc] = useState(undefined);

    // async function getTitle() {
    //     let request = await fetch("http://localhost:4000/get-title", {
    //         method: "GET",
    //         headers: {
    //             "Content-Type" : "application/json",
    //         },
    //         credentials: "include",
    //     })
    //     .catch((error) => {
    //         console.error(error);
    //     });
    //     let response = await request.json();
    //     console.log(response);
    //     setTitle(response);
    // }

    // async function getDesc() {
    //     let request = await fetch("http://localhost:4000/get-desc", {
    //         method: "GET",
    //         headers: {
    //             "Content-type" : "application/json"
    //         },
    //         credentials: "include",
    //     })
    //     .catch((error) => {
    //         console.error(error);
    //     });
    //     let response = await request.json();
    //     console.log(response);
    //     setDesc(response);
    // }

    // useEffect(()=>{
    //     getTitle();
    //     getDesc();
    // }, []);
    // console.log("these are the props:");
    // console.log(props);
    return ( 
        <div className="post-indiv-container">
            <div>
                <div className="post-descript">
                    <div className="title-text-container"> 
                        <div>
                            This is a post: 
                            <h2>{props.title}</h2>
                        </div>
                        <p> {props.message}</p>
                        <p> {props.category}</p>
                        <p> {props.creator} </p>
                        <p> {props.createdAt} </p>
                    </div>
                </div>
            </div> 
        </div>
    );
}

export default IndivPosts;