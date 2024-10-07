import { sanityFetch } from 'src/lib/client';
import { EVENTS_QUERY } from 'src/lib/queries';

import AllEventsView from 'src/sections/_cluster-portal/_home/view/allEventsView';
// ----------------------------------------------------------------------

export const metadata = {
  title: 'Career: Home',
};

export default async function AllEventPage() {
  const EventsData = await sanityFetch({ query: EVENTS_QUERY });
  return <AllEventsView Events={EventsData} />;
}
