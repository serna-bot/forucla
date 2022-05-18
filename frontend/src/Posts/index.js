import { useEffect, useState } from 'react';
import './Posts.scss';
import IndivPosts from './IndivPosts';
import * as api from '../api/index.js';

function Posts() {
    let [posts, setPosts] = useState(undefined);
    let username = sessionStorage.getItem('username');

    async function getPosts() {
        try {
            const { data } = await api.fetchPosts();
            console.log(data);
            setPosts(data);
        } catch (error) {
            console.log(error.message);
        }
    }

    useEffect(() => {
        if (posts === undefined) {
            getPosts();
        }
    }, [posts]);

    if (posts !== undefined) {
        console.log('here are the posts');
        posts.map(function (currVal) {
            console.log(currVal.title);
            console.log(currVal.desc);
        });
    }

    return (
        <div className='Posts'>
            <div id='post-title'>
                <h1>{username}</h1>
            </div>
            <div id='indiv-posts'>
                {posts === undefined ? (
                    <h1>loading</h1>
                ) : (
                    posts.map(function (currVal) {
                        return <IndivPosts _id={currVal._id} title={currVal.title} desc={currVal.desc} category={currVal.category} />;
                    })
                )}
            </div>
        </div>
    );
}

export default Posts;
