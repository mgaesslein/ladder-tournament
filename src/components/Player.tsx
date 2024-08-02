import { Box, Card, CardContent, CardMedia, Snackbar, Typography } from '@mui/material';
import { useDrag, useDrop } from 'react-dnd';
import { Player as PlayerType } from '../types';
import { useState } from 'react';
import useTiers from '../hooks/useTiers';

type PlayerProps = {
  id: number;
  name: string;
}

function Player({ id, name }: PlayerProps) {
  const [,,fetchTiers] = useTiers();
  const [ isSnackbarOpen, setSnackbarOpen ] = useState(false);
  const [ snackbarMessage, setSnackbarMessage ] = useState('');
  const [{ opacity }, dragRef] = useDrag(
    () => ({
      type: 'CARD',
      item: { id, name },
      collect: (monitor: any) => ({
        opacity: monitor.isDragging() ? 0.5 : 1
      })
    }),
    []
  )

  const [, drop] = useDrop(() => ({
    accept: 'CARD',
    drop: async (player: PlayerType) => {
      const searchParams = new URLSearchParams({
        challenger_id: player.id.toString(),
        opponent_id: id.toString(),
        winner_id: player.id.toString(),
      });
      const challengeResult = await fetch(`http://localhost:8000/challenges/?${searchParams}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const message = await challengeResult.json();

      setSnackbarMessage(message.message || message.detail);
      setSnackbarOpen(true);
      if (challengeResult.ok) {
        fetchTiers();
      }
  },
    canDrop: () => true,
    collect: (monitor: any) => ({
      isOver: !!monitor.isOver(),
    }),
  }), [])


  // return (
  //   <Grid item flexDirection="row" alignItems="center" gap={2} sx={{display: "inline-flex"}}>
  //     <img src="https://via.placeholder.com/50" alt={name} />
  //     <p>{name}</p>
  //   </Grid>
  // )

  return <div>
    {dragRef(drop((
      <div>
        <Card sx={{ display: 'flex', alignItems: 'center' }} style={{ opacity }}>
          <CardMedia
            component="img"
            sx={{ width: 151 }}
            src="https://via.placeholder.com/151" alt={name}
          />
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <CardContent sx={{ flex: '1 0 auto' }}>
              <Typography component="div" variant="h5">
                {name}
              </Typography>
            </CardContent>
          </Box>
        </Card>
      </div>
    )))}
    <Snackbar
      open={isSnackbarOpen}
      autoHideDuration={3000}
      onClose={() => setSnackbarOpen(false)}
      message={snackbarMessage}
      // action={action}
    />
  </div>

}

export default Player;
