'use client';

import React from 'react';

import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Unstable_Grid2';
import Container from '@mui/material/Container';
// import { useTheme } from '@mui/material/styles';

import RichText from 'src/components/rich-text/rich-text';

// import { useResponsive } from 'src/hooks/use-responsive';

import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';

// import ElearningLatestPosts from '../../blog/elearning/elearning-latest-posts';

// ----------------------------------------------------------------------
type Props = {
  Data?: any;
};

export default function HomePostsDetail({ Data }: Props) {
  return (
    <>
      <Container sx={{ overflow: 'hidden' }}>
        <CustomBreadcrumbs
          links={[{ name: 'Home', href: '/' }, { name: Data?.title }]}
          sx={{ my: 5 }}
        />
        <Grid container spacing={3} justifyContent={{ md: 'center' }}>
          <Grid xs={12} md={8}>
            <Divider sx={{ mb: 6 }} />

            <RichText content={Data?.body} />

            {/* <PostTags tags={Data?.tags} /> */}
          </Grid>
        </Grid>
      </Container>
      <Divider />
    </>
  );
}
