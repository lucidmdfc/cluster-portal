import Box from '@mui/material/Box';
// import Pagination, { paginationClasses } from '@mui/material/Pagination';

import { IBlogPostProps } from 'src/types/blog';

import EventItem from './event-item';

// ----------------------------------------------------------------------

type Props = {
  posts: IBlogPostProps[];
};

export default function FeaturedEvent({ posts }: Props) {
  return (
    <Box
      sx={{
        columnGap: 4,
        display: 'grid',
        rowGap: { xs: 4, md: 5 },
        gridTemplateColumns: {
          xs: 'repeat(1, 1fr)',
          sm: 'repeat(3, 1fr)',
        },
      }}
    >
      {posts.slice(0, 6).map((post) => (
        <EventItem key={post.id} post={post} />
      ))}
    </Box>
  );
}
