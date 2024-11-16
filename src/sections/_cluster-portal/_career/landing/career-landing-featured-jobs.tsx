import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Unstable_Grid2';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';

import Iconify from 'src/components/iconify';
import { SubmitForm } from 'src/components/form/form';

import { IJobProps } from 'src/types/job';

import CareerJobItem from '../list/career-job-item';

// ----------------------------------------------------------------------

type Props = {
  jobs: IJobProps[];
};

export default function CareerLandingFeaturedJobs({ jobs }: Props) {
  return (
    <Container
      sx={{
        pt: { xs: 5, md: 10 },
        pb: { xs: 10, md: 15 },
      }}
    >
      <Grid
        container
        spacing={{ xs: 2, md: 4 }}
        sx={{
          textAlign: { xs: 'center', md: 'unset' },
        }}
      >
        <Grid xs={12} md={4}>
          <Typography variant="overline" sx={{ color: 'text.disabled' }}>
            Toutes nos offres
          </Typography>
        </Grid>

        <Grid xs={12} md={8}>
          <Typography variant="h3">
            Que vous soyez cadre ou ingénieur, vous trouverez ici toutes les dernières offres
            postées par les entreprises partenaires du Cluster!
          </Typography>
        </Grid>
      </Grid>

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
          <CareerJobItem key={job.id} job={job} />
        ))}
      </Box>

      <Stack alignItems="center">
        <Button
          component={RouterLink}
          href={paths.clusterPortal.allJobs}
          color="inherit"
          size="large"
          variant="outlined"
          endIcon={<Iconify icon="carbon:chevron-right" />}
        >
          Voir tout
        </Button>
      </Stack>
      <Grid
        container
        spacing={{ xs: 2, md: 4 }}
        sx={{
          textAlign: { xs: 'center', md: 'unset' },
          mt: 5,
        }}
      >
        <Grid xs={12} md={4}>
          <Typography variant="overline" sx={{ color: 'text.disabled' }}>
            Créer votre compte
          </Typography>
        </Grid>

        <Grid xs={12} md={8}>
          <Typography variant="h4">
            Les données de ce formulaire constituent votre compte personnel. Pour les modifier, il
            suffit de le remplir à nouveau. Vos anciennes données seront automatiquement remplacées.
          </Typography>
        </Grid>
      </Grid>
      <Stack
        id="upload-cv"
        alignItems="center"
        direction="row"
        justifyContent="center"
        spacing={2}
        sx={{ mt: 3 }}
      >
        <SubmitForm />
      </Stack>
    </Container>
  );
}
