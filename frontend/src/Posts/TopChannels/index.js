import IndivPosts from '../IndivPosts';
import { useEffect, useState } from 'react';

function TopChannel () {
    let [posts, setPosts] = useState(undefined);
    async function getPosts() {
        try {
          const response = await api.fetchPosts();
          console.log(response);
          let searchRes = [...response.data];
          setPosts(searchRes);
        } catch (error) {
          console.log(error.message);
        }
      }
    return (
        <div></div>
    );
}

export default TopChannel;