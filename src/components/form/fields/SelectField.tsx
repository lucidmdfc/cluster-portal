import React from "react";
import {
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  FormHelperText,
  Grid,
} from "@mui/material";
import { useController, Control, FieldValues, Path } from "react-hook-form";

// Define the props interface for the SelectField component
interface SelectFieldProps<TFieldValues extends FieldValues> {
  name: Path<TFieldValues>;
  label: string;
  required?: boolean;
  options: { value: string | number; label: string }[]; // Define the shape of the options
  control: Control<TFieldValues>;
}

const SelectField = <TFieldValues extends FieldValues>({
  name,
  label,
  required = false,
  options,
  control,
}: SelectFieldProps<TFieldValues>) => {
  const {
    field,
    fieldState: { error },
  } = useController({
    name,
    control,
    rules: { required: required ? "This field is required" : undefined },
  });

  return (
    <Grid item xs={12} sm={6} key={name} sx={{ mb: 2 }}>
      <FormControl fullWidth variant="outlined" error={!!error}>
        <InputLabel>{label}</InputLabel>
        <Select {...field} label={label}>
          {options.map((option, index) => (
            <MenuItem key={index} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
        {error && <FormHelperText>{error.message}</FormHelperText>}
      </FormControl>
    </Grid>
  );
};

export default SelectField;
