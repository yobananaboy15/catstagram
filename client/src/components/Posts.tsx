import React, { useState, useEffect, useContext } from "react";
import { Grid, CircularProgress } from "@material-ui/core";
import { getPosts } from "../api/index";
import { Post } from "./Post";
import { PostsContext } from "../contexts/PostsContext";

export const Posts = () => {
  const { posts, setPosts } = useContext(PostsContext);
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
