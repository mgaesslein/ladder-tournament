import { Stack } from '@mui/material';
import TierComponent from './Tier';
import useTiers from '../hooks/useTiers';

function Ladder() {
  const [tiers] = useTiers();
  
  return (
    <Stack spacing={2} sx={{textAlign: 'center'}}>
      {tiers.map((tier) => (
        <TierComponent key={tier.id} id={tier.id} name={tier.name} data={tiers} />
      ))}
    </Stack>
  );
}

export default Ladder;
