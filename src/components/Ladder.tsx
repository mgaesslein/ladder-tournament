import { Box, CircularProgress, Alert, Typography } from '@mui/material';
import Tier from './Tier';
import { useTiers } from '../hooks/useTiers';
import { Player } from '../types';

type LadderProps = {
  onChallengeInitiated: (challenger: Player, opponent: Player) => void;
};

function Ladder({ onChallengeInitiated }: LadderProps) {
  const { tiers, isLoading, error } = useTiers();

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '400px' }}>
        <CircularProgress size={60} />
      </Box>
    );
  }

  if (error) {
    return (
      <Alert severity="error" sx={{ mb: 3 }}>
        {error}
      </Alert>
    );
  }

  if (tiers.length === 0) {
    return (
      <Box sx={{ textAlign: 'center', py: 8 }}>
        <Typography variant="h6" color="text.secondary">
          No players found. Add some players to get started!
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ width: '100%' }}>
      {tiers.map((tier) => (
        <Tier key={tier.id} tier={tier} onChallengeInitiated={onChallengeInitiated} />
      ))}
    </Box>
  );
}

export default Ladder;
