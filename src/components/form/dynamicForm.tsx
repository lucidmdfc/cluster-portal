import React from "react";
import { useForm, FormProvider, SubmitHandler, FieldValues, Path } from "react-hook-form";
import FieldRenderer from "./FieldRenderer"; 
import { fieldTypeMap } from "./fieldTypeMap";
import { Button, Grid } from "@mui/material";
import { Box } from "@mui/system";
import ValuesPreview from "src/sections/examples/form-validation-view/values-preview";
import { ZodSchema } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

// Updated Field interface to use generics and support optional rules and extra fields
interface Field<TFieldValues extends FieldValues> {
  fieldType: keyof typeof fieldTypeMap; // fieldType maps to a key in the fieldTypeMap
  name: Path<TFieldValues>; // Ensures the name matches the keys in the form data
  label?: string; // Optional label for the field
  rules?: any; // Optional rules for validation (can be used with React Hook Form)
  options?: { label: string; value: string }[]; // For select fields, options can be passed
  [key: string]: any; // Additional properties can be passed as needed
}

interface DynamicFormProps<TFieldValues extends FieldValues> {
  fields: Field<TFieldValues>[]; // Array of fields, each of type Field<TFieldValues>
  onSubmit: SubmitHandler<TFieldValues>; // Form submission handler
  schema: ZodSchema<TFieldValues>; // Zod schema for validation
  defaultValues: any; // Default form values
  isSubmitting: boolean; // Whether the form is in the submitting state
}

const DynamicForm = <TFieldValues extends FieldValues>({
  fields,
  schema,
  onSubmit,
  defaultValues,
  isSubmitting,
}: DynamicFormProps<TFieldValues>) => {
  // Initialize react-hook-form with Zod validation schema
  const methods = useForm<TFieldValues>({
    resolver: zodResolver(schema),
    defaultValues,
  });

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <Grid container spacing={3}>
          {/* Render fields dynamically based on the `fields` array */}
          {fields.map((field, index) => (
            <FieldRenderer key={index} {...field} control={methods.control} />
          ))}
        </Grid>
        <Box mt={4}>
          {/* Submit button with a loading state */}
          <Button type="submit" variant="contained" disabled={isSubmitting}>
            {isSubmitting ? "Uploading..." : "Submit"}
          </Button>
        </Box>
      </form>
      {/* Optionally display the current values in a preview */}
      {/* <ValuesPreview /> */}
    </FormProvider>
  );
};

export default DynamicForm;
