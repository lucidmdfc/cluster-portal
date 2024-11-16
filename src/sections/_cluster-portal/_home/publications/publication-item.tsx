'use client';

import { useState } from 'react';

import Card from '@mui/material/Card';
import Link from '@mui/material/Link';
import { Button } from '@mui/material';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';

import { fDate } from 'src/utils/format-time';

import urlFor from 'src/lib/sanity';

import Image from 'src/components/image';
import Iconify from 'src/components/iconify';
import TextMaxLine from 'src/components/text-max-line';
import PdfViewer from 'src/components/pdf-viewer/pdf-viewer';
// ----------------------------------------------------------------------

type Props = {
  Publication: any;
};

export default function PublicationItem({ Publication }: Props) {
  const [isPdfOpen, setIsPdfOpen] = useState(false);

  const handleOpen = () => setIsPdfOpen(true);
  const handleClose = () => setIsPdfOpen(false);
  return (
    <Card>
      <Image
        alt={Publication?.image.alt}
        src={Publication?.image?.image ? urlFor(Publication?.image?.image.asset)?.url() : ''}
        ratio="1/1"
      />

      <Stack spacing={0.5} sx={{ p: 2.5 }}>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          {Publication?.title}
        </Typography>

        <Link onClick={handleOpen} color="inherit">
          <TextMaxLine variant="h6" persistent>
            {Publication?.subTitle}
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
          <Iconify icon="carbon:time" width={16} sx={{ mr: 1 }} />{' '}
          {fDate(Publication?.publicationDate, 'MMM dd, yyyy')}
        </Stack>

        <Stack spacing={0.5} direction="row" alignItems="center">
          <Button onClick={handleOpen}>
            <Iconify icon="hugeicons:folder-open" sx={{ color: 'warning.main' }} />
          </Button>
        </Stack>
        <PdfViewer pdfUrl={Publication?.pdfUrl} open={isPdfOpen} onClose={handleClose} />
      </Stack>
    </Card>
  );
}
