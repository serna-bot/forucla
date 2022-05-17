import { useEffect, useState } from "react";
import "./Search.scss";
import React from 'react';
import Select from 'react-select';
import { getCategories } from "../../categories";

function Search () {
    const categories = getCategories();
    const [category, setCategory] = useState("All posts");
    const [time, setTime] = useState("All time");
    const [searchInput, setSearchInput] = useState(undefined);
    const times = [{value: "1", label: "an hour ago"}, {value: "24", label: "a day ago"}, 
        {value: "168", label: "a week ago"}, {value: "5040", label: "a month ago"}];
    
    const onDropdownChangeForTime = (time) => {
        setTime(time);
    };
    const onDropdownChange = (category) => {
        setCategory(category);
    };
    const submitSelectedCategory = (effect) => {
        effect.preventDefault();
        let categoryString = "";
        let timeString = "";
        let searchString = "";
        if (category.value != undefined) {
            categoryString = "category=" + category.value;
        }
        if (time.value != undefined) {
            timeString = "&time=" + time.value;
        }
        if (searchInput != undefined) {
            searchString = "&contains=" + searchInput;
        }
        console.log(categoryString);
        console.log(timeString);
        console.log(searchInput);
        window.location = "http://localhost:3000/allposts?" + categoryString + timeString + searchString;
    };
    return (
        <div>Search:
            <div> 
                <form>
                    <label>
                        <input 
                            type="text"
                            placeholder="Search here"
                            value={searchInput}
                            onChange={e => setSearchInput(e.target.value)}
                        />
                    </label>
                    <label>
                        <Select
                            options={categories}
                            openMenuOnClick={false}
                            placeholder="Choose a Category"
                            onChange={onDropdownChange}
                        />
                    </label>
                    <label>
                        <Select
                            options={times}
                            openMenuOnClick={false}
                            placeholder="Choose a Time Period"
                            onChange={onDropdownChangeForTime}
                        />
                    </label>
                    <button type="submit" onClick={submitSelectedCategory}> Search</button>
                </form>
            </div>
        </div>
    );
}
export default Search;