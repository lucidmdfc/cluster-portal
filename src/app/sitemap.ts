import { MetadataRoute } from 'next';

import { sanityFetch } from 'src/lib/client';
import { ACCUEIL_QUERY, EVENTS_QUERY, FOOTER_QUERY } from 'src/lib/queries';
import { JOB_QUERY } from 'src/lib/queries';
import { BLOG_QUERY } from 'src/lib/queries';

const basePath = 'https://www.mdfc.ma';
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const footerContent = await sanityFetch({ query: FOOTER_QUERY });

  const jobData = await sanityFetch({ query: JOB_QUERY, params: { jobId: "" } });
  const blogData = await sanityFetch({ query: BLOG_QUERY });
  const eventData = await sanityFetch({ query: EVENTS_QUERY, params: {slug: ""} });
  const presentationData = await sanityFetch({ query: ACCUEIL_QUERY, params: {slug: ""}, });
  console.log('sitemap has been generated');
  const blogLinks = blogData?.map((post: any) => (
    {
    url: `${basePath}/blog/${post.slug?.current}`,
    lastModified: post._updatedAt,
    changeFrequency: 'weekly',
    priority: 0.7,
  }));
  const jobLinks = jobData?.map((job: any) => ({
    url: `${basePath}/jobs/${job._id}`,
    lastModified: job._updatedAt,
    changeFrequency: 'weekly',
    priority: 0.9,
  }));
  const eventLinks =eventData?.map((event: any) => ({
    url: `${basePath}/allEvents/${event.slug?.current}`,
    lastModified: event._updatedAt,
    changeFrequency: 'weekly',
    priority: 0.6,
  }));
  const presentationLinks = presentationData?.map((presentation: any) => ({
    url: `${basePath}/presentation-detail/${presentation.slug?.current}`,
    lastModified: presentation._updatedAt,
    changeFrequency: 'weekly',
    priority: 0.6,
  }));

  const staticLinks = footerContent?.sitemapLinks.map((item: any) => ({
    url: `${basePath}${item.url}`,
    lastModified: item.updatedAt,
    changeFrequency: item.changefreq,
    priority: item.priority,
  }));
  return [...staticLinks, ...blogLinks, ...jobLinks, ...eventLinks, ...presentationLinks];
}
