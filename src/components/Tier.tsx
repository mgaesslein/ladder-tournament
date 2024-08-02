import { CardHeader, Grid, Paper } from '@mui/material';
import { Player, Tier } from '../types';
import PlayerComponent from './Player';
import { useEffect, useState } from 'react';
import useTiers from '../hooks/useTiers';

type TierProps = {
  id: number;
  name: string;
  data: Tier[];
}

function TierComponent({id, name}: TierProps) {
  const [tiers] = useTiers();
  const [thisTier, setThisTier] = useState<Tier | undefined>();
  useEffect(() => {
    const thisTier = tiers.find((tier) => tier.id === id);
    setThisTier(thisTier);
  }, [tiers, id]);

  return (
    <Paper elevation={20} sx={{ p: 2 }}>
      <CardHeader title={name} />
      <Grid container gap={2} justifyContent="center">
        {thisTier && thisTier.players.map((player: Player) => (
          <PlayerComponent key={player.name} id={player.id} name={player.name} />
        ))}
      </Grid>
    </Paper>
  );
}

export default TierComponent;
