import { sanityFetch } from 'src/lib/client';
import { ACCUEIL_QUERY } from 'src/lib/queries';
import PresentationDetailView from 'src/sections/_cluster-portal/_home/view/presentation-detail-view';

// ----------------------------------------------------------------------

// Function to fetch and process presentation data
async function fetchPresentationData(slug: string) {
  const SinglePresentation = await sanityFetch({
    query: ACCUEIL_QUERY,
    params: {slug: slug},
    revalidate: 3600,
    tags: [`presentation-${slug}`],
  });

  return { SinglePresentation };
}

// Metadata generation
export async function generateMetadata({ params }: { params: { slug: string } }) {
  const { SinglePresentation } = await fetchPresentationData(params.slug);

  if (!SinglePresentation) {
    return {
      title: 'Présentation Non Trouvée',
      description: 'La présentation demandée n\'a pas pu être trouvée.',
    };
  }

  return {
      title: SinglePresentation[0].title || 'Détails de la Présentation',
      description: `${SinglePresentation[0].title} - En savoir plus sur cette présentation et ses points clés.` || 'Explorez cette présentation.',
  };

}

// Main page component
export default async function PresentationDetailPage({ params }: { params: { slug: string } }) {
  const { SinglePresentation } = await fetchPresentationData(params.slug);


  return <PresentationDetailView Presentation={SinglePresentation[0]} />;
}
