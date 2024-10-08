'use client';

import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Theme, alpha, SxProps, useTheme } from '@mui/material/styles';

import { RouterLink } from 'src/routes/components';

import urlFor from 'src/lib/sanity';
import { ColorSchema } from 'src/theme/palette';

import Image from 'src/components/image';
import TextMaxLine from 'src/components/text-max-line';

// ----------------------------------------------------------------------

type Props = {
  Accueil: any;
  color?: ColorSchema;
  sx?: SxProps<Theme>;
  Links?: string;
};

export default function HomePngBackground({ Accueil, color = 'primary', sx, Links }: Props) {
  const theme = useTheme();

  return (
    <Link
      component={RouterLink}
      href={`${Links}/${Accueil?.slug?.current}` || ''}
      color="inherit"
      underline="none"
    >
      <Stack
        spacing={3}
        sx={{
          p: 3,
          borderRadius: 2,
          color: `${color}.darker`,
          bgcolor: `${color}.lighter`,
          transition: theme.transitions.create('background-color', {
            easing: theme.transitions.easing.easeIn,
            duration: theme.transitions.duration.shortest,
          }),
          '&:hover': {
            bgcolor: `${color}.light`,
          },
          ...sx,
        }}
      >
        <Image
          src={Accueil?.image?.image ? urlFor(Accueil?.image?.image.asset)?.url() : ''}
          sx={{
            filter: `drop-shadow(20px 20px 24px ${alpha(theme.palette.common.black, 0.16)})`,
          }}
        />

        <Stack spacing={1} sx={{ textAlign: 'center' }}>
          <TextMaxLine variant="subtitle2" sx={{ opacity: 0.72 }}>
            {Accueil?.title}
          </TextMaxLine>

          <Typography variant="h5">{Accueil?.subTitle}</Typography>
        </Stack>
      </Stack>
    </Link>
  );
}
