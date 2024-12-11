import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box, { BoxProps } from '@mui/material/Box';
import { alpha, useTheme } from '@mui/material/styles';

import Image from 'src/components/image';

import { AdvertisementProps } from './types';
import PdfViewer from 'src/components/pdf-viewer/pdf-viewer';
import { useState } from 'react';
import Iconify from 'src/components/iconify';

// ----------------------------------------------------------------------

interface Props extends BoxProps {
  advertisement: AdvertisementProps;
}

export default function Advertisement({ advertisement, sx, ...other }: Props) {
  const theme = useTheme();
  const [isPdfOpen, setIsPdfOpen] = useState(false);

  const handleOpen = () => setIsPdfOpen(true);
  const handleClose = () => setIsPdfOpen(false);

  return (
    <Box sx={{ position: 'relative', borderRadius: 2, overflow: 'hidden', ...sx }} {...other}>
      <Stack
        alignItems="center"
        sx={{
          p: 5,
          width: 1,
          bottom: 0,
          zIndex: 9,
          textAlign: 'center',
          position: 'absolute',
        }}
      >
        <Typography variant="h4" sx={{ color: 'primary.main' }}>
          {advertisement.title}
        </Typography>

        <Typography variant="body2" sx={{ mt: 1, mb: 3, color: 'common.white' }}>
          {advertisement.description}
        </Typography>

        {/* <Button href={advertisement.path} variant="contained" color="primary">
          Go Now
        </Button> */}
        <Stack spacing={0.5} direction="row" alignItems="center">
          <Button onClick={handleOpen}>
            <Iconify icon="hugeicons:folder-open" sx={{ color: 'warning.main' }} />
          </Button>
        </Stack>
        <PdfViewer pdfUrl={advertisement?.path} open={isPdfOpen} onClose={handleClose} />

      </Stack>

      <Image
        alt="advertisement"
        src={advertisement.imageUrl}
        ratio="1/1"
        overlay={`linear-gradient(to bottom, ${alpha(theme.palette.common.black, 0)} 0%, ${
          theme.palette.common.black
        } 100%)`}
      />
    </Box>
  );
}
