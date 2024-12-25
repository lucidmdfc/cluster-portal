import React, { useEffect } from "react";
import { TextField as MuiTextField, Grid } from "@mui/material";
import { useController, Control, FieldValues, Path } from "react-hook-form";

interface TextFieldProps<TFieldValues extends FieldValues> {
  name: Path<TFieldValues>;
  label: string;
  required?: boolean;
  type?: string;
  control: Control<TFieldValues>;
  error?: string | undefined;
  helperText?: string | undefined;
}

const TextField = <TFieldValues extends FieldValues>({
  name,
  label,
  required = false,
  type = "text",
  control,
}: TextFieldProps<TFieldValues>) => {
  const {
    field,
    fieldState: { error },
  } = useController({
    name,
    control,
    // rules: { required: required ? "This field is required" : false },
  });
  // console.log(error)

  return (
    <Grid item xs={12} sm={6} key={name} sx={{ mb: 2 }}>
      <MuiTextField
        {...field}
        label={label}
        type={type}
        fullWidth
        error={!!error}
        helperText={error ? error.message : ""}
      />
    </Grid>
  );
};

export default TextField;
