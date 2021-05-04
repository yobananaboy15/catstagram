import React, { useState, useEffect, useContext } from "react";
import { Grid, CircularProgress } from "@material-ui/core";
import { getPosts } from "../api/index";
import { Post } from "./Post";
import { PostsContext } from "../contexts/PostsContext";

export const Posts = () => {
  const { posts, setPosts } = useContext(PostsContext);
  const [isLoading, setIsLoading] = useState(true);
  const [postOffset, setPostOffset] = useState({ limit: 5, offset: 5 });

  useEffect(() => {
    const fetchPosts = async () => {
      const result = await getPosts(postOffset);
      setPosts([...posts, ...result.data]);
      setIsLoading(false);
    };
    fetchPosts();
  }, [postOffset]);

  return (
    <Grid container>
      {isLoading ? (
        <CircularProgress />
      ) : (
        <>
          {posts.map((post) => {
            return (
              <Grid item>
                <Post post={post} />
              </Grid>
            );
          })}
          <button
            onClick={() =>
              setPostOffset({ ...postOffset, offset: postOffset.offset + 5 })
            }
          >
            Show more cats
          </button>
        </>
      )}
    </Grid>
  );
};
