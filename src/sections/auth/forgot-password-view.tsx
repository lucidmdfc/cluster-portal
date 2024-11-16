'use client';

import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';

import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';

import { app } from 'src/lib/firebase/firebaseSdk';

import Image from 'src/components/image';
import Iconify from 'src/components/iconify';
import FormProvider, { RHFTextField } from 'src/components/hook-form';
// ----------------------------------------------------------------------

export default function ForgotPasswordView() {
  const ForgotPasswordSchema = Yup.object().shape({
    email: Yup.string().required('Email is required').email('Email must be a valid email address'),
  });

  const defaultValues = {
    email: '',
  };

  const methods = useForm({
    resolver: yupResolver(ForgotPasswordSchema),
    defaultValues,
  });

  const {
    setError,
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      await sendPasswordResetEmail(getAuth(app), data.email);
      reset();
    } catch (error) {
      setError('email', { type: 'manual', message: error.message });
      console.error(error);
    }
  });

  return (
    <Stack sx={{ textAlign: 'center' }}>
      <Image
        alt="reset password"
        src="/assets/icons/ic_lock_password.svg"
        sx={{ mb: 5, width: 96, height: 96, mx: 'auto' }}
      />

      <Typography variant="h3" paragraph>
        Mot de passe oublié?
      </Typography>

      <Typography variant="body2" sx={{ color: 'text.secondary', mb: 5 }}>
        Veuillez saisir votre email associé à ce compte pour recevoir un lien de réinitialisation de
        mot de passe.
      </Typography>

      <FormProvider methods={methods} onSubmit={onSubmit}>
        <RHFTextField name="email" hiddenLabel placeholder="Email address" />

        <LoadingButton
          fullWidth
          size="large"
          color="inherit"
          type="submit"
          variant="contained"
          loading={isSubmitting}
          sx={{ mt: 2.5 }}
        >
          Réinitialiser
        </LoadingButton>
      </FormProvider>

      <Link
        component={RouterLink}
        href={paths.loginCover}
        color="inherit"
        variant="subtitle2"
        sx={{
          mt: 3,
          mx: 'auto',
          alignItems: 'center',
          display: 'inline-flex',
        }}
      >
        <Iconify icon="carbon:chevron-left" width={16} sx={{ mr: 1 }} />
        Retour à la connexion
      </Link>
    </Stack>
  );
}
