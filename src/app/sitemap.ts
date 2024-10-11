import { MetadataRoute } from 'next';

import { sanityFetch } from 'src/lib/client';
import { FOOTER_QUERY } from 'src/lib/queries';

const basePath = 'https://cluster-portal.vercel.app/';
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const footerContent = await sanityFetch({ query: FOOTER_QUERY });
  console.log('sitemap has been generated');
  return footerContent?.sitemapLinks.map((item: any) => ({
    url: `${basePath}/${item.label}`,
    lastModified: item.updatedAt,
    changeFrequency: item.changefreq,
    priority: item.priority,
  }));
}
