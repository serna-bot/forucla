import { useEffect, useState } from 'react';
import './Posts.scss';
import IndivPosts from './IndivPosts';
import * as api from '../api/index.js';
import Header from '../shared/Header';
import Channels from './Channels';
import Filters from './Filters'
import uclabanner from '../assets/uclabanner.png'
import TopChannels from './TopChannels';

function checkIfDateInRange(timeOfPost, currTime, range) {
  const newPostTime = timeOfPost.getTime();
  const upperBound = currTime.getTime();
  const timeInMS = range * 60 * 60 * 1000;
  const lowerBound = upperBound - timeInMS;
  if (newPostTime >= lowerBound && newPostTime <= upperBound) {
    return true;
  }
  return false;
}

function submitChange () {
  sessionStorage.removeItem("searchChannel");
  sessionStorage.removeItem("searchTitle");
  sessionStorage.removeItem("searchTime");
  sessionStorage.removeItem("channels");
  window.location.href = `http://localhost:3000/submit`;
};

function Posts() {
  let [posts, setPosts] = useState(undefined);

  async function getPosts() {
    try {
      const response = await api.fetchPosts();
      let searchRes = [...response.data];
      if (response !== undefined || response.size() !== 0) {
        searchRes = searchRes.reverse();
        const query = new URLSearchParams(window.location.search);
        if (query.has('multichannel')) {
          const multiChannel = query.get('multichannel');
          const channelArray = multiChannel.split(',');
          console.log(channelArray);
          response.data.forEach((element) => {
            let index = searchRes.indexOf(element);
            if (index !== -1) {
              if (!channelArray.includes(element.channel)) {
                searchRes.splice(index, 1);
              }
            }
          });
        } else {
          if (query.has('channel')) {
            const channel = query.get('channel');
            response.data.forEach((element) => {
              let index = searchRes.indexOf(element);
              if (index !== -1) {
                if (element.channel !== channel) {
                  searchRes.splice(index, 1);
                }
              }
            });
          }
          if (query.has('contains')) {
            const contains = query.get('contains').toLowerCase();
            response.data.forEach((element) => {
              let index = searchRes.indexOf(element);
              let lowercaseTitle = element.title.toLowerCase();
              if (index !== -1) {
                if (!lowercaseTitle.includes(contains)) {
                  searchRes.splice(index, 1);
                }
              }
            });
          }
          if (query.has('time')) {
            const time = parseInt(query.get('time'));
            const currTime = new Date();
            response.data.forEach((element) => {
              let index = searchRes.indexOf(element);
              if (index !== -1) {
                const checkingTime = new Date(element.createdAt);
                if (!checkIfDateInRange(checkingTime, currTime, time)) {
                  searchRes.splice(index, 1);
                }
              }
            });
          }
        }
      }
      setPosts(searchRes);
    } catch (error) {
      console.log(error.message);
    }
  }

  useEffect(() => {
    if (posts === undefined) {
      getPosts();
    }
  }, [posts]);

  return (
    <div>
      <Header />
      <div className='Posts'>
        <div className='Sidebar'>
          <img src={uclabanner} alt='banner'></img>
          <button id='submit_button' onClick={submitChange}>Submit a post!</button>
          <Channels/>
          <TopChannels/>
        </div>
          <div id='indiv-posts'>
          {(() => {
            if (posts === undefined) return <h1>No posts.</h1>;
            else if (posts.length === 0) return <h1>No posts.</h1>;
            else
              return posts.map(function (currVal) {
                return <IndivPosts _id={currVal._id} title={currVal.title} message={currVal.message} channel={currVal.channel} creator={currVal.creator} createdAt={currVal.createdAt} />;
              });
          })()}
        </div>
      </div>
      <Filters/>
    </div>
  );
}

export default Posts;
