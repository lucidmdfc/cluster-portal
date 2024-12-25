import { sanityFetch } from 'src/lib/client';
import { JOB_QUERY } from 'src/lib/queries';
import CareerJobsView from 'src/sections/_cluster-portal/_career/view/career-jobs-view';


// ----------------------------------------------------------------------

export const metadata = {
  title: 'Career: Jobs',
};

export default async function CareerJobsPage() {
  const jobData = await sanityFetch({ query: JOB_QUERY });

  return <CareerJobsView jobs={jobData} />;
}
