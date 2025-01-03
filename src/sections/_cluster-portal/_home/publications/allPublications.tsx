import React from 'react';

import Box from '@mui/material/Box';
import Pagination, { paginationClasses } from '@mui/material/Pagination';

import { IBlogPostProps } from 'src/types/blog';

import PublicationItem from './publication-item';

// ----------------------------------------------------------------------

type Props = {
  posts: IBlogPostProps[];
};

export default function AllPublications({ posts }: Props) {
  return (
    <>
      <Box
        sx={{
          columnGap: 4,
          display: 'grid',
          rowGap: { xs: 4, md: 5 },
          gridTemplateColumns: {
            xs: 'repeat(1, 1fr)',
            sm: 'repeat(2, 1fr)',
            md: 'repeat(3, 1fr)',
          },
        }}
      >
        {posts.slice(0, 8).map((post) => (
          <PublicationItem key={post.id} Publication={post} />
        ))}
      </Box>

      <Pagination
        count={10}
        color="primary"
        sx={{
          py: { xs: 8, md: 10 },
          [`& .${paginationClasses.ul}`]: {
            justifyContent: 'center',
          },
        }}
      />
    </>
  );
}
