'use client';

import Grid from '@mui/material/Unstable_Grid2';
import Container from '@mui/material/Container';

import AllEvent from '../news&events/all-events';

// ----------------------------------------------------------------------
type Props = {
  Events: any;
};
export default function AllEventsView({ Events }: Props) {
  return (
    <Container
      sx={{
        pt: 10,
      }}
    >
      <Grid container spacing={{ md: 8 }}>
        <Grid xs={12}>
          <AllEvent posts={Events} />
        </Grid>
      </Grid>
    </Container>
  );
}
