import React from 'react'

interface Props {
    post: {
        description?: string,
        tags?: string
        imgURL: string
    }
}

export const Post = ({post} : Props) => {
    return (
        <div>
        <img src={post.imgURL}/>
        </div>
    )
}
