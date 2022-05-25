import IndivPosts from '../IndivPosts';
import { useEffect, useState } from 'react';
import * as api from '../../api/index';

function TopChannels () {
    let [posts, setPosts] = useState(undefined);
    let count = {};
    let topFive = [];
    async function getPosts() {
        try {
          const response = await api.fetchPosts();
          console.log(response);
          setPosts([...response.data]);
          posts.forEach(element => {
              count[element] = count[element] ? count[element] + 1 : 1;
          });
          let sortable = [];
          for (var channel in count) {
              sortable.push([channel, count[channel]]);
          }
          sortable.sort(function(a, b) {
            return b[1] - a[1];
          });
          for (let i = 0; i < 5 && i < sortable.length; i++) {
            topFive.push(sortable[i]);
          }
        } catch (error) {
          console.log(error.message);
        }
      }
    return (
        <div>
            <div className='Rankings'>
                <p>Most Popular Channels: </p>
                {
                    (() => {
                    if (topFive !== undefined)
                        return (
                        topFive.map(function (currVal) {
                            return <div id='topChannels'>{currVal[0]} <p>{currVal[1]}</p></div>;
                        })
                        )
                    })()
                }
            </div>
        </div>
    );
}

export default TopChannels;