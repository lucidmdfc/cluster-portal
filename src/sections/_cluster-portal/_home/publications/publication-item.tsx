'use client';

import Card from '@mui/material/Card';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';

import Image from 'src/components/image';
import Iconify from 'src/components/iconify';
import TextMaxLine from 'src/components/text-max-line';

import { ITourProps } from 'src/types/tour';

// ----------------------------------------------------------------------

type Props = {
  tour: ITourProps;
};

export default function PublicationItem({ tour }: Props) {
  const { slug, location, duration, coverUrl } = tour;

  return (
    <Card>
      <Image alt={slug} src={coverUrl} ratio="1/1" />

      <Stack spacing={0.5} sx={{ p: 2.5 }}>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          {location}
        </Typography>

        <Link component={RouterLink} href={paths.travel.tour} color="inherit">
          <TextMaxLine variant="h6" persistent>
            {slug}
          </TextMaxLine>
        </Link>
      </Stack>

      <Divider sx={{ borderStyle: 'dashed' }} />

      <Stack direction="row" alignItems="center" sx={{ p: 2.5 }}>
        <Stack
          flexGrow={1}
          direction="row"
          alignItems="center"
          sx={{ typography: 'body2', color: 'text.disabled' }}
        >
          <Iconify icon="carbon:time" width={16} sx={{ mr: 1 }} /> {duration}
        </Stack>

        <Stack spacing={0.5} direction="row" alignItems="center">
          <Iconify icon="hugeicons:folder-open" sx={{ color: 'warning.main' }} />
        </Stack>
      </Stack>
    </Card>
  );
}
