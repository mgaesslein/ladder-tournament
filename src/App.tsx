import React, { useState } from 'react';
import Ladder from './components/Ladder';
import {
  Container,
  CssBaseline,
  ThemeProvider,
  Typography,
  createTheme,
  useMediaQuery,
  Box,
  Snackbar,
  Alert,
} from '@mui/material';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { TiersProvider, useTiers } from './hooks/useTiers';
import { ChallengeDialog } from './components/ChallengeDialog';
import { Player } from './types';
import { api } from './services/api';

function AppContent() {
  const { refreshTiers, setDraggedPlayer } = useTiers();
  const [challengeDialogOpen, setChallengeDialogOpen] = useState(false);
  const [challenger, setChallenger] = useState<Player | null>(null);
  const [opponent, setOpponent] = useState<Player | null>(null);
  const [isSubmittingChallenge, setIsSubmittingChallenge] = useState(false);
  const [snackbar, setSnackbar] = useState<{ open: boolean; message: string; severity: 'success' | 'error' }>({
    open: false,
    message: '',
    severity: 'success',
  });

  const handleChallengeInitiated = (challengerPlayer: Player, opponentPlayer: Player) => {
    setChallenger(challengerPlayer);
    setOpponent(opponentPlayer);
    setChallengeDialogOpen(true);
    setDraggedPlayer(null);
  };

  const handleChallengeConfirm = async (winnerId: number) => {
    if (!challenger || !opponent) return;

    setIsSubmittingChallenge(true);
    try {
      const result = await api.createChallenge({
        challenger_id: challenger.id,
        opponent_id: opponent.id,
        winner_id: winnerId,
      });

      setSnackbar({
        open: true,
        message: result.message,
        severity: 'success',
      });
      setChallengeDialogOpen(false);
      await refreshTiers();
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to submit challenge';
      setSnackbar({
        open: true,
        message: errorMessage,
        severity: 'error',
      });
    } finally {
      setIsSubmittingChallenge(false);
      setChallenger(null);
      setOpponent(null);
    }
  };

  const handleChallengeDialogClose = () => {
    if (!isSubmittingChallenge) {
      setChallengeDialogOpen(false);
      setChallenger(null);
      setOpponent(null);
      setDraggedPlayer(null);
    }
  };

  return (
    <>
      <Box
        sx={{
          background: (theme) =>
            theme.palette.mode === 'dark'
              ? 'linear-gradient(180deg, rgba(18, 18, 18, 1) 0%, rgba(30, 30, 30, 1) 100%)'
              : 'linear-gradient(180deg, rgba(250, 250, 250, 1) 0%, rgba(255, 255, 255, 1) 100%)',
          minHeight: '100vh',
          py: 4,
        }}
      >
        <Container maxWidth="xl">
          <Box sx={{ textAlign: 'center', mb: 4 }}>
            <Typography
              variant="h3"
              component="h1"
              fontWeight="bold"
              sx={{
                mb: 1,
                background: (theme) =>
                  theme.palette.mode === 'dark'
                    ? 'linear-gradient(45deg, #fff 30%, #bbb 90%)'
                    : 'linear-gradient(45deg, #1976d2 30%, #42a5f5 90%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              KickerClub München Ladder
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Challenge players above you to climb the pyramid!
            </Typography>
          </Box>
          <Ladder onChallengeInitiated={handleChallengeInitiated} />
        </Container>
      </Box>

      <ChallengeDialog
        open={challengeDialogOpen}
        challenger={challenger}
        opponent={opponent}
        onClose={handleChallengeDialogClose}
        onConfirm={handleChallengeConfirm}
        isLoading={isSubmittingChallenge}
      />

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity={snackbar.severity}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  );
}

function App() {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode: prefersDarkMode ? 'dark' : 'light',
          primary: {
            main: '#1976d2',
          },
          secondary: {
            main: '#9c27b0',
          },
        },
        typography: {
          fontFamily: [
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
          ].join(','),
        },
        shape: {
          borderRadius: 12,
        },
      }),
    [prefersDarkMode]
  );

  return (
    <TiersProvider>
      <ThemeProvider theme={theme}>
        <DndProvider backend={HTML5Backend}>
          <CssBaseline />
          <AppContent />
        </DndProvider>
      </ThemeProvider>
    </TiersProvider>
  );
}

export default App;
