'use client';

import React from 'react';

import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Unstable_Grid2';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { RouterLink } from 'src/routes/components';

import { useResponsive } from 'src/hooks/use-responsive';

import { _tours, _coursePosts } from 'src/_mock';

import Iconify from 'src/components/iconify';

import FeaturedEvent from '../news&events/featured-event';
import FeaturedPublication from '../publications/featured-publication';
import PresentationOfActivity from '../presentation-of-activity/presentation-of-activity';

// ----------------------------------------------------------------------
export default function HomeView() {
  const mdUp = useResponsive('up', 'md');
  const events = 'allEvents';
  const viewAllBtn = (
    <Button
      component={RouterLink}
      href={`${events}`}
      color="inherit"
      endIcon={<Iconify icon="carbon:chevron-right" />}
    >
      Voir tout
    </Button>
  );
  return (
    <>
      <PresentationOfActivity />
      <Container
        sx={{
          pt: 10,
        }}
      >
        <Stack
          direction="row"
          alignItems="center"
          justifyContent={{ xs: 'center', md: 'space-between' }}
          sx={{
            mb: { xs: 8, md: 10 },
          }}
        >
          <Typography variant="h3">Actus & Events</Typography>

          {mdUp && viewAllBtn}
        </Stack>
        <Grid container spacing={{ md: 8 }}>
          <Grid xs={12}>
            <FeaturedEvent posts={_coursePosts} />
          </Grid>
        </Grid>
        {!mdUp && (
          <Stack alignItems="center" sx={{ mt: 8 }}>
            {viewAllBtn}
          </Stack>
        )}
      </Container>
      <FeaturedPublication tours={_tours.slice(0, 4)} />
    </>
  );
}