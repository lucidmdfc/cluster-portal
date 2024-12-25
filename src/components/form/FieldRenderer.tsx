import { Controller, Control, FieldValues, FieldPath, Path, UseFormRegister } from 'react-hook-form';
import React from 'react';
import { fieldTypeMap } from './fieldTypeMap'; // Import the fieldTypeMap

interface FieldRendererProps<TFieldValues extends FieldValues> {
  fieldType: keyof typeof fieldTypeMap; // Ensures the fieldType corresponds to a key in fieldTypeMap
  control: Control<TFieldValues>;
  name: Path<TFieldValues>; // Enforces that 'name' is a valid path of TFieldValues
  rules?: any; // You can make this type more strict based on your form validation rules
  [key: string]: any; // Additional props to be passed to the FieldComponent

}

const FieldRenderer = <TFieldValues extends FieldValues>({
  fieldType,
  control,
  name,
  rules,
  label,
  type,
  ...props
}: FieldRendererProps<TFieldValues>) => {
  const FieldComponent = fieldTypeMap[fieldType];

  if (!FieldComponent) {
    throw new Error(`Unsupported field type: ${fieldType}`);
  }
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field, fieldState }) => {
        return (<>
          <FieldComponent
            options={[]}
            {...props}
            {...field}
            label={label}
            type={type}
            error={fieldState?.error?.message}
            helperText={fieldState?.error?.message}
            control={control}
          />
          </>
        );
      }}
    />
  );
};

export default FieldRenderer;
