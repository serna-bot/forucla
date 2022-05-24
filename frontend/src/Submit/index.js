import React from 'react';
import Select from 'react-select';
import { useEffect, useState } from 'react';
import './Submit.scss';
import Header from '../shared/Header';
import { getChannels } from '../shared/channels.js';
import * as api from '../api/index.js';

const dropStyling = {
  control: (base, state) => ({
    ...base,
    fontFamily: "Avenir",
    fontSize: 14,
    cursor: "text",
  }),

  option: (styles) => {
    return{
      ...styles,
      height: 31,
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

function Submit() {
  const [title, setTitle] = useState();
  const [message, setMessage] = useState();
  const [chosenChannel, setChannel] = useState();
  const date = new Date();
  const channels = getChannels();

  const handleDropdownChange = (chosenChannel) => {
    setChannel(chosenChannel.value);
  };

  async function submitPost() {
    let username = sessionStorage.getItem('username');
    if (sessionStorage.getItem('anonMode') === 'true') {
      username = 'Anonymous';
    }
    const post = {
      title: title,
      message: message,
      channel: chosenChannel,
      creator: username,
      createdAt: date,
    };

    try {
      const { data } = await api.createPost(post);
      window.location.href = `/posts`;
      console.log('Posted!');
      console.log(data);
    } catch (error) {
      console.log(error.message);
    }
  }

  return (
    <div>
      <Header />
      <div className='submit-page'>
        <form>
          <div id='title'>
            <label htmlFor='title-input'>Title:</label>
            <input type='text' name='title' id='title-input' placeholder='Write a title...' onChange={(e) => setTitle(e.target.value)}/>
          </div>
          <div id='description'>
            <textarea rows='10' name='description' id='description-input' placeholder='Write a message...' onChange={(e) => setMessage(e.target.value)}></textarea>
          </div>
          <Select
            options={channels}
            openMenuOnClick={false}
            maxMenuHeight={100}
            styles={dropStyling} 
            placeholder='You Must Choose a Channel'
            onChange={handleDropdownChange}
          />
        </form>
        <div>
          {sessionStorage['username'] ? (
            <button id='submit-button' type='submit' onClick={submitPost}>
              Submit
            </button>
          ) : (
            <p>You must be logged in to post.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Submit;
