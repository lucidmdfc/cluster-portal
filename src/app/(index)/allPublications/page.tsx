import { sanityFetch } from 'src/lib/client';
import { PUBLICATION_QUERY } from 'src/lib/queries';

import AllPublicationsView from 'src/sections/_cluster-portal/_home/view/allPublicationVIew';
// ----------------------------------------------------------------------

export const metadata = {
  title: 'Career: Home',
};

export default async function AllEventPage() {
  const PublicationData = await sanityFetch({ query: PUBLICATION_QUERY });
  return <AllPublicationsView Publications={PublicationData} />;
}
