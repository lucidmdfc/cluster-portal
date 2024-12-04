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
import toast from 'react-hot-toast';

// ----------------------------------------------------------------------

const GENDER_OPTIONS = ['Male', 'Female', 'Other'];

// ----------------------------------------------------------------------

export default function AccountPersonalView() {

  const fields = [
    {
      name: 'firstName', // Field name
      label: 'First Name', // Label displayed in the form
      required: true, // Indicates if the field is required
      type: 'text', // Input type
    },
    {
      name: 'lastName', 
      label: 'Last Name',
      required: true, 
      type: 'text', 
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
    {
      name: 'city',
      label: 'City',
      required: true,
      type: 'text',
    },
    {
      name: 'address',
      label: 'Street Address',
      required: true,
      type: 'text',
    },
    {
      name: 'birthday',
      label: 'Birthday',
      required: true,
      type: 'date',
    },
    {
      name: 'gender',
      label: 'Gender',
      required: true,
      type: 'text',
    },
  ];

    const defaultValues = {
    firstName: 'Jayvion',
    lastName: 'Simon',
    email: 'nannie_abernathy70@yahoo.com',
    phone: '365-374-4961',
    birthday: null,
    gender: 'Male',
    address: '',
    city: '',
  };


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
      formData.forEach((value, key) => {
        console.log(key, value);
      });
      // Here, you can send the formData to your backend API
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
          isSubmitting={false} />
        
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

      </Box>
    </>
  );
}
