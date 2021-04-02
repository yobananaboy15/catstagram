import React from "react";
import {Container, AppBar, Toolbar, Typography, CssBaseline, Button, Grid} from '@material-ui/core';
import {Posts} from './components/Posts'
import {FormDialog} from './components/FormDialog'

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
      <FormDialog />
    </Toolbar>
    </Container>
  </AppBar>
  <Container>
    <Posts />
  </Container>
  </>
  )
};
