'use client';

import { useEffect } from 'react';

import Container from '@mui/material/Container';

import { paths } from 'src/routes/paths';

import { useBoolean } from 'src/hooks/use-boolean';

import { _jobs } from 'src/_mock';

import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';

import CareerJobList from '../list/career-job-list';
// import CareerNewsletter from '../career-newsletter';
// import CareerFilters from '../filters/career-filters';  you can add the filter later

// ----------------------------------------------------------------------

export default function CareerJobsView() {
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
        <CareerJobList jobs={_jobs} loading={loading.value} />
      </Container>

      {/* <CareerNewsletter /> */}
    </>
  );
}
