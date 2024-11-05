import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { User, getAuth, signOut, onAuthStateChanged } from 'firebase/auth';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import { useTheme } from '@mui/material/styles';

import { paths } from 'src/routes/paths';

import { useOffSetTop } from 'src/hooks/use-off-set-top';
import { useResponsive } from 'src/hooks/use-responsive';

import { bgBlur } from 'src/theme/css';
import { app } from 'src/lib/firebase/firebaseSdk';

import Logo from 'src/components/logo';

import NavMobile from './nav/mobile';
import NavDesktop from './nav/desktop';
import { HEADER } from '../config-layout';
import { navConfig } from './config-navigation';
import HeaderShadow from '../common/header-shadow';
import SettingsButton from '../common/settings-button';

// ----------------------------------------------------------------------

type Props = {
  headerOnDark: boolean;
};

export default function Header({ headerOnDark }: Props) {
  const theme = useTheme();
  const auth = getAuth(app);
  const [user, setUser] = useState<User | null>(null);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser); // Updates the user state based on auth status
    });
    return () => unsubscribe();
  }, [auth]);
  const offset = useOffSetTop();
  const router = useRouter();
  const mdUp = useResponsive('up', 'md');
  const handleSignOut = async () => {
    try {
      const responseFb = await signOut(getAuth(app));
      console.log('RESPONSEFB', responseFb);
      const response = await fetch('/api/logout');
      console.log('RESPONSE', response);
      router.push('/auth/sign-in/');
      console.log('User signed out');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };
  const renderContent = (
    <>
      <Box sx={{ lineHeight: 0, position: 'relative' }}>
        <Logo />
      </Box>

      <>
        <Stack
          flexGrow={1}
          alignItems="center"
          sx={{
            height: 1,
            display: { xs: 'none', md: 'flex' },
          }}
        >
          <NavDesktop data={navConfig} />
        </Stack>

        <Box sx={{ flexGrow: { xs: 1, md: 'unset' } }} />
      </>

      <Stack spacing={2} direction="row" alignItems="center" justifyContent="flex-end">
        <Stack spacing={1} direction="row" alignItems="center">
          {user ? (
            // Show "Logout" button if authenticated
            <Button
              fullWidth
              size="large"
              color="inherit"
              variant="outlined"
              onClick={handleSignOut}
            >
              Sign Out
            </Button>
          ) : (
            // Show "Login" button if not authenticated
            <Link href={paths.loginCover} passHref>
              <Button fullWidth size="large" color="inherit" variant="outlined">
                Login
              </Button>
            </Link>
          )}
          <SettingsButton />
        </Stack>

        <Button
          variant="contained"
          color="inherit"
          href={paths.clusterPortal.communique}
          sx={{
            display: { xs: 'none', md: 'inline-flex' },
          }}
        >
          Espace media
        </Button>
      </Stack>

      {!mdUp && <NavMobile data={navConfig} />}
    </>
  );

  return (
    <AppBar>
      <Toolbar
        disableGutters
        sx={{
          height: {
            xs: HEADER.H_MOBILE,
            md: HEADER.H_DESKTOP,
          },
          transition: theme.transitions.create(['height', 'background-color'], {
            easing: theme.transitions.easing.easeInOut,
            duration: theme.transitions.duration.shorter,
          }),
          ...(headerOnDark && {
            color: 'common.white',
          }),
          ...(offset && {
            ...bgBlur({ color: theme.palette.background.default }),
            color: 'text.primary',
            height: {
              md: HEADER.H_DESKTOP - 16,
            },
          }),
        }}
      >
        <Container
          sx={{
            height: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {renderContent}
        </Container>
      </Toolbar>

      {offset && <HeaderShadow />}
    </AppBar>
  );
}
