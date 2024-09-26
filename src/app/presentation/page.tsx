// app/roj/page.tsx
import { sanityFetch } from 'src/lib/client';
import { PRESENTATION_QUERY } from 'src/lib/queries';

import RojView from 'src/sections/_cluster-portal/_presentation/view/roj-view';

export default async function RojLandingPage() {
  const rojData = await sanityFetch({ query: PRESENTATION_QUERY });
  return rojData && <RojView roj={rojData} />;
}
