import './TopChannels.scss';
import { useEffect, useState } from 'react';
import * as api from '../../api/index';
import {getLogo} from '../../shared/getLogo.js'

let topFive = [];

function sortTopFive(props) {
    let count = {};
    if (props !== undefined || props.length() !== 0) {
        let allPosts = [...props];
        console.log("here", allPosts);
        props.forEach(element => {
            let index = allPosts.indexOf(element);
            if (index !== -1) {
                console.log(element.channel);
                count[element.channel] = count[element.channel] ? count[element.channel] + 1 : 1;
                allPosts.splice(index, 1);
            }
        });
        let sortable = [];
        for (var channel in count) {
            sortable.push([channel, count[channel]]);
        }
        sortable.sort(function(a, b) {
            return b[1] - a[1];
        });
        let temp = [];
        for (let i = 0; i < 5 && i < sortable.length; i++) {
            temp.push(sortable[i]);
        }
        topFive = [...temp];
        console.log("aqui",temp);
    }
};


function TopChannels () {
    let [posts, setPosts] = useState(undefined);
    async function getPosts() {
        try {
          const response = await api.fetchPosts();
          if (response !== undefined || response.size() !== 0) {
            setPosts(response.data);
        }
        } catch (error) {
          console.log(error.message);
        }
      }
    if (posts !== undefined) {
        console.log("poop", posts);
        sortTopFive(posts);
    }
    useEffect(() => {
        if (posts === undefined) {
            getPosts();
        }
    }, [posts]);
    return (
        <div>
            <div className='Rankings'>
                <p>Most Popular Channels: </p>
                {
                    (() => {
                    if (topFive !== undefined)
                        return (
                        topFive.map(function (currVal, index) {
                            return (
                                <div id='topChannels'> 
                                    <h3> {index + 1}</h3>
                                    <img src={getLogo(currVal[0])} alt='logo'></img>
                                    <h3>{currVal[0]}</h3> 
                                    <p>{currVal[1]}</p>
                                </div>
                            );
                        })
                        )
                    })()
                }
            </div>
        </div>
    );
}

export default TopChannels;