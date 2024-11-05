import Box from '@mui/material/Box';
// import Pagination, { paginationClasses } from '@mui/material/Pagination';

import { paths } from 'src/routes/paths';

import EventItem from './event-item';

// ----------------------------------------------------------------------

type Props = {
  Events: any;
};

export default function FeaturedEvent({ Events }: Props) {
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
      {Events.slice(0, 6).map((Event: any) => (
        // TODO paths
        <EventItem key={Event._id} Event={Event} Links={paths.clusterPortal.allEvents} />
      ))}
    </Box>
  );
}
