"use client";

import React, { FC, useState } from "react";
import { useFormik, FormikHelpers } from "formik";
import * as yup from "yup";
import { Grid } from "@mui/material";

// Type definition for field configuration
type FieldConfig = {
  name: string; // Field name
  label: string; // Label for the field
  type?: string; // Input type, e.g., 'text', 'email'
  required?: boolean; // Whether the field is required
  defaultValue?: string; // Initial value for the field
};

// Define the type for form values
type FormValues = Record<string, string>;

// Props for the form component
type DynamicFormProps = {
  fields: FieldConfig[]; // Field configurations
  validationSchema: yup.ObjectSchema<any>; // Yup validation schema
  onSubmit: (data: FormData) => void; // Submit handler
  isSubmitting: boolean; // Loading state
  renderField: (field: FieldConfig, formik: ReturnType<typeof useFormik<FormValues>>) => React.ReactNode; // Field renderer
  renderSubmitButton: (isSubmitting: boolean) => React.ReactNode; // Custom submit button renderer
  renderFileUploader?: (setFiles: (files: File[]) => void) => React.ReactNode; // Optional file uploader renderer
};

// Refactored form component
export const DynamicForm: FC<DynamicFormProps> = ({
  fields,
  validationSchema,
  onSubmit,
  isSubmitting,
  renderField,
  renderSubmitButton,
  renderFileUploader,
}) => {
  const [files, setFiles] = useState<File[]>([]); // State to manage uploaded files

  // Generate initialValues dynamically from fields
  const initialValues = fields.reduce(
    (acc, field) => ({ ...acc, [field.name]: field.defaultValue || "" }),
    {} as FormValues
  );

  // Initialize Formik with dynamic configurations
  const formik = useFormik<FormValues>({
    initialValues,
    enableReinitialize: true,
    validationSchema,
    onSubmit: (values: FormValues, { setSubmitting }: FormikHelpers<FormValues>) => {
      // Convert form values and files into FormData
      const formData = new FormData();
      Object.entries(values).forEach(([key, value]) => formData.append(key, value));
      files.forEach((file) => formData.append("files", file));
      onSubmit(formData); // Pass FormData to the parent handler
      setSubmitting(false);
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      {/* Render form fields */}
      <Grid container spacing={2}>
        {fields.map((field) => (
          <React.Fragment key={field.name}>
            {renderField(field, formik)}
          </React.Fragment>
        ))}
      </Grid>
      {renderFileUploader && renderFileUploader(setFiles)}
      {renderSubmitButton(isSubmitting)}
    </form>
  );
};
