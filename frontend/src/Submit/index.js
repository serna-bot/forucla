import React from 'react';
import Select from 'react-select';
import { useEffect, useState } from "react";
import "./Submit.scss";
import Header from "../shared/Header";
import {getCategories} from "../shared/categories.js"

function Submit() {
    const [title, setTitle] = useState();
    const [message, setMessage] = useState();
    const [chosenCategory, setCategory] = useState();
    const date = new Date();
    const categories = getCategories();

    const handleDropdownChange = (chosenCategory) => {
        setCategory(chosenCategory.value);
    };

    async function submitPost() {
        let username = sessionStorage.getItem("username");
        if (sessionStorage.getItem("anonMode") === 'true') {
            username = "Anonymous";
        }
        let request = await fetch("http://localhost:4000/posts", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify ({
                title: title,
                message: message,
                category: chosenCategory,
                creator: username,
                createdAt: date,
            }),
        })
        .catch((error) => {
            console.error(error);
        });
        let response = await request.json();
        console.log("Posted!");
        console.log(response);
        window.location.href = `/posts`
    }
    return (
        <div>
            <Header/>
            <div id="submit-page" className="App">
                <div id="title" className="form-input-container">
                    <label htmlFor="title-input">Title:</label>
                    <input type="text"
                        name="title"
                        id="title-input"
                        placeholder="Write a title..."
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>
                <div id="description" className="form-input-container">
                    <textarea rows="10"
                        name="description"
                        id="description-input"
                        placeholder="Write a post..."
                        onChange={(e) => setMessage(e.target.value)}
                    ></textarea>
                </div>
                <Select
                    // chosenCategory={chosenCategory}
                    options={categories}
                    openMenuOnClick={false}
                    placeholder="You Must Choose a Category"
                    onChange={handleDropdownChange}
                />
                <div>
                    {sessionStorage["username"] ?
                        <button id="submit-button" type="submit" onClick={submitPost}>Submit</button>
                        : <p>You must be logged in to post.</p>
                    }
                </div>
                
            </div>
        </div>
    );
}

export default Submit;