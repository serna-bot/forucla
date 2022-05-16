import { useEffect, useState } from "react";
import "./Search.scss";
import React from 'react';
import Select from 'react-select';
import { getCategories } from "../../categories";

function Search () {
    const categories = getCategories();
    const [category, setCategory] = useState(null);
    const onDropdownChange = (cat) => {
        setCategory(cat);
    };
    const submitSelectedCategory = (effect) => {
        effect.preventDefault();
        window.location = "http://localhost:3000/posts?name=" + category.category;
    };
    return (
        <div>Search:
            <div> 
                <Select
                    options={categories}
                    openMenuOnClick={false}
                    placeholder="Choose a Category"
                    onChange={onDropdownChange}
                />
            </div>
        </div>
    );
}
export default Search;