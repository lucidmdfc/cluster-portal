"use client"; 

import { sanityFetch } from 'src/lib/client';
import { JOB_QUERY } from 'src/lib/queries';

import CareerJobView from 'src/sections/_cluster-portal/_career/view/career-job-view';

import { useParams } from 'next/navigation';

// ----------------------------------------------------------------------

// export const metadata = {
//   title: 'Career: Job',
// };

export default async function CareerJobPage() {
  const { slug } = useParams();
  // console.log("params", slug);
  const jobData = await sanityFetch({ query: JOB_QUERY });
  const SingleJobData = jobData.find(
    (job: any) => job._id === slug
    );
  // console.log(SingleJobData);

  return <CareerJobView job={SingleJobData} />;
}
