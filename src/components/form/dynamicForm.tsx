import React from "react";
import { useForm, FormProvider, SubmitHandler, FieldValues, Path } from "react-hook-form";
import FieldRenderer from "./FieldRenderer";
import { fieldTypeMap } from "./fieldTypeMap";
import { Button, Grid } from "@mui/material";
import { Box } from "@mui/system";
import ValuesPreview from "src/sections/examples/form-validation-view/values-preview";
import { z, ZodSchema } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

// Updated Field interface to use generics
interface Field<TFieldValues extends FieldValues> {
  fieldType: keyof typeof fieldTypeMap;  // Ensure fieldType corresponds to a valid key in fieldTypeMap
  name: Path<TFieldValues>;  // 'name' must be a valid path within TFieldValues
  rules?: any;
  [key: string]: any;
}


interface DynamicFormProps<TFieldValues extends FieldValues> {
  fields: Field<TFieldValues>[];  // Ensure fields is an array of valid Field objects
  onSubmit: SubmitHandler<TFieldValues>;  // Form submission handler
  schema: ZodSchema<TFieldValues>;
  defaultValues: any
}

const DynamicForm = <TFieldValues extends FieldValues>({
  fields,
  schema,
  onSubmit,
  defaultValues
}: DynamicFormProps<TFieldValues>) => {
  const methods = useForm<TFieldValues>({
    resolver: zodResolver(schema), 
    defaultValues,
  });
const { errors } = methods.formState;  // Access errors from React Hook Form's state
console.log(errors);  // Log the errors to check if they contain Zod's validation messages

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <Grid container spacing={3}>
          {fields.map((field, index) => (
            <FieldRenderer key={index} {...field} control={methods.control} />
          ))}
        </Grid>
        <Box mt={4}>
          <Button type="submit" variant="contained" >
            Soumettre
          </Button>
      </Box>
      </form>
      <ValuesPreview />
    </FormProvider>
  );
};

export default DynamicForm;
