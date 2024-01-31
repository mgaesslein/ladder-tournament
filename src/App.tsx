import React from 'react';
import Ladder from './components/Ladder';
import { Container, CssBaseline, ThemeProvider, Typography, createTheme, useMediaQuery } from '@mui/material';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { TiersProvider } from './hooks/useTiers';

function App() {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode: prefersDarkMode ? 'dark' : 'light',
        },
      }),
    [prefersDarkMode],
  );

  return (
    <TiersProvider>
      <ThemeProvider theme={theme}>
        <DndProvider backend={HTML5Backend}>
          <CssBaseline />
          <Container maxWidth="lg">
            <Typography component="div" variant="h4" sx={{textAlign: 'center', margin: '10px'}}>
              KickerClub München Ladder
            </Typography>
            <Ladder />
          </Container>
        </DndProvider>
      </ThemeProvider>
    </TiersProvider>
  );
}

export default App;
