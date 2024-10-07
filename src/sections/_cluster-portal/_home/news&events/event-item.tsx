'use client';

import clusterLogo from 'public/assets/logo/cluster-logo.png';

import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';

import { RouterLink } from 'src/routes/components';

import { fDate } from 'src/utils/format-time';

import urlFor from 'src/lib/sanity';

import Image from 'src/components/image';
import TextMaxLine from 'src/components/text-max-line';

// ----------------------------------------------------------------------

type Props = {
  Event: any;
  Links?: any;
};

export default function EventItem({ Event, Links }: Props) {
  return (
    <Paper variant="outlined" sx={{ borderRadius: 2, overflow: 'hidden' }}>
      <Image
        src={Event?.image?.image ? urlFor(Event?.image?.image.asset)?.url() : ''}
        alt={Event.image?.alt}
        ratio="1/1"
      />

      <Stack direction="row" spacing={3} sx={{ p: 3 }}>
        <Stack sx={{ textAlign: 'center' }}>
          <Typography variant="subtitle2">{fDate(Event?.publicationDate, 'MMM')}</Typography>

          <Divider sx={{ mt: 1, mb: 0.5 }} />

          <Typography variant="h3">{fDate(Event?.publicationDate, 'dd')}</Typography>
        </Stack>

        <Stack spacing={1}>
          <Link
            component={RouterLink}
            href={`${Links}/${Event.slug?.current || ''}`}
            color="inherit"
          >
            <TextMaxLine variant="h6" persistent>
              {Event.title}
            </TextMaxLine>
          </Link>

          <TextMaxLine variant="body2" persistent color="text.secondary">
            {Event.description}
          </TextMaxLine>

          <Stack spacing={1.5} direction="row" alignItems="center" sx={{ pt: 1.5 }}>
            <Avatar src={clusterLogo.src} sx={{ width: 40, height: 40 }} />
            <Stack>
              <Typography variant="body2">{Event.author.name}</Typography>
              <Typography variant="caption" sx={{ color: 'text.disabled' }}>
                {Event.timeToRead} minutes to read
              </Typography>
            </Stack>
          </Stack>
        </Stack>
      </Stack>
    </Paper>
  );
}
