import React, { FC, useState } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import toast from 'react-hot-toast';
import {
  Box,
  Button,
  Grid,
  TextField,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  SvgIcon,
} from '@mui/material';
import Upload01 from '@untitled-ui/icons-react/build/esm/Upload01';
import { FileIcon } from 'src/components/file-icon/file-icon';

import { FileUploader } from 'src/components/form/file-uploader';
import { useDialog } from 'src/hooks/use-dialog';

// Type definition for field configuration
type FieldConfig = {
  name: string; // Field name
  label: string; // Label for the field
  type?: string; // Input type, e.g., 'text', 'email'
  required?: boolean; // Whether the field is required
  initialValue?: string; // Initial value for the field
};

// Props for the form component
type DynamicFormProps = {
  fields: FieldConfig[]; // Field configurations
  validationSchema: yup.ObjectSchema<any>; // Yup validation schema
  onSubmit: (data: FormData) => void; // Submit handler
  isSubmitting: boolean; // Loading state
};

// Reusable form component
export const DynamicForm: FC<DynamicFormProps> = ({
  fields,
  validationSchema,
  onSubmit,
  isSubmitting,
}) => {
  const [files, setFiles] = useState<File[]>([]); // State to manage uploaded files
  const uploadDialog = useDialog();

  // Generate initialValues dynamically from fields
  const initialValues = fields.reduce(
    (acc, field) => ({ ...acc, [field.name]: field.initialValue || '' }),
    {}
  );

  // Initialize Formik with dynamic configurations
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      // Rename the files variable inside onSubmit to uploadedFiles
      const uploadedFiles = files; // Use the files state here

      // Convert form values and files into FormData
      const formData = new FormData();
      Object.entries(values).forEach(([key, value]) => formData.append(key, value));
      uploadedFiles.forEach((file) => formData.append('files', file)); // Use uploadedFiles here

      // Validate the number of files
      if (uploadedFiles.length !== 2) {
        toast.error('Veuillez sélectionner exactement 2 fichiers.');
        return;
      }

      onSubmit(formData); // Pass FormData to the parent handler
    },
  });
  console.log(formik)

  return (
    <Box>
      <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={3}>
          {/* Dynamically render form fields */}
          {fields.map((field) => (
            <Grid item xs={12} key={field.name}>
              <TextField
                fullWidth
                label={field.label}
                name={field.name}
                type={field.type || 'text'}
                required={field.required}
                value={formik.values[field.name]}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched[field.name] && Boolean(formik.errors[field.name])}
                helperText={formik.touched[field.name] && formik.errors[field.name]}
              />
            </Grid>
          ))}

          {/* File upload button */}
          <Grid item xs={12}>
            <Button
              sx={{
                  width: '100%',
                  py: 1.3,
                }}
                startIcon={
                  <SvgIcon>
                    <Upload01 />
                  </SvgIcon>
                }
                color="info"
              variant="outlined"
              onClick={uploadDialog.handleOpen}
              // onClick={() => document.getElementById('file-upload')?.click()}
            >
              Téléverser des fichiers
            </Button>
            {/* <input
              type="file"
              id="file-upload"
              multiple
              hidden
              onChange={(e) => setFiles([...Array.from(e.target.files || [])])}
            /> */}
            <FileUploader
              onClose={uploadDialog.handleClose}
              open={uploadDialog.open}
              onSelectFiles={(files) => {
                setFiles(files);
              }}
            />
          </Grid>

          {/* Display uploaded files */}
          <Grid item xs={12}>
            <List>
              {files.map((file, index) => (
                <ListItem key={index}>
                  <ListItemIcon>
                    <FileIcon extension={file.name.split('.').pop() || ''} />
                  </ListItemIcon>
                  <ListItemText primary={file.name} />
                </ListItem>
              ))}
            </List>
          </Grid>
        </Grid>

        {/* Submit button */}
        <Box mt={4}>
          <Button type="submit" variant="contained" disabled={isSubmitting}>
            {isSubmitting ? 'En cours...' : 'Soumettre'}
          </Button>
        </Box>
      </form>
    </Box>
  );
};


