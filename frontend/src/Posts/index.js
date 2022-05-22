import { useEffect, useState } from 'react';
import './Posts.scss';
import IndivPosts from './IndivPosts';
import * as api from '../api/index.js';
import Header from '../shared/Header';

function checkIfDateInRange(timeOfPost, currTime, range) {
  const newPostTime = timeOfPost.getTime();
  const upperBound = currTime.getTime();
  const timeInMS = range * 60 * 60 * 1000;
  const lowerBound = upperBound - timeInMS;
  if (newPostTime >= lowerBound && newPostTime <= upperBound) {
    console.log('yah', timeOfPost);
    return true;
  }
  return false;
}

function Posts() {
  let [posts, setPosts] = useState(undefined);
  let username = sessionStorage.getItem('username');

  async function getPosts() {
    try {
      console.log('try');
      const response = await api.fetchPosts();
      console.log(response);
      let searchRes = [...response.data];
      console.log('this is the response', response);
      if (response !== undefined || response.size() !== 0) {
        const query = new URLSearchParams(window.location.search);
        console.log('size of before1:', response.length);
        if (query.has('channel')) {
          const channel = query.get('channel');
          console.log('sort by channel:', channel);
          response.data.forEach((element) => {
            let index = searchRes.indexOf(element);
            if (index !== -1) {
              console.log('butt');
              console.log('size of:', searchRes.length);
              if (element.channel !== channel) {
                console.log('cat removal:', element);
                searchRes.splice(index, 1);
              }
            }
          });
        }
        console.log('size of before2:', response.length);
        if (query.has('contains')) {
          const contains = query.get('contains').toLowerCase();
          console.log('sort by contains:', contains);
          response.data.forEach((element) => {
            let index = searchRes.indexOf(element);
            let lowercaseTitle = element.title.toLowerCase();
            if (index !== -1) {
              if (!lowercaseTitle.includes(contains)) {
                console.log('content removal:', element);
                searchRes.splice(index, 1);
              }
            }
          });
        }
        console.log('size of before3:', response.length);
        if (query.has('time')) {
          const time = parseInt(query.get('time'));
          const currTime = new Date();
          console.log('sort by time:', query.get('time'));
          response.data.forEach((element) => {
            let index = searchRes.indexOf(element);
            if (index !== -1) {
              const checkingTime = new Date(element.createdAt);
              if (!checkIfDateInRange(checkingTime, currTime, time)) {
                console.log('time removal:', element);
                searchRes.splice(index, 1);
              }
            }
          });
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
        <a href={'/submit'}>
          <button id='submit_button'>Submit a post!</button>
        </a>
        <div></div>
        <div id='indiv-posts'>
          {posts === undefined ? (
            <h1>loading</h1>
          ) : (
            posts.map(function (currVal) {
              return <IndivPosts _id={currVal._id} title={currVal.title} message={currVal.message} channel={currVal.channel} creator={currVal.creator} createdAt={currVal.createdAt} />;
            })
          )}
        </div>
      </div>
    </div>
  );
}

export default Posts;
