import { useEffect, useState } from 'react';
import './Search.scss';
import React from 'react';
import Select from 'react-select';
import { getChannels } from '../.../../channels.js';

function Search() {
  const categories = getChannels();
  const [channel, setChannel] = useState('All posts');
  const [time, setTime] = useState('All time');
  const [searchInput, setSearchInput] = useState(undefined);
  const times = [
    { value: '1', label: 'an hour ago' },
    { value: '24', label: 'a day ago' },
    { value: '168', label: 'a week ago' },
    { value: '5040', label: 'a month ago' },
  ];

  const onDropdownChangeForTime = (time) => {
    setTime(time);
  };
  const onDropdownChange = (channel) => {
    setChannel(channel);
  };
  const submitSelectedChannel = (effect) => {
    effect.preventDefault();
    let channelString = '';
    let timeString = '';
    let searchString = '';
    if (channel.value != undefined) {
      channelString = 'channel=' + channel.value;
    }
    if (time.value != undefined) {
      timeString = '&time=' + time.value;
    }
    if (searchInput != undefined) {
      searchString = '&contains=' + searchInput;
    }
    console.log(channelString);
    console.log(timeString);
    console.log(searchInput);
    window.location = 'http://localhost:3000/posts?' + channelString + timeString + searchString;
  };
  return (
    <div>
      Search:
      <div>
        <form>
          <label>
            <input type='text' placeholder='Search here' value={searchInput} onChange={(e) => setSearchInput(e.target.value)} />
          </label>
          <label>
            <Select options={categories} openMenuOnClick={false} placeholder='Choose a Channel' onChange={onDropdownChange} />
          </label>
          <label>
            <Select options={times} openMenuOnClick={false} placeholder='Choose a Time Period' onChange={onDropdownChangeForTime} />
          </label>
          <button type='submit' onClick={submitSelectedChannel}>
            {' '}
            Search
          </button>
        </form>
      </div>
    </div>
  );
}
export default Search;
