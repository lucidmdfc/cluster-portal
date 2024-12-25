'use client';

import { useEffect } from 'react';

import Container from '@mui/material/Container';

import { paths } from 'src/routes/paths';

import { useBoolean } from 'src/hooks/use-boolean';

// import { _jobs } from 'src/_mock';

import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';

import CareerJobList from '../list/career-job-list';
import { Job } from 'src/types/cluster_Types/sanity.types';
// import CareerNewsletter from '../career-newsletter';
// import CareerFilters from '../filters/career-filters';  you can add the filter later

// ----------------------------------------------------------------------
type Props = {
  jobs: Job[];
};
export default function CareerJobsView({jobs}:Props) {
  const loading = useBoolean(true);

  useEffect(() => {
    const fakeLoading = async () => {
      await new Promise((resolve) => setTimeout(resolve, 500));
      loading.onFalse();
    };
    fakeLoading();
  }, [loading]);

  return (
    <>
      <Container>
        {/* <CareerFilters /> */}
        <CustomBreadcrumbs
          sx={{ my: 3 }}
          links={[
            { name: 'Home', href: '/' },
            { name: 'jobs', href: paths.clusterPortal.jobs },
            { name: 'all jobs' },
          ]}
        />
        <CareerJobList jobs={jobs} loading={loading.value} />
      </Container>

      {/* <CareerNewsletter /> */}
    </>
  );
}
