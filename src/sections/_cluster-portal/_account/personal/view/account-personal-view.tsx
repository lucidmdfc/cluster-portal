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
import { bgGradient } from 'src/theme/css';

import { useBoolean } from 'src/hooks/use-boolean';

import { countries } from 'src/assets/data';

import Iconify from 'src/components/iconify';
import FormProvider, { RHFSelect, RHFTextField, RHFAutocomplete } from 'src/components/hook-form';
// import { DynamicForm } from 'src/components/form/dynamicForm';
import { handleFormSubmission } from 'src/app/actions/formAction';
import toast, { Toaster } from 'react-hot-toast';
import { sanityFetch } from 'src/lib/client';
import { getPersonalSpaceQuery } from 'src/lib/queries';
import { useAuth } from "@clerk/nextjs";
import { useEffect, useState } from 'react';

import { alpha } from '@mui/system';
import DynamicForm from 'src/components/form/dynamicForm';
import { useDialog } from 'src/hooks/use-dialog';
import { Button, Grid, SvgIcon, TextField } from '@mui/material';
import Upload01 from '@untitled-ui/icons-react/build/esm/Upload01';
import { FileUploader } from 'src/components/form/file-uploader';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import { z } from 'zod';
// ----------------------------------------------------------------------

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
export default function AccountPersonalView() {
  const { userId } = useAuth();
  const [candidate, setCandidate] = useState<Candidate[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (userId) {
      // Fetch candidate data based on userId
      const fetchCandidateData = async () => {
        try {
          const candidateData = await sanityFetch({
            query: getPersonalSpaceQuery,
            params: { clerkId: userId },
          });
          setCandidate(candidateData); // Update state inside the transition
          setLoading(false)
        } catch (error) {
          console.error('Error fetching candidate:', error);
        }
      };

      fetchCandidateData(); // Call the fetch function
    }
  }, [userId]); // Re-run the effect when userId changes
  type FieldOptions = { label: string; value: string };

  type FieldType = "text" | "select" | "fileUpload";

  type Field<T> = {
    fieldType: FieldType;
    name: keyof T;
    label: string;
    required: boolean;
    type: string;
    options?: FieldOptions[];
  };

  const fields: Array<Field<{
    address: string;
    email: string;
    firstName: string;
    lastName: string;
    phone: string;
    city: string;
    birthday: string;
    gender: string;
    files: File[];
  }>> = [
    {
      fieldType: "text",
      name: 'firstName',
      label: 'First Name',
      required: true, 
      type: 'text', 
    },
    {
      fieldType: "text",
      name: 'lastName', 
      label: 'Last Name',
      required: true, 
      type: 'text',
    },
    {
      fieldType: "text",
      name: 'phone',
      label: 'Phone Number',
      required: true,
      type: 'tel',
    },
    {
      fieldType: "text",
      name: 'email',
      label: 'Email Address',
      required: true,
      type: 'email',
    },
    {
      fieldType: "text",
      name: 'city',
      label: 'City',
      required: true,
      type: 'text',
    },
    {
      fieldType: "text",
      name: 'address',
      label: 'Street Address',
      required: true,
      type: 'text',
    },
    {
      fieldType: "text",
      name: 'birthday',
      label: 'Birthday',
      required: true,
      type: 'date',
    },
    {
      fieldType: "select",
      name: "gender",
      label: "Gender",
      required: true,
      type: "text",
      options: [
        { value: "male", label: "Male" },
        { value: "female", label: "Female" },
      ],
    },
    {
      fieldType: "fileUpload",
      name: 'files',
      label: 'Upload Your File', 
      required: true, 
      type: 'file', 
    }
  ];
  const defaultValues = {
    firstName: candidate[0]?.firstName || '',
    lastName: candidate[0]?.lastName || '',
    phone: candidate[0]?.phone || "",
    email: candidate[0]?.email || "",
    city:candidate[0]?.city || "",
    address:candidate[0]?.address || "",
    birthday:candidate[0]?.birthday || "",
    gender:candidate[0]?.gender || "",
  };
    const personalSpaceSchema = z.object({
      firstName: z.string().min(1, { message: "First Name is required"}),
      lastName: z.string().min(1, "Last Name is required"),
      email: z.string().email().min(1, "email is required"),
      phone: z.string().min(1, "phone is required"),
      birthday: z.string().min(1, "birthday is required"),
      gender: z.string().min(1, "gender is required"),
      address: z.string().min(1, "street Address is required"),
      city: z.string().min(1, "city is required"),
      files: z
        .array(z.instanceof(File))
        .min(1, "At least one file is required")
        .max(1, "Only one file is allowed"),
    });
  
  // Handle form submission
  const handleSubmit = async (formDataObject: { [key: string]: any }) => {
    console.log(formDataObject)
    // console.log(formDataObject.fileUploadField)
    try {
      // Convert the plain object to FormData
      const formData = new FormData();
      Object.entries(formDataObject).forEach(([key, value]) => {
        // If the value is an array, append each element individually
        if (Array.isArray(value)) {
          value.forEach((item) => formData.append(`${key}[]`, item));
        } 
        // If the value is an object (e.g., File or Blob), append it directly
        else if (value instanceof File || value instanceof Blob) {
          formData.append(key, value);
        } 
        // For other data types, append as string
        else {
          formData.append(key, value.toString());
        }
      });
      setIsSubmitting(true);
      // Send the formData to your backend API
      await handleFormSubmission(formData, "candidate");
      // console.log(formData); // Logs the FormData object

      setIsSubmitting(false);
      // Display a success message
      toast.success('Votre formulaire a été envoyé avec succès');
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error("Échec de l'envoi du formulaire, veuillez réessayer");
    }
  };


  const steps = [
  'Select master blaster campaign settings',
  'Create an ad group',
  'Create an ad',
];
  return (
    <>
    <Box sx={(theme) => ({
      ...bgGradient({
          color: alpha(theme.palette.grey[900], 0.8),
          imgUrl: '/assets/background/overlay_2.jpg',
      }),
      p: 3,
      borderRadius: 2,
      marginBottom: "12px",
    })}>
      <Typography variant="h5" sx={{ mb: 3 }}>
        Créer/Compléter mon profil
      </Typography>
      <Stepper activeStep={1} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
    </Box>
      <Box
        rowGap={2.5}
        columnGap={2}
        display="grid"
        // gridTemplateColumns={{ xs: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)' }}
      >
      {loading ? (
        <h1>loading...</h1>
        ) : 
          <DynamicForm
            fields={fields}
            onSubmit={handleSubmit}
            schema={personalSpaceSchema}
            defaultValues={defaultValues}
            isSubmitting={isSubmitting}
          />
      }
      <Toaster
        position="top-center"
        reverseOrder={false}
      />
      </Box>
    </>
    );
}