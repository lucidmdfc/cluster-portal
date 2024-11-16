'use client';

import Grid from '@mui/material/Unstable_Grid2';
import Container from '@mui/material/Container';

import AllPublication from '../publications/allPublications';

// ----------------------------------------------------------------------
type Props = {
  Publications: any;
};
export default function AllPublicationsView({ Publications }: Props) {
  return (
    <Container
      sx={{
        pt: 10,
      }}
    >
      <Grid container spacing={{ md: 8 }}>
        <Grid xs={12}>
          <AllPublication posts={Publications} />
        </Grid>
      </Grid>
    </Container>
  );
}
