import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  Paper,
} from '@mui/material';
import { Player } from '../types';

type ChallengeDialogProps = {
  open: boolean;
  challenger: Player | null;
  opponent: Player | null;
  onClose: () => void;
  onConfirm: (winnerId: number) => void;
  isLoading?: boolean;
};

export function ChallengeDialog({
  open,
  challenger,
  opponent,
  onClose,
  onConfirm,
  isLoading = false,
}: ChallengeDialogProps) {
  if (!challenger || !opponent) {
    return null;
  }

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Challenge Result</DialogTitle>
      <DialogContent>
        <Typography variant="body1" sx={{ mb: 3 }}>
          Who won the match between <strong>{challenger.name}</strong> and{' '}
          <strong>{opponent.name}</strong>?
        </Typography>
        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
          <Paper
            elevation={3}
            sx={{
              p: 3,
              cursor: isLoading ? 'default' : 'pointer',
              transition: 'all 0.2s',
              '&:hover': isLoading ? {} : { transform: 'scale(1.05)', elevation: 6 },
              opacity: isLoading ? 0.6 : 1,
            }}
            onClick={() => !isLoading && onConfirm(challenger.id)}
          >
            <Typography variant="h6" align="center">
              {challenger.name}
            </Typography>
            <Typography variant="caption" color="text.secondary" align="center" display="block">
              (Challenger)
            </Typography>
          </Paper>
          <Paper
            elevation={3}
            sx={{
              p: 3,
              cursor: isLoading ? 'default' : 'pointer',
              transition: 'all 0.2s',
              '&:hover': isLoading ? {} : { transform: 'scale(1.05)', elevation: 6 },
              opacity: isLoading ? 0.6 : 1,
            }}
            onClick={() => !isLoading && onConfirm(opponent.id)}
          >
            <Typography variant="h6" align="center">
              {opponent.name}
            </Typography>
            <Typography variant="caption" color="text.secondary" align="center" display="block">
              (Defender)
            </Typography>
          </Paper>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} disabled={isLoading}>
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
}

