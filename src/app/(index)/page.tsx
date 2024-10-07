import { sanityFetch } from 'src/lib/client';
import { EVENTS_QUERY, ACCUEIL_QUERY, PUBLICATION_QUERY } from 'src/lib/queries';

// ----------------------------------------------------------------------

import HomeView from 'src/sections/_cluster-portal/_home/view/homeView';

export const metadata = {
  title: 'Career: Home',
};

export default async function ClusterLandingPage() {
  const EventsData = await sanityFetch({ query: EVENTS_QUERY });
  const AccueilData = await sanityFetch({ query: ACCUEIL_QUERY });
  const PublicationData = await sanityFetch({ query: PUBLICATION_QUERY });
  return (
    <HomeView
      Events={EventsData.slice(0, 6)}
      Accueil={AccueilData}
      Publications={PublicationData.slice(0, 4)}
    />
  );
}
