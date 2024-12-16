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
import { sanityFetch } from 'src/lib/client';
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
  CV:any
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
          const candidateData = await sanityFetch({
            query: getPersonalSpaceQuery,
            params: { clerkId: userId },
          });
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

    <Box sx={{ p: 3, backgroundColor: '#4f4f4f', borderRadius: 2 ,marginBottom:"12px"}}>
      <Typography variant="h5" sx={{ mb: 3 }}>
        Créer/Compléter mon profil
      </Typography>
      <Typography variant="body1" sx={{ mb: 3 }}>
        Afin de pouvoir postuler aux offres qui vous intéresse, veuillez complétez les champs ci-dessous. Par la suite vous pouvez, à tout moment, les modifier et soumettre de nouveau le formuaire. Votre data sera automatiquement actualisée sur la Base de donnée.
      </Typography>
    </Box>


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
        buttonText={candidate[0]?.CV?.asset?.url ? "Remplacer mon CV" : "Télécharger mon CV"}
        />
      
      <Toaster
        position="top-center"
        reverseOrder={false}
      />
      </Box>
    </>
    );
}
