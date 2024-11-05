// app/roj/page.tsx
import { sanityFetch } from 'src/lib/client';
import { PRESENTATION_QUERY } from 'src/lib/queries';

import ClusterView from 'src/sections/_cluster-portal/_presentation/view/cluster-view';

export default async function IdeeLandingPage() {
  const ClusterData = await sanityFetch({ query: PRESENTATION_QUERY });
  return ClusterData && <ClusterView ClusterData={ClusterData} />;
}
