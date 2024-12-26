import React from 'react';
import { Container, Grid, Typography, Stack, Box, Button } from '@mui/material';
import * as yup from 'yup';
import toast from 'react-hot-toast';

// Import the DynamicForm component
// import { DynamicForm } from 'src/components/form/dynamicForm';

// Import other necessary components and types
import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';
import Iconify from 'src/components/iconify';
import CareerJobItem from '../list/career-job-item';
import { handleFormSubmission } from 'src/app/actions/formAction';

// import { IJobProps } from 'src/types/job';
import { Job } from 'src/types/cluster_Types/sanity.types';

// Define the props type for the component
type Props = {
  jobs: Job[];
};
// type Props = {
//   jobs: IJobProps[];
// };

export default function CareerLandingFeaturedJobs({ jobs }: Props) {

  return (
    <Container
      sx={{
        pt: { xs: 5, md: 10 },
        pb: { xs: 10, md: 15 },
      }}
      id="jobs"
    >
      {/* Introduction section */}
      <Grid container spacing={{ xs: 2, md: 4 }} sx={{ textAlign: { xs: 'center', md: 'unset' } }}>
        <Grid xs={12} md={4}>
          <Typography variant="overline" sx={{ color: 'text.disabled' }}>
            All Job Offers
          </Typography>
        </Grid>
        <Grid xs={12} md={8}>
          <Typography variant="h3">
            Découvrez les dernières opportunités d'emploi, d'appels d'offres et de consultations chez nos partenaires. 
          </Typography>
        </Grid>
      </Grid>

      {/* List of jobs */}
      <Box
        sx={{
          columnGap: 4,
          display: 'grid',
          py: { xs: 8, md: 10 },
          rowGap: { xs: 4, md: 5 },
          gridTemplateColumns: {
            xs: 'repeat(1, 1fr)',
            sm: 'repeat(2, 1fr)',
            md: 'repeat(3, 1fr)',
          },
        }}
      >
        {jobs.map((job) => (
          <CareerJobItem key={job._id} job={job} />
        ))}
      </Box>

      {/* "View All" button */}
      <Stack alignItems="center">
        <Button
          component={RouterLink}
          href={paths.clusterPortal.allJobs}
          color="inherit"
          size="large"
          variant="outlined"
          endIcon={<Iconify icon="carbon:chevron-right" />}
        >
          View All
        </Button>
      </Stack>
    </Container>
  );
}



