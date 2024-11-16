'use client';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';

import PublicationItem from './publication-item';

// ----------------------------------------------------------------------

type Props = {
  Publications: any;
};

export default function FeaturedPublication({ Publications }: Props) {
  console.log('Publications', Publications[0].pdfUrl);
  return (
    <Container
      sx={{
        py: { xs: 5, md: 10 },
      }}
    >
      <Stack spacing={3} sx={{ textAlign: 'center' }}>
        <Typography variant="h3">Publications</Typography>

        <Typography sx={{ color: 'text.secondary' }}>
          {`Our Featured Tours can help you find the trip that's perfect for you!`}
        </Typography>
      </Stack>

      <Box
        sx={{
          display: 'grid',
          my: { xs: 8, md: 10 },
          gap: { xs: 4, md: 3 },
          gridTemplateColumns: {
            xs: 'repeat(1, 1fr)',
            sm: 'repeat(2, 1fr)',
            md: 'repeat(4, 1fr)',
          },
        }}
      >
        {Publications.map((Publication: any) => (
          <PublicationItem key={Publication._id} Publication={Publication} />
        ))}
      </Box>
      <Box sx={{ textAlign: 'center' }}>
        <Button
          component={RouterLink}
          href={paths.clusterPortal.AllPublications}
          size="large"
          variant="outlined"
          color="inherit"
        >
          Tout voir
        </Button>
      </Box>
    </Container>
  );
}
