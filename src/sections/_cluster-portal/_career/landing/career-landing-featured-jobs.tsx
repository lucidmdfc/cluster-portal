import React from 'react';
import { Container, Grid, Typography, Stack, Box, Button } from '@mui/material';
import * as yup from 'yup';
import toast from 'react-hot-toast';

// Import the DynamicForm component
import { DynamicForm } from 'src/components/form/form';

// Import other necessary components and types
import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';
import Iconify from 'src/components/iconify';
import { IJobProps } from 'src/types/job';
import CareerJobItem from '../list/career-job-item';

// Define the props type for the component
type Props = {
  jobs: IJobProps[];
};

export default function CareerLandingFeaturedJobs({ jobs }: Props) {
  // Define form fields configuration
  const fields = [
    {
      name: 'fullName', // Field name
      label: 'Full Name', // Label displayed in the form
      required: true, // Indicates if the field is required
      type: 'text', // Input type
    },
    {
      name: 'phone',
      label: 'Phone Number',
      required: true,
      type: 'tel',
    },
    {
      name: 'email',
      label: 'Email Address',
      required: true,
      type: 'email',
    },
  ];

  // Define Yup validation schema
  const validationSchema = yup.object({
    fullName: yup.string().required('Full Name is required'),
    phone: yup.string().required('Phone Number is required'),
    email: yup.string().email('Invalid email address').required('Email Address is required'),
  });

  // Handle form submission
  const handleSubmit = async (formData: FormData) => {
    try {
      // Here, you can send the formData to your backend API
      console.log('Submitted FormData:', formData);

      // Display a success message
      toast.success('Form successfully submitted!');
    } catch (error) {
      // Handle errors during form submission
      console.error('Error submitting form:', error);
      toast.error('An error occurred. Please try again.');
    }
  };

  return (
    <Container
      sx={{
        pt: { xs: 5, md: 10 },
        pb: { xs: 10, md: 15 },
      }}
    >
      {/* Introduction section */}
      <Grid container spacing={{ xs: 2, md: 4 }} sx={{ textAlign: { xs: 'center', md: 'unset' } }}>
        <Grid xs={12} md={4}>
          <Typography variant="overline" sx={{ color: 'text.disabled' }}>
            All Job Offers
          </Typography>
        </Grid>
        <Grid xs={12} md={8}>
          <Typography variant="h3">
            Whether you're a manager or an engineer, you will find here the latest job offers from
            our partner companies!
          </Typography>
        </Grid>
      </Grid>

      {/* List of jobs */}
      <Box
        sx={{
          columnGap: 4,
          display: 'grid',
          py: { xs: 8, md: 10 },
          rowGap: { xs: 4, md: 5 },
          gridTemplateColumns: {
            xs: 'repeat(1, 1fr)',
            sm: 'repeat(2, 1fr)',
            md: 'repeat(3, 1fr)',
          },
        }}
      >
        {jobs.map((job) => (
          <CareerJobItem key={job.id} job={job} />
        ))}
      </Box>

      {/* "View All" button */}
      <Stack alignItems="center">
        <Button
          component={RouterLink}
          href={paths.clusterPortal.allJobs}
          color="inherit"
          size="large"
          variant="outlined"
          endIcon={<Iconify icon="carbon:chevron-right" />}
        >
          View All
        </Button>
      </Stack>

      {/* Account creation section */}
      <Grid container spacing={{ xs: 2, md: 4 }} sx={{ textAlign: { xs: 'center', md: 'unset' }, mt: 5 }}>
        <Grid xs={12} md={4}>
          <Typography variant="overline" sx={{ color: 'text.disabled' }}>
            Create Your Account
          </Typography>
        </Grid>
        <Grid xs={12} md={8}>
          <Typography variant="h4">
            The information provided in this form will create your personal account. To modify your
            details, simply refill the form. Your previous data will automatically be replaced.
          </Typography>
        </Grid>
      </Grid>

      {/* Form Section */}
      <Stack
        id="upload-cv"
        alignItems="center"
        direction="row"
        justifyContent="center"
        spacing={2}
        sx={{ mt: 3 }}
      >
        <DynamicForm
          fields={fields} // Pass form fields configuration
          validationSchema={validationSchema} // Pass validation schema
          onSubmit={handleSubmit} // Pass submit handler
          isSubmitting={false} // Set to `true` during API calls for a loading state
        />
      </Stack>
    </Container>
  );
}



