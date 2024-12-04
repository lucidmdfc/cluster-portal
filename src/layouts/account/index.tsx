import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { useBoolean } from 'src/hooks/use-boolean';
import { useResponsive } from 'src/hooks/use-responsive';

import Iconify from 'src/components/iconify';

import Nav from './nav';
import {
  ClerkProvider,
} from "@clerk/nextjs";
// ----------------------------------------------------------------------

type Props = {
  children: React.ReactNode;
};



export default function AccountLayout({ children }: Props) {
  const mdUp = useResponsive('up', 'md');

  const menuOpen = useBoolean();

  return (
    <>
      <ClerkProvider>

      {mdUp ? (
        <Container sx={{ my: 5 }}>
          <Typography variant="h3">Account</Typography>
        </Container>
      ) : (
        <Box
          sx={{
            py: 2,
            mb: 5,
            borderBottom: (theme) => `solid 1px ${theme.palette.divider}`,
          }}
        >
          <Container>
            <Button
              size="small"
              color="inherit"
              startIcon={<Iconify icon="carbon:menu" />}
              onClick={menuOpen.onTrue}
            >
              Account
            </Button>
          </Container>
        </Box>
      )}

      <Container>
        <Stack
          direction={{
            md: 'row',
          }}
          alignItems={{
            md: 'flex-start',
          }}
          sx={{
            mb: {
              xs: 8,
              md: 10,
            },
          }}
        >
          <Nav open={menuOpen.value} onClose={menuOpen.onFalse} />

          <Box
            sx={{
              flexGrow: 1,
              pl: { md: 8 },
              width: { md: `calc(100% - ${280}px)` },
            }}
          >
            {children}
          </Box>
        </Stack>
        </Container>
      </ClerkProvider>

    </>
  );
}
