import React, { useState, useEffect, useContext } from "react";
import { Grid, CircularProgress } from "@material-ui/core";
import { getPosts } from "../api/index";
import { Post } from "./Post";
import { PostsContext } from "../contexts/PostsContext";

// interface Post {
//   _id: object;
//   description?: string;
//   tags?: string;
//   imgURL: string;
// }
export const Posts = () => {
  const { posts, setPosts } = useContext(PostsContext); //Hämta detta från context
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      const result = await getPosts();
      setPosts(result.data);
      setIsLoading(false);
    };
    fetchPosts();
  }, []);

  return (
    //Gör om till post component
    //Tre tillstånd, 1: Det finns inga poster efter hämtning. posts = [], 2. Den laddar datan. 3. Det finns poster och dom är hämtade.
    <Grid container>
      {isLoading ? (
        <CircularProgress />
      ) : (
        posts.map((post) => {
          return (
            <Grid item>
              <Post post={post} />
            </Grid>
          );
        })
      )}
    </Grid>
  );
};
