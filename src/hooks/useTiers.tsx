import { createContext, useContext, ReactNode, useState, useEffect, useCallback } from 'react';
import { Tier, Player } from '../types';
import { api } from '../services/api';

interface TiersContextValue {
  tiers: Tier[];
  isLoading: boolean;
  error: string | null;
  draggedPlayer: Player | null;
  setDraggedPlayer: (player: Player | null) => void;
  fetchTiers: () => Promise<void>;
  refreshTiers: () => Promise<void>;
}

const TiersContext = createContext<TiersContextValue | undefined>(undefined);

type Props = {
  children: ReactNode;
};

export function TiersProvider({ children }: Props) {
  const [tiers, setTiers] = useState<Tier[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [draggedPlayer, setDraggedPlayer] = useState<Player | null>(null);

  const fetchTiers = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const players = await api.getPlayers();
      
      // Group players by row to create tiers
      const tiersMap = new Map<number, Tier>();
      
      players.forEach((player) => {
        const row = player.row;
        if (!tiersMap.has(row)) {
          tiersMap.set(row, {
            id: row,
            name: `Tier ${row}`,
            players: [],
          });
        }
        tiersMap.get(row)!.players.push(player);
      });

      // Convert map to array and sort by row
      const sortedTiers = Array.from(tiersMap.values()).sort((a, b) => a.id - b.id);
      setTiers(sortedTiers);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch players';
      setError(errorMessage);
      console.error('Error fetching tiers:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const refreshTiers = useCallback(async () => {
    await fetchTiers();
  }, [fetchTiers]);

  useEffect(() => {
    fetchTiers();
  }, [fetchTiers]);

  const value: TiersContextValue = {
    tiers,
    isLoading,
    error,
    draggedPlayer,
    setDraggedPlayer,
    fetchTiers,
    refreshTiers,
  };

  return (
    <TiersContext.Provider value={value}>
      {children}
    </TiersContext.Provider>
  );
}

export function useTiers(): TiersContextValue {
  const context = useContext(TiersContext);
  if (context === undefined) {
    throw new Error('useTiers must be used within a TiersProvider');
  }
  return context;
}
