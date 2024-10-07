'use client';

import React from 'react';

import { Container } from '@mui/material';

import HomePostsDetail from '../../common/home-posts-detail';

// import ElearningLatestPosts from '../../blog/elearning/elearning-latest-posts';

// ----------------------------------------------------------------------
type Props = {
  Presentation?: any;
};
export default function PresentationDetailView({ Presentation }: Props) {
  return (
    <Container sx={{ pt: 10 }}>
      <HomePostsDetail Data={Presentation} />
    </Container>
  );
}
