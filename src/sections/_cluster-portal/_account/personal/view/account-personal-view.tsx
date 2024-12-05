'use client';

import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, Controller } from 'react-hook-form';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import LoadingButton from '@mui/lab/LoadingButton';
import InputAdornment from '@mui/material/InputAdornment';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import { useBoolean } from 'src/hooks/use-boolean';

import { countries } from 'src/assets/data';

import Iconify from 'src/components/iconify';
import FormProvider, { RHFSelect, RHFTextField, RHFAutocomplete } from 'src/components/hook-form';
import { DynamicForm } from 'src/components/form/dynamicForm';
import { handleFormSubmission } from 'src/app/actions/formAction';
import toast, { Toaster } from 'react-hot-toast';
import { client, sanityFetch } from 'src/lib/client';
import { getPersonalSpaceQuery } from 'src/lib/queries';
import { useAuth } from "@clerk/nextjs";
import { useEffect, useState } from 'react';

// ----------------------------------------------------------------------

const GENDER_OPTIONS = ['Male', 'Female', 'Other'];

// Define the types for form data
interface Candidate {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  birthday: string;
  gender: string;
  address: string;
  city: string;
}
// ----------------------------------------------------------------------

export default async function AccountPersonalView() {

  const { userId } = useAuth();
  const [candidate, setCandidate] = useState<Candidate[]>([]);
  
  useEffect(() => {
    if (userId) {
      // Fetch candidate data based on userId
      const fetchCandidateData = async () => {
        try {
          const candidateData = await client.fetch(getPersonalSpaceQuery, { clerkId:userId });
          // console.log(candidateData); 
          setCandidate(candidateData);
        } catch (error) {
          console.error('Error fetching candidate:', error);
        }
      };

      fetchCandidateData(); // Call the fetch function
    }
  }, [userId]); // Re-run the effect when userId changes

  const fields = [
    {
      name: 'firstName', // Field name
      label: 'First Name', // Label displayed in the form
      required: true, // Indicates if the field is required
      type: 'text', // Input type
      defaultValue:candidate[0]?.firstName || ""
    },
    {
      name: 'lastName', 
      label: 'Last Name',
      required: true, 
      type: 'text',
      defaultValue:candidate[0]?.lastName || ""
    },
    {
      name: 'phone',
      label: 'Phone Number',
      required: true,
      type: 'tel',
      defaultValue:candidate[0]?.phone || ""
    },
    {
      name: 'email',
      label: 'Email Address',
      required: true,
      type: 'email',
      defaultValue:candidate[0]?.email || ""
      },
    {
      name: 'city',
      label: 'City',
      required: true,
      type: 'text',
      defaultValue:candidate[0]?.city || ""
    },
    {
      name: 'address',
      label: 'Street Address',
      required: true,
      type: 'text',
      defaultValue:candidate[0]?.address || ""
    },
    {
      name: 'birthday',
      label: 'Birthday',
      required: true,
      type: 'date',
      defaultValue:candidate[0]?.birthday || ""
    },
    {
      name: 'gender',
      label: 'Gender',
      required: true,
      type: 'text',
      defaultValue:candidate[0]?.gender || ""
    },
  ];

  

  // console.log(userId);
  // console.log(fields)


  const AccountPersonalSchema = Yup.object().shape({
    firstName: Yup.string().required('First name is required'),
    lastName: Yup.string().required('Last name is required'),
    email: Yup.string().required('Email address is required'),
    phone: Yup.string().required('Phone number is required'),
    birthday: Yup.date().required('Birthday is required'),
    gender: Yup.string().required('Gender is required'),
    address: Yup.string().required('Street address is required'),
    city: Yup.string().required('City is required'),
  });

  // Handle form submission
  const handleSubmit = async (formData: FormData) => {

    try {
      // send the formData to your backend API
      handleFormSubmission(formData, "candidate")

      // Display a success message
      toast.success('Votre formulaire a été envoyé avec succès');
    } catch (error) {
      // Handle errors during form submission
      console.error('Error submitting form:', error);
      toast.error("Échec de l'envoi du formulaire, veuillez réessayer");
    }
  };


  return (
    <>
      <Typography variant="h5" sx={{ mb: 3 }}>
        Personal
      </Typography>

      <Box
        rowGap={2.5}
        columnGap={2}
        display="grid"
        // gridTemplateColumns={{ xs: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)' }}
      >
        <DynamicForm
          fields={fields}
          validationSchema={AccountPersonalSchema}
          onSubmit={handleSubmit}
          isSubmitting={false}
          
        />
        
        {/* <RHFTextField name="firstName" label="First Name" />

        <RHFTextField name="lastName" label="Last Name" />

        <RHFTextField name="emailAddress" label="Email Address" />

        <RHFTextField name="phoneNumber" label="Phone Number" />

        <Controller
          name="birthday"
          render={({ field, fieldState: { error } }) => (
            <DatePicker
              label="Birthday"
              slotProps={{
                textField: {
                  helperText: error?.message,
                  error: !!error?.message,
                },
              }}
              {...field}
              value={field.value}
            />
          )}
        />

        <RHFSelect native name="gender" label="Gender">
          {GENDER_OPTIONS.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </RHFSelect>

        <RHFTextField name="streetAddress" label="Street Address" />

        <RHFTextField name="city" label="City" /> */}
      <Toaster
        position="top-center"
        reverseOrder={false}
      />
      </Box>
    </>
  );
}
