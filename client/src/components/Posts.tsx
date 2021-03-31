import React, {useState, useEffect} from 'react'
import {getPosts} from '../api/index'

export const Posts = () => {

    interface postObject {
        kek: string
    }

    const [posts, setPosts] = useState<postObject[]>([]);

    useEffect(() => {
        const fetchPosts = async () => {
            const result = await getPosts();
            console.log('fetchd')
            setPosts(result.data)
        }
        fetchPosts()
    }, [])
    

    return (
        <div>
            {posts.length ? posts.map(post => <p>{post.kek}</p>) : 'Loading posts'}
        </div>
    )
}
