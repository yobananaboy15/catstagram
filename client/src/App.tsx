import React from "react";
import {Container, AppBar, Toolbar, Typography, CssBaseline, Button, Grid} from '@material-ui/core';
import {Posts} from './components/Posts'
import {ButtonUpload} from './components/ButtonUpload'

export const App = () => {
  return (
  <>
  <CssBaseline/>
  <AppBar position="static">
    <Container>
    <Toolbar>
      <Typography variant="h6">
        Nekostagram
      </Typography>
      <ButtonUpload />
    </Toolbar>
    </Container>
  </AppBar>
  <Container>
    <Grid container>
      <Grid item>
        <Posts />
      </Grid>
    </Grid>
  </Container>
  </>
  )
};
