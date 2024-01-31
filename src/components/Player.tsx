import { Box, Card, CardContent, CardMedia, Typography } from '@mui/material';
import { useDrag } from 'react-dnd';

type PlayerProps = {
  name: string;
}

function Player({ name }: PlayerProps) {
  const [{ opacity }, dragRef] = useDrag(
    () => ({
      type: 'CARD',
      item: { name },
      collect: (monitor: any) => ({
        opacity: monitor.isDragging() ? 0.5 : 1
      })
    }),
    []
  )
  // return (
  //   <Grid item flexDirection="row" alignItems="center" gap={2} sx={{display: "inline-flex"}}>
  //     <img src="https://via.placeholder.com/50" alt={name} />
  //     <p>{name}</p>
  //   </Grid>
  // )

  return (
    <Card sx={{ display: 'flex', alignItems: 'center' }} ref={dragRef} style={{ opacity }}>
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
  )
}

export default Player;
