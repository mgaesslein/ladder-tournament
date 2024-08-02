import { createContext, useContext, ReactNode, useState, useEffect } from 'react';
import { Tier } from '../types';

const TiersContext = createContext<[Tier[], any, any]>([[], () => {}, () => {}]);

type Props = {
  children: ReactNode,
};

export function TiersProvider({ children } : Props) {
  const [tiers, setTiers] = useState<Tier[]>([]);

  useEffect(() => {
    fetchTiers();
  }, []);

  const fetchTiers = async () => {
    const response = await fetch('http://localhost:8000/players');
    const data = await response.json();
    const tiers = data.reduce((currentTiers: any, player: any) => {
      if (currentTiers.length === 0 || !currentTiers[player.row-1]) {
        currentTiers.push({
          id: player.row,
          name: player.row,
          players: [player],
        });
        return currentTiers;
      }
        currentTiers[player.row-1].players.push(player);
      
      return currentTiers;
    }, []);
    
    setTiers(tiers);
  }

  return (
    <TiersContext.Provider value={[tiers, setTiers, fetchTiers]}>
      {children}
    </TiersContext.Provider>
  );
}

const useTiers = () => useContext(TiersContext);

export default useTiers;
