import React, { createContext } from "react";

interface Post {
  _id: object;
  description?: string;
  tags?: string;
  imgURL: string;
}

interface PostsContext {
  posts: Post[];
  setPosts: React.Dispatch<React.SetStateAction<Post[]>>;
}

export const PostsContext = createContext({} as PostsContext);
