import { sanityFetch } from 'src/lib/client';
import { EVENTS_QUERY } from 'src/lib/queries';
import EventBodyView from 'src/sections/_cluster-portal/_home/view/SubViewEvent';

// ----------------------------------------------------------------------

// Function to fetch and process event data
async function fetchEventData(slug: string) {
  const SingleEventData = await sanityFetch({
    query: EVENTS_QUERY,
    params: {slug: slug},
    revalidate: 3600,
    tags: [`events-${slug}`],

  });
  // console.log(SingleEventData)

  return { SingleEventData };
}

// Metadata generation
export async function generateMetadata({ params }: { params: { slug: string } }) {
  const { SingleEventData } = await fetchEventData(params.slug);

  if (!SingleEventData) {
    return {
      title: 'Événement Non Trouvé',
      description: 'L\'événement demandé n\'a pas pu être trouvé.',
    };
  }

  return {
      title: SingleEventData[0].title || 'Détails de l\'Événement',
      description: SingleEventData[0].description || 'Explorez cet événement passionnant.',
  };
}

// Main page component
export default async function CareerLandingPage({ params }: { params: { slug: string } }) {
  const { SingleEventData } = await fetchEventData(params.slug);

  return <EventBodyView Event={SingleEventData[0]} />;
}
