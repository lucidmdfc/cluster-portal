import * as yup from 'yup';
import { useFormik } from 'formik';
import toast from 'react-hot-toast';
import React, { FC, useRef, useState } from 'react';
import Send01 from '@untitled-ui/icons-react/build/esm/Send01';
import Upload01 from '@untitled-ui/icons-react/build/esm/Upload01';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Unstable_Grid2';
import TextField from '@mui/material/TextField';
import {
  List,
  SvgIcon,
  ListItem,
  ListItemIcon,
  ListItemText,
  LinearProgress,
  CircularProgress,
} from '@mui/material';

import { useDialog } from 'src/hooks/use-dialog';

import { bytesToSize } from 'src/utils/bytes-to-size';

import { FileIcon } from 'src/components/file-icon/file-icon';

import { FileUploader } from './file-uploader';

// Define the validation schema
const validationSchema = yup.object({
  nom: yup.string().required('Nom complet est requis'),
  entreprise: yup.string().required('Entreprise partenaire est requis'),
  projet: yup.string().required('Intitulé du projet est requis'),
  email: yup.string().email('Format email invalide').required('Addresse Email est requis'),
  // files: yup.mixed().required('Veuillez sélectionner un fichier'),
});

export const SubmitForm: FC = () => {
  const [files, setFiles] = useState<File[]>([]);
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);
  const uploadDialog = useDialog();

  // Initialize Formik
  const formik = useFormik({
    initialValues: {
      nom: '',
      entreprise: '',
      projet: '',
      email: '',
    },
    validationSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      if (files.length === 0) {
        toast.error('Aucun fichier sélectionné pour le téléchargement!');
      } else if (files.length !== 2) {
        toast.error('Veuillez sélectionner exactement 2 fichiers.');
      } else {
        handleUpload();
        try {
          setLoading(true);
        } catch (error) {
          toast.error('Échec de l’envoi de la candidature. Veuillez réessayer.');
          console.error('Échec de l’envoi de la candidature. Veuillez réessayer.: ', error);
        } finally {
          setSubmitting(false);
          setLoading(false);
        }
      }
    },
  });

  const handleUpload = async () => {
    if (files.length === 0) {
      toast.error('No files selected for upload');
    }
  };

  return (
    <Box
      sx={{
        backgroundColor: 'neutral.900',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'top center',
        color: 'neutral.100',
        py: '120px',
        p: 4,
        my: 2,
        borderRadius: 2,
      }}
    >
      {loading && <LinearProgress />}
      <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={3}>
          <Grid xs={12}>
            <TextField
              fullWidth
              label="Nom complet"
              name="nom"
              ref={nameRef}
              required
              value={formik.values.nom}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.nom && Boolean(formik.errors.nom)}
              helperText={formik.touched.nom && formik.errors.nom}
            />
          </Grid>
          <Grid xs={12}>
            <TextField
              fullWidth
              label="Entreprise partenaire"
              name="entreprise"
              required
              value={formik.values.entreprise}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.entreprise && Boolean(formik.errors.entreprise)}
              helperText={formik.touched.entreprise && formik.errors.entreprise}
            />
          </Grid>
          <Grid xs={12}>
            <TextField
              fullWidth
              label="Intitulé du projet"
              name="projet"
              required
              value={formik.values.projet}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.projet && Boolean(formik.errors.projet)}
              helperText={formik.touched.projet && formik.errors.projet}
              size="small"
            />
          </Grid>
          <Grid container xs={12} spacing={4}>
            <Grid xs={12} md={8}>
              <TextField
                fullWidth
                required
                label="Addresse Email"
                ref={emailRef}
                name="email"
                type="email"
                size="small"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
              />
            </Grid>
            <Grid xs={12} md={4} alignSelf="end">
              <Button
                sx={{
                  width: '100%',
                  py: 1.3,
                }}
                onClick={uploadDialog.handleOpen}
                startIcon={
                  <SvgIcon>
                    <Upload01 />
                  </SvgIcon>
                }
                color="info"
                variant="outlined"
              >
                Déposer/Remplacer mon CV
              </Button>
              <FileUploader
                onClose={uploadDialog.handleClose}
                open={uploadDialog.open}
                onSelectFiles={(file) => {
                  setFiles(files);
                }}
              />
            </Grid>
            <Grid xs={12}>
              <List>
                {files.map((file, i) => {
                  const extension = file.name.split('.').pop();

                  return (
                    <ListItem
                      key={i}
                      sx={{
                        border: 1,
                        borderColor: 'divider',
                        borderRadius: 1,
                        '& + &': {
                          mt: 1,
                        },
                      }}
                    >
                      <ListItemIcon>
                        <FileIcon extension={extension} />
                      </ListItemIcon>
                      <ListItemText
                        primary={file.name}
                        primaryTypographyProps={{ variant: 'subtitle2' }}
                        secondary={bytesToSize(file.size)}
                      />
                    </ListItem>
                  );
                })}
              </List>
            </Grid>
          </Grid>
        </Grid>
        <Box sx={{ mt: 6 }}>
          <Button
            type="submit"
            variant="contained"
            startIcon={formik.isSubmitting ? <CircularProgress size={12} /> : <Send01 />}
          >
            Valider
          </Button>
        </Box>
      </form>
    </Box>
  );
};
