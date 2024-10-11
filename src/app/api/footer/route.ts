import { sanityFetch } from 'src/lib/client';
import { FOOTER_QUERY } from 'src/lib/queries';

export async function GET() {
  const footerContent = await sanityFetch({ query: FOOTER_QUERY });
  if (!footerContent) {
    return new Response('Failed to load footer content', {
      status: 500,
      statusText: 'Internal Server Error',
    });
  }
  return Response.json(footerContent);
}
