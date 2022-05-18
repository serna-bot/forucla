import { useEffect, useState } from "react";
import "./IndivPosts.scss";

function IndivPosts (props) {
    console.log("these are the props:");
    console.log(props);
    return ( 
        <div className="post-indiv-container">
            <div>
                <div className="post-descript">
                    <div className="title-text-container"> 
                        <div>
                            This is a post: 
                            <h2>{props.title}</h2>
                        </div>
                        <p> {props.desc}</p>
                        <p> {props.category}</p>
                    </div>
                </div>
            </div> 
        </div>
    );
}

export default IndivPosts;