import { createContext, useContext, ReactNode, useState, useEffect } from 'react';
import { Tier } from '../types';
import exampleData from '../data.json';

const TiersContext = createContext<[Tier[], any]>([[], () => {}]);

type Props = {
  children: ReactNode,
};

export function TiersProvider({ children } : Props) {
  const [tiers, setTiers] = useState<Tier[]>([]);

  useEffect(() => {
    setTiers(exampleData);
  }, []);

  return (
    <TiersContext.Provider value={[tiers, setTiers]}>
      {children}
    </TiersContext.Provider>
  );
}

const useTiers = () => useContext(TiersContext);

export default useTiers;
