import { sanityFetch } from 'src/lib/client';
import { EVENTS_QUERY } from 'src/lib/queries';

import EventBodyView from 'src/sections/_cluster-portal/_home/view/SubViewEvent';
// ----------------------------------------------------------------------

export const metadata = {
  title: 'Career: Home',
};

export default async function CareerLandingPage({ params }: { params: { slug: string } }) {
  const EventsData = await sanityFetch({ query: EVENTS_QUERY });
  const SingleEventsData = EventsData.find(
    (Event: any) => Event?.slug?.current === decodeURIComponent(params.slug)
  );

  return <EventBodyView Event={SingleEventsData} />;
}
