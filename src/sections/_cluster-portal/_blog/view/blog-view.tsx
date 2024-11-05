'use client';

import { Divider } from '@mui/material';

import BlogFeaturedPosts from 'src/sections/_cluster-portal/_blog/home-blog/blog-featured-posts ';

// import BlogPostsView from './blog-posts-view';

import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';

import { _tags } from 'src/_mock';

import BlogPosts from '../home-blog/blog-posts ';
import PostSidebar from '../../common/post-sidebar';
import PostSearchMobile from '../../common/post-search-mobile';

type Props = {
  blogOfficial: any;
  blogCommunity?: any;
};
export default function BlogView({ blogOfficial, blogCommunity }: Props) {
  return (
    <>
      {blogOfficial && <BlogFeaturedPosts blogs={blogOfficial} />}
      <Divider sx={{ mb: { xs: 6, md: 10 } }} />
      {blogCommunity && (
        <>
          <PostSearchMobile />
          <Container
            sx={{
              mt: { xs: 4, md: 10 },
            }}
          >
            <Stack
              direction="row"
              alignItems="center"
              justifyContent={{ xs: 'center', md: 'space-between' }}
              sx={{
                mb: { xs: 8, md: 10 },
              }}
            >
              <Typography variant="h3">Community blogs</Typography>
            </Stack>
            <Grid container spacing={{ md: 8 }}>
              <Grid xs={12} md={8}>
                <BlogPosts blogs={blogCommunity} />
              </Grid>

              <Grid xs={12} md={4}>
                <PostSidebar popularTags={_tags} recentPosts={blogCommunity.slice(0, 4)} />
              </Grid>
            </Grid>
          </Container>
        </>
      )}
    </>
  );
}
