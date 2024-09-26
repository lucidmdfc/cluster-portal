import { sanityFetch } from 'src/lib/client';
import { BLOG_QUERY } from 'src/lib/queries';

import BlogView from 'src/sections/_cluster-portal/_blog/view/blog-view';

// ----------------------------------------------------------------------

export default async function ChroniqueInjusticePage() {
  const blogData = await sanityFetch({ query: BLOG_QUERY });
  const blogOfficialData = blogData.filter((blog: any) => blog.category === 'official');
  const blogCommunityData = blogData.filter((blog: any) => blog.category === 'community');
  return blogData && <BlogView blogOfficial={blogOfficialData} blogCommunity={blogCommunityData} />;
}
