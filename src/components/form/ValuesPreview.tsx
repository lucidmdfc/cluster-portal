import React from 'react';
import { useFormContext } from 'react-hook-form';
import { Box, Typography, Paper } from '@mui/material';

const ValuesPreview: React.FC = () => {
  // Get the form context from react-hook-form
  const { watch } = useFormContext(); 

  // Watch the form values to get current data
  const formData = watch(); 

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h6" gutterBottom>
        Form Values Preview
      </Typography>
      <Paper sx={{ p: 2 }}>
        <Typography variant="body1">
          <strong>Current Form Data:</strong>
        </Typography>
        <pre>{JSON.stringify(formData, null, 2)}</pre>
      </Paper>
    </Box>
  );
};

export default ValuesPreview;
