'use client';

import Grid from '@mui/material/Unstable_Grid2';
import Container from '@mui/material/Container';

import { _coursePosts } from 'src/_mock';

import AllEvent from '../news&events/all-events';

// ----------------------------------------------------------------------

export default function AllEventsView() {
  return (
    <Container
      sx={{
        pt: 10,
      }}
    >
      <Grid container spacing={{ md: 8 }}>
        <Grid xs={12}>
          <AllEvent posts={_coursePosts} />
        </Grid>
      </Grid>
    </Container>
  );
}
