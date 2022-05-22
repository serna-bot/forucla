import { useEffect, useState } from 'react';
import './Search.scss';
import React from 'react';
import Select from 'react-select';
import { getChannels } from '../../channels.js';

const dropStyling = {
  control: (base, state) => ({
    ...base,
    height: 31,
    width: 200,
    fontFamily: "Avenir",
    fontSize: 14,
    cursor: "text",
  }),

  option: (styles) => {
    return{
      ...styles,
      height: 31,
      width: 200,
      cursor: "pointer",
      fontFamily: "Avenir",
    }
  },

  input: styles => ({
    ...styles,
    color: "black",
    fontFamily: "Avenir",
  }),

  menu: styles => ({
    ...styles,
    position: "absolute",
    top: "20px",
  }),

}
function Search() {
  const channels = getChannels();
  const [channel, setChannel] = useState('');
  const [time, setTime] = useState('');
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
      <div className='searchStyling'>
        <div>
          <input 
            type='text' 
            placeholder='Search by Title' 
            value={searchInput} 
            onChange={(e) => setSearchInput(e.target.value)} />
        </div>
        <div>
          <Select 
            value={channel}
            options={channels} 
            openMenuOnClick={false} 
            placeholder='Search by Channel' 
            styles={dropStyling} 
            onChange={onDropdownChange} />
        </div>
        <div>
          <Select 
            value={time}
            options={times} 
            openMenuOnClick={false} 
            placeholder='Search by Time Period' 
            styles={dropStyling} 
            onChange={onDropdownChangeForTime} />
        </div>
        <button id= "button_styling" type='submit' onClick={submitSelectedChannel}>
          {' '}
          Search
        </button>
      </div>
    </div>
  );
}
export default Search;
