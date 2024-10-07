import { sanityFetch } from 'src/lib/client';
import { ACCUEIL_QUERY } from 'src/lib/queries';

import PresentationDetailView from 'src/sections/_cluster-portal/_home/view/presentation-detail-view';
// ----------------------------------------------------------------------

export const metadata = {
  title: 'Career: Home',
};

export default async function PresentationDetailPage({ params }: { params: { slug: string } }) {
  const AccueilData = await sanityFetch({ query: ACCUEIL_QUERY });
  const SinglePresentation = AccueilData.find(
    (Presentation: any) => Presentation?.slug?.current === decodeURIComponent(params.slug)
  );
  return <PresentationDetailView Presentation={SinglePresentation} />;
}
