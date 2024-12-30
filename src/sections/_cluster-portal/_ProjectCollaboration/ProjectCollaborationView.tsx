"use client";

import { Box, Container, Typography } from "@mui/material";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { handleFormSubmission } from "src/app/actions/formAction";
import DynamicForm from "src/components/form/dynamicForm";
import { z } from "zod";

export default function ProjectCollaborationView() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  type Field<T> = {
    fieldType: "text" | "dynamicListField" | "fileUpload" | "textAreaField";
    name: keyof T;
    label: string;
    required: boolean;
    type: string;
    options?: { value: string; label: string }[];
    CTA?: string;
  };

  const fields: Field<{
    entrepriseName: string;
    projectTitle: string;
    projectDescription: string;
    budgetEstimation: number;
    partenaires?: string;
    projectPresentation?: File;
  }>[] = [
      {
        fieldType: "text",
        name: "entrepriseName",
        label: "Nom de votre entreprise",
        required: true,
        type: "text",
      },
      {
        fieldType: "text",
        name: "projectTitle",
        label: "Titre du projet",
        required: true,
        type: "text",
      },
      {
        fieldType: "text",
        name: "budgetEstimation",
        label: "Budget estimatif",
        required: true,
        type: "number",
      },
      {
        fieldType: "dynamicListField",
        name: "partenaires",
        label: "Partenaires",
        required: true,
        type: "text",
      },
      {
        fieldType: "textAreaField",
        name: "projectDescription",
        label: "Descriptif du projet",
        required: true,
        type: "text",
      },
      {
        fieldType: "fileUpload",
        name: "projectPresentation",
        label: "Déposer votre projet",
        required: false,
        type: "file",
      },
  ]
  const projectCollaborationSchema = z.object({
    entrepriseName: z
      .string()
      .min(1, { message: "Nom de votre entreprise est obligatoire" }),
    partenaires: z
      .array(z.string())
      .optional(),
    projectTitle: z
      .string()
      .min(1, { message: "Titre du projet est obligatoire" }),
    projectDescription: z
      .string()
      .min(1, { message: "Descriptif du projet est obligatoire" }),
    budgetEstimation: z
      .preprocess(
        (value) => (typeof value === "string" ? parseFloat(value) : value),
        z.number().min(1, { message: "Budget estimatif doit être supérieur à 0" })
    ),
    projectPresentation: z
      .array(z.instanceof(File))
      .optional()
  });

const handleSubmit = async (formDataObject: { [key: string]: any }) => {
  console.log(formDataObject);
  
  try {
    // Convert the plain object to FormData
    const formData = new FormData();
    Object.entries(formDataObject).forEach(([key, value]) => {
      if (value === undefined || value === null) {
        console.warn(`Field ${key} has an undefined or null value`);
        return; // Skip undefined or null values
      }

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
    await handleFormSubmission(formData, "projectCollaboratifs");

    setIsSubmitting(false);

    // Display a success message
    toast.success('Votre formulaire a été envoyé avec succès');
  } catch (error) {
    console.error('Error submitting form:', error);
    toast.error("Échec de l'envoi du formulaire, veuillez réessayer");
  }
};

  
  return (
    <Container>
      <Box
        rowGap={2.5}
        columnGap={2}
        display="grid"
        // gridTemplateColumns={{ xs: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)' }}
      >
      <Typography variant="h5" sx={{ mb: 3 }}>
        Projets collaboratifs
      </Typography>
      <DynamicForm
        fields={fields}
        onSubmit={handleSubmit}
        schema={projectCollaborationSchema}
        defaultValues={undefined} isSubmitting={false} />
      </Box>
      <Toaster
        position="top-center"
        reverseOrder={false}
      />
    </Container>
  )
}