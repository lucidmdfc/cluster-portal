import StudioLandingView from 'src/sections/_cluster-portal/_studio/view/studio-landing-view';
import ComingSoonView from 'src/sections/status/view/coming-soon-view';
import { sanityFetch } from 'src/lib/client';
import { STUDIO_QUERY } from 'src/lib/queries';

// ----------------------------------------------------------------------

export default async function CommuniquePage() {
  const StudioData = await sanityFetch({ query: STUDIO_QUERY });
  
  return <StudioLandingView StudioData={StudioData} />;
}
