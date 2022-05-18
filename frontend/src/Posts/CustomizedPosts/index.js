import { useEffect, useState } from "react";
import "./CustomizedPosts.scss";
import React from 'react';
import Select from 'react-select';
import { getCategories } from "../../shared/categories.js";

function CustomizedPosts() {
    const categories = getCategories();
    const [cats, setCats] = useState([]);
    const onDropdownChange = (e) => {
        var options = e.value;
        console.log(e.value);
        setCats(options);
    }
    const submitSelectedCategory = (effect) => {
        effect.preventDefault();
    };
    return (
        <div>
            <label>
                <Select
                    isMulti={true}
                    value={cats}
                    options={categories}
                    openMenuOnClick={false}
                    placeholder="Choose your Preferred Categories"
                    onChange={onDropdownChange}
                />
            </label>
            <button type="submit" onClick={submitSelectedCategory}> Search</button>
        </div>
    );
};

export default CustomizedPosts;
