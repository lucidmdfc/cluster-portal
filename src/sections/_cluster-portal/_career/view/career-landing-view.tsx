'use client';

import { _jobs } from 'src/_mock';

import CareerLandingStep from '../landing/career-landing-step';
// import CareerLatestPosts from '../../blog/career/career-latest-posts';

import CareerLandingFeaturedJobs from '../landing/career-landing-featured-jobs';

// ----------------------------------------------------------------------

type Props = {
  jobs: any;
};

export default function CareerLandingView({ jobs } : Props) {
  // console.log(jobs)
  return (
    <>
      <CareerLandingStep />

      {/* <CareerLandingFeaturedJobs jobs={_jobs.slice(-6)} /> */}
      <CareerLandingFeaturedJobs jobs={jobs} />
    </>
  );
}
