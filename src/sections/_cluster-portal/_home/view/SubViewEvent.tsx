'use client';

import React, { useState, useCallback } from 'react';

import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import Popover from '@mui/material/Popover';
import MenuItem from '@mui/material/MenuItem';
import Grid from '@mui/material/Unstable_Grid2';
import Container from '@mui/material/Container';
// import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';

// import { useResponsive } from 'src/hooks/use-responsive';

import clusterLogo from 'public/assets/logo/cluster-logo.png';

import { fDate } from 'src/utils/format-time';

import { _socials, _coursePosts } from 'src/_mock';

import Iconify from 'src/components/iconify';
import RichText from 'src/components/rich-text/rich-text';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';

import PostAuthor from '../../common/post-author';
import PostPrevAndNext from '../../common/post-prev-and-next';
import PostSocialsShare from '../../common/post-socials-share';
// import ElearningLatestPosts from '../../blog/elearning/elearning-latest-posts';

// ----------------------------------------------------------------------
type Props = {
  Event: any;
};
export default function EventBodyView({ Event }: Props) {
  // const theme = useTheme();

  // const mdUp = useResponsive('up', 'md');

  const [open, setOpen] = useState<HTMLElement | null>(null);

  const handleOpen = useCallback((event: React.MouseEvent<HTMLElement>) => {
    setOpen(event.currentTarget);
  }, []);

  const handleClose = useCallback(() => {
    setOpen(null);
  }, []);

  return (
    <>
      <Divider />

      <Container sx={{ overflow: 'hidden' }}>
        <CustomBreadcrumbs
          links={[
            { name: 'Home', href: '/' },
            { name: 'All Events', href: '/allEvents' },
            { name: Event?.title },
          ]}
          sx={{ my: 5 }}
        />

        <Grid container spacing={3} justifyContent={{ md: 'center' }}>
          <Grid xs={12} md={8}>
            <Stack
              spacing={3}
              sx={{
                pb: 6,
                textAlign: 'center',
                pt: { xs: 6, md: 10 },
              }}
            >
              {Event.timeToRead && (
                <Typography variant="body2" sx={{ color: 'text.disabled' }}>
                  {Event?.timeToRead} minutes to read
                </Typography>
              )}
              <Typography variant="h2" component="h1">
                {Event?.title}
              </Typography>

              <Typography variant="h5">{Event?.description}</Typography>
            </Stack>

            <Divider />

            <Stack direction="row" justifyContent="space-between" spacing={1.5} sx={{ py: 3 }}>
              <Avatar src={clusterLogo.src} sx={{ width: 48, height: 48 }} />

              <Stack spacing={0.5} flexGrow={1}>
                <Typography variant="subtitle2">{Event?.author?.name}</Typography>
                <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                  {fDate(Event.publicationDate, 'dd/MM/yyyy p')}
                </Typography>
              </Stack>

              <Stack direction="row" alignItems="center">
                <IconButton onClick={handleOpen} color={open ? 'primary' : 'default'}>
                  <Iconify icon="carbon:share" />
                </IconButton>
              </Stack>
            </Stack>

            <Divider sx={{ mb: 6 }} />

            <RichText content={Event?.body} />

            {/* <PostTags tags={Event?.tags} /> */}

            <PostSocialsShare />

            <Divider sx={{ mt: 8 }} />

            <PostAuthor author={Event?.author} self />

            <Divider />

            <PostPrevAndNext prevPost={_coursePosts[1]} nextPost={_coursePosts[2]} />
          </Grid>
        </Grid>
      </Container>

      <Divider />

      {/* <ElearningLatestPosts posts={_coursePosts.slice(0, 3)} /> */}

      <Popover
        open={!!open}
        onClose={handleClose}
        anchorEl={open}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        transformOrigin={{ vertical: 'top', horizontal: 'center' }}
        slotProps={{
          paper: {
            sx: { width: 220 },
          },
        }}
      >
        {_socials.map((social) => (
          <MenuItem key={social.value} onClick={handleClose}>
            <Iconify icon={social.icon} width={24} sx={{ mr: 1, color: social.color }} />
            Share via {social.label}
          </MenuItem>
        ))}
      </Popover>
    </>
  );
}
