'use client';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';

import { _products } from 'src/_mock';

import HomePngBackground from '../../common/home-png-background';
// ----------------------------------------------------------------------

export default function PresentationOfActivity() {
  return (
    <Container
      sx={{
        pt: { xs: 5, sm: 10, md: 15 },
      }}
    >
      <Grid container spacing={3}>
        <Grid xs={12} lg={12}>
          <Box
            gap={3}
            display="grid"
            gridTemplateColumns={{ xs: 'repeat(1, 1fr)', md: 'repeat(3, 1fr)' }}
          >
            {_products.slice(0, 3).map((product, index) => (
              <HomePngBackground
                key={product.id}
                product={product}
                color={index === 0 ? 'primary' : 'secondary'}
              />
            ))}
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}
