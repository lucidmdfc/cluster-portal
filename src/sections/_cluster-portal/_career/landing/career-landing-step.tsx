import { useForm } from 'react-hook-form';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import Iconify from 'src/components/iconify';
import SvgColor from 'src/components/svg-color';


// clerk for for auth status 
import { useAuth } from '@clerk/nextjs'; 
import { useRouter } from 'next/navigation';
// ----------------------------------------------------------------------

const STEPS = [
  {
    title: 'Créer votre compte',
    description: "Il suffit d'uploader ensuite votre CV!.",
    icon: '/assets/icons/ic_resume_job.svg',
  },
  {
    title: 'Naviguez directement les offres',
    description: 'Vous pouvez accéder à toutes les offres en un clic',
    icon: '/assets/icons/ic_resume_job.svg',
  },
  {
    title: 'Postulez',
    description: 'En un clic votre candidature est reçue par le recruteur',
    icon: '/assets/icons/ic_search_job.svg',
  },
];

// ----------------------------------------------------------------------

export default function CareerLandingStep() {
  const router = useRouter();

  const offre = " Déployez votre maîtrise dans l’univers Textile & Mode!";
  const defaultValues = {
    email: '',
    password: '',
  };

  const { isSignedIn } = useAuth(); // Gets the auth status from Clerk
  const methods = useForm({
    defaultValues,
  });
  return (
    <Box
      sx={{
        textAlign: 'center',
        pt: { xs: 10, md: 15 },
        pb: { xs: 5, md: 10 },
      }}
    >
      <Container>
        <Typography variant="overline" sx={{ color: 'text.disabled' }}>
          Pour les candidats
        </Typography>

        <Typography variant="h2" sx={{ my: 3 }}>
          {offre}
        </Typography>

        <Typography sx={{ color: 'text.secondary', maxWidth: 480, mx: 'auto' }}>
          La Job Marketplace du MDFC vous offre une expérience intuitive pour la recherche des
          opportunités, avec des offres ciblées et orientées uniquement Textile
        </Typography>

        <Box
          sx={{
            display: 'grid',
            my: { xs: 8, md: 10 },
            gap: { xs: 8, md: 5 },
            gridTemplateColumns: {
              xs: 'repeat(1, 1fr)',
              md: 'repeat(3, 1fr)',
            },
          }}
        >
          {STEPS.map((value, index) => (
            <div key={value.title}>
              <SvgColor
                src={value.icon}
                sx={{
                  width: 80,
                  height: 80,
                  mx: 'auto',
                  color: 'primary.main',
                }}
              />
              <Typography
                variant="overline"
                sx={{ mt: 4, display: 'block', color: 'text.disabled' }}
              >
                étape {index + 1}
              </Typography>

              <Typography variant="h5" sx={{ mt: 2, mb: 1 }}>
                {value.title}
              </Typography>

              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                {value.description}
              </Typography>
            </div>
          ))}
        </Box>
        {
          isSignedIn &&
          <Button
            variant="contained"
            size="large"
            color="inherit"
            startIcon={<Iconify icon="carbon:cloud-upload" />}
            onClick={() => router.push("/account/personal")}
          >
            Espace Perso
          </Button>
        }
      </Container>
    </Box>
  );
}
