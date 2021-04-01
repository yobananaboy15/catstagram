import React, {useState, useEffect} from 'react'
import {getPosts} from '../api/index'

export const Posts = () => {

    interface postObject {
        description: string,
        tags: string
    }

    const [posts, setPosts] = useState<postObject[]>([]);

    useEffect(() => {
        const fetchPosts = async () => {
            const result = await getPosts();
            setPosts(result.data)
        }
        fetchPosts()
    }, [])
    

    return (
        //Gör om till post component
        <div>
            {posts.length ? posts.map(post => <p>{post.description} {post.tags}</p>) : 'Loading posts'}
        </div>
    )
}
