import { CardHeader, Grid, Paper } from '@mui/material';
import { Player, Tier } from '../types';
import PlayerComponent from './Player';
import { useDrop } from 'react-dnd';
import { useEffect, useState } from 'react';
import useTiers from '../hooks/useTiers';

type TierProps = {
  id: number;
  name: string;
  data: Tier[];
}

function TierComponent({id, name}: TierProps) {
  const [tiers, setTiers] = useTiers();
  const [thisTier, setThisTier] = useState<Tier | undefined>();
  useEffect(() => {
    const thisTier = tiers.find((tier) => tier.id === id);
    setThisTier(thisTier);
  }, [tiers, id]);


  const [, drop] = useDrop(() => ({
    accept: 'CARD',
    drop: (player: Player) => {
      const playerTier = tiers.find((tier) => tier.players.find((p) => p.name === player.name));
      const isInThisTier = playerTier?.id === id;
      const isInNextOrPrevTier = playerTier?.id === id + 1 || playerTier?.id === id - 1;
      if (isInThisTier) {
        return;
      }
      if (isInNextOrPrevTier) {
        const newTiers = tiers.map((tier) => {
          if (tier.id === id) {
            return {
              ...tier,
              players: [...tier.players, player],
            };
          }
    
          if (tier.id !== id) {
            return {
              ...tier,
              players: tier.players.filter((p) => p.name !== player.name),
            };
          }
    
          return tier;
        });

        setTiers(newTiers);
      }
  },
    canDrop: (player: Player) => {
      const playerTier = tiers.find((tier) => tier.players.find((p) => p.name === player.name));
      const isInThisTier = playerTier?.id === id;
      const isInNextOrPrevTier = playerTier?.id === id + 1 || playerTier?.id === id - 1;
      return isInThisTier || isInNextOrPrevTier;
    },
    collect: (monitor: any) => ({
      isOver: !!monitor.isOver(),
    }),
  }), [tiers])

  if (!thisTier) {
    return null;
  }

  return (
    <Paper elevation={20} sx={{ p: 2 }} ref={drop}>
      <CardHeader title={name} />
      <Grid container gap={2} justifyContent="center">
        {thisTier.players.map((player: Player) => (
          <PlayerComponent key={player.name} name={player.name} />
        ))}
      </Grid>
    </Paper>
  );
}

export default TierComponent;
