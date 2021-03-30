import React from "react";
import {Container, AppBar, Toolbar, Typography, CssBaseline} from '@material-ui/core';

export const App = () => {
  return (
  <>
  <CssBaseline/>
  <AppBar>
    <Container>
    <Toolbar>
      <Typography variant="h6">
        Nekostagram
      </Typography>
    </Toolbar>
    </Container>
  </AppBar>
  <Container>
    <Typography variant="h6">
      Testing
    </Typography>
  </Container>
  </>
  )
};
