import { Box, Typography, Paper, Grid } from '@mui/material';
import { Tier as TierType } from '../types';
import Player from './Player';

type TierProps = {
  tier: TierType;
  onChallengeInitiated: (challenger: import('../types').Player, opponent: import('../types').Player) => void;
};

function Tier({ tier, onChallengeInitiated }: TierProps) {
  return (
    <Paper
      elevation={4}
      sx={{
        p: 3,
        mb: 3,
        background: (theme) =>
          theme.palette.mode === 'dark'
            ? 'linear-gradient(135deg, rgba(30, 30, 30, 0.9) 0%, rgba(40, 40, 40, 0.9) 100%)'
            : 'linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(245, 245, 245, 0.9) 100%)',
        borderRadius: 3,
        border: (theme) => `2px solid ${theme.palette.divider}`,
      }}
    >
      <Box sx={{ mb: 2, textAlign: 'center' }}>
        <Typography variant="h5" component="h2" fontWeight="bold" gutterBottom>
          {tier.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {tier.players.length} {tier.players.length === 1 ? 'player' : 'players'}
        </Typography>
      </Box>
      <Grid container spacing={2} justifyContent="center">
        {tier.players.map((player) => (
          <Grid key={player.id} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
            <Player player={player} onChallengeInitiated={onChallengeInitiated} />
          </Grid>
        ))}
      </Grid>
    </Paper>
  );
}

export default Tier;
