import React, { useState } from "react";
import {
  Container,
  AppBar,
  Toolbar,
  Typography,
  CssBaseline,
  Button,
  Grid,
} from "@material-ui/core";
import { Posts } from "./components/Posts";
import { FormDialog } from "./components/FormDialog";
import { PostsContext } from "./contexts/PostsContext";

interface Post {
  _id: object;
  description?: string;
  tags?: string;
  imgURL: string;
}

export const App = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  return (
    <>
      <PostsContext.Provider value={{ posts, setPosts }}>
        <CssBaseline />
        <AppBar position="static">
          <Container>
            <Toolbar>
              <Typography variant="h6">Nekostagram</Typography>
              <FormDialog />
            </Toolbar>
          </Container>
        </AppBar>
        <Container>
          <Posts />
        </Container>
      </PostsContext.Provider>
    </>
  );
};
