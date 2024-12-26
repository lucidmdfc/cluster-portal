// RHFDropzone.tsx

import React from 'react';
import { DropzoneArea } from 'react-mui-dropzone';
import { Controller, useFormContext } from 'react-hook-form';

import FormHelperText from '@mui/material/FormHelperText';

// Define the component props
type RHFDropzoneProps = {
  name: string;
  helperText?: string;
  maxFiles?: number; // Optional: Set a limit on the number of files
};

const RHFDropzone: React.FC<RHFDropzoneProps> = ({ name, helperText, maxFiles }) => {
  const { control } = useFormContext();
  const acceptedImageTypes = ['image/jpeg', 'image/png', 'image/gif'];
  const acceptedDocumentTypes = [
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  ];

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={[]}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <>
          <DropzoneArea
            acceptedFiles={[...acceptedImageTypes, ...acceptedDocumentTypes]} // Use the mime types based on accepted types
            dropzoneText="Drag and drop files here or click"
            onChange={(files) => {
              console.log(files)
              onChange(files); // Call the onChange function to update form state
            }}
            filesLimit={maxFiles} // Limit the number of files
            // showPreviews
            showFileNamesInPreview
            initialFiles={value} // Show previously uploaded files if any
          />
          {(!!error || helperText) && (
            <FormHelperText error={!!error}>{error ? error.message : helperText}</FormHelperText>
          )}
        </>
      )}
    />
  );
};

export default RHFDropzone;
