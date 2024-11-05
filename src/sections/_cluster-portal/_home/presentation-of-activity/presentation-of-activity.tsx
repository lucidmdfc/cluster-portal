'use client';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';

import { paths } from 'src/routes/paths';

import HomePngBackground from '../../common/home-png-background';
// ----------------------------------------------------------------------
type Props = {
  Accueil: any;
};
export default function PresentationOfActivity({ Accueil }: Props) {
  return (
    <Container
      sx={{
        pt: { xs: 10, sm: 10, md: 15 },
      }}
    >
      <Grid container spacing={3}>
        <Grid xs={12} lg={12}>
          <Box
            gap={3}
            display="grid"
            gridTemplateColumns={{ xs: 'repeat(1, 1fr)', md: 'repeat(3, 1fr)' }}
          >
            {Accueil.slice(0, 3).map((product: any, index: Number) => (
              <HomePngBackground
                key={Accueil._id}
                Accueil={product}
                Links={paths.clusterPortal.PresentationDetail}
                color={index === 0 ? 'primary' : 'secondary'}
              />
            ))}
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}
