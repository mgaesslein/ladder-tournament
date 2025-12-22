import { useMemo, useCallback } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Chip,
} from '@mui/material';
import { useDrag, useDrop } from 'react-dnd';
import { Player as PlayerType } from '../types';
import { validateChallenge } from '../utils/challengeValidation';
import { useTiers } from '../hooks/useTiers';

type PlayerProps = {
  player: PlayerType;
  onChallengeInitiated: (challenger: PlayerType, opponent: PlayerType) => void;
}

function Player({ player, onChallengeInitiated }: PlayerProps) {
  const { draggedPlayer, setDraggedPlayer } = useTiers();

  const [{ opacity, isDragging }, dragRef] = useDrag(
    () => ({
      type: 'PLAYER',
      item: () => {
        setDraggedPlayer(player);
        return player;
      },
      end: () => {
        setDraggedPlayer(null);
      },
      collect: (monitor) => ({
        opacity: monitor.isDragging() ? 0.5 : 1,
        isDragging: monitor.isDragging(),
      }),
    }),
    [player, setDraggedPlayer]
  );

  const canBeChallenged = useMemo(() => {
    if (!draggedPlayer || draggedPlayer.id === player.id) {
      return false;
    }
    const validation = validateChallenge(draggedPlayer, player);
    return validation.isValid;
  }, [draggedPlayer, player]);

  const [{ isOver, canDrop }, drop] = useDrop(
    () => ({
      accept: 'PLAYER',
      drop: (challenger: PlayerType) => {
        if (challenger.id !== player.id) {
          onChallengeInitiated(challenger, player);
        }
      },
      canDrop: (challenger: PlayerType) => {
        if (challenger.id === player.id) return false;
        const validation = validateChallenge(challenger, player);
        return validation.isValid;
      },
      collect: (monitor) => ({
        isOver: monitor.isOver(),
        canDrop: monitor.canDrop(),
      }),
    }),
    [player, onChallengeInitiated]
  );

  const cardStyle = useMemo(() => {
    let borderColor = 'transparent';
    let borderWidth = 2;
    let transform = 'scale(1)';
    let cardOpacity = opacity;
    let backgroundColor: string | ((theme: any) => string) = 'background.paper';

    if (draggedPlayer && draggedPlayer.id !== player.id) {
      if (canBeChallenged) {
        backgroundColor = (theme: any) =>
          isOver
            ? theme.palette.mode === 'dark'
              ? 'rgba(76, 175, 80, 0.3)'
              : 'rgba(76, 175, 80, 0.15)'
            : theme.palette.mode === 'dark'
            ? 'rgba(76, 175, 80, 0.2)'
            : 'rgba(76, 175, 80, 0.1)';
        borderColor = 'success.main';
        transform = isOver ? 'scale(1.05)' : 'scale(1.02)';
      } else {
        backgroundColor = 'action.disabledBackground';
        cardOpacity = 0.5;
      }
    }

    if (isOver && canDrop) {
      transform = 'scale(1.08)';
      borderWidth = 3;
    }

    return {
      opacity: cardOpacity,
      backgroundColor,
      border: `${borderWidth}px solid`,
      borderColor,
      transform,
      transition: 'all 0.2s ease-in-out',
      cursor: isDragging ? 'grabbing' : 'grab',
      '&:hover': {
        transform: isDragging ? transform : 'scale(1.03)',
        boxShadow: 6,
      },
    };
  }, [isDragging, draggedPlayer, player, canBeChallenged, isOver, canDrop, opacity]);

  const combinedRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (node) {
        const dropRef = drop(node);
        dragRef(dropRef);
      }
    },
    [dragRef, drop]
  );

  return (
    <Box
      ref={combinedRef}
      sx={{ position: 'relative' }}
    >
      <Card sx={cardStyle}>
        <CardContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1 }}>
            <Typography variant="h6" component="div" align="center">
              {player.name}
            </Typography>
            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', justifyContent: 'center' }}>
              <Chip
                label={`Rank #${player.ranking}`}
                size="small"
                color="primary"
                variant="outlined"
              />
              <Chip
                label={`Row ${player.row}`}
                size="small"
                color="secondary"
                variant="outlined"
              />
            </Box>
            {draggedPlayer && draggedPlayer.id !== player.id && canBeChallenged && (
              <Chip
                label="Drop to challenge"
                size="small"
                color="success"
                sx={{ mt: 1 }}
              />
            )}
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}

export default Player;
