import { sanityFetch } from 'src/lib/client';
import { BLOG_QUERY } from 'src/lib/queries';
import BlogDetailView from 'src/sections/_cluster-portal/_blog/view/blog-detail-view';

// ----------------------------------------------------------------------

// Function to fetch and process blog data
async function fetchBlogData(slug: string) {
  const blogData = await sanityFetch({ 
    query: BLOG_QUERY,
    revalidate: 3600,
    tags: [`blog-${slug}`],
  });


  const SingleBlogData = blogData.find(
    (blog: any) => blog.slug?.current === decodeURIComponent(slug)
  );

  const recentBlogs = blogData.filter((blog: any) => blog.category === SingleBlogData?.category);

  return { SingleBlogData, recentBlogs };
}

// Function to generate metadata
export async function generateMetadata({ params }: { params: { slug: string } }) {
  const { SingleBlogData } = await fetchBlogData(params.slug);
  if (!SingleBlogData) {
    return {
      title: 'Blog Non Trouvé',
      description: 'Le blog demandé n\'a pas pu être trouvé.',
    };
  }

  return {
      title: SingleBlogData.title || 'Publication du Blog',
      description: SingleBlogData.description || 'Explorez cette publication de blog intéressante.',
  };
}

// Main page component
export default async function ChroniqueInjusticePage({ params }: { params: { slug: string } }) {
  const { SingleBlogData, recentBlogs } = await fetchBlogData(params.slug);

  return <BlogDetailView blog={SingleBlogData} recentBlogs={recentBlogs.slice(0, 4)} />;
}
