"use client";

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { alpha, useTheme } from '@mui/material/styles';

import { paths } from 'src/routes/paths';

import { fDate } from 'src/utils/format-time';

import { bgGradient } from 'src/theme/css';

import Iconify from 'src/components/iconify';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';

// import { IJobProps } from 'src/types/job';
import { Job } from 'src/types/cluster_Types/sanity.types';
import { applyForJob } from 'src/app/actions/applyJob';
import { useRouter } from "next/navigation";
// ----------------------------------------------------------------------

type Props = {
  job: Job;
};
// type Props = {
//   job: IJobProps;
// };



export default function CareerJobDetailsHero({ job }: Props) {
  const theme = useTheme();
  const router = useRouter();

  // const [favorite, setFavorite] = useState(job.favorited);

  // const handleChangeFavorite = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
  //   setFavorite(event.target.checked);
  // }, []);
  // console.log(job)
  const handleApply = async () => {
    try {
      const response = await applyForJob(job._id);
      if (response?.redirectTo) {
        // Redirect user to the sign-in page
        router.push(response.redirectTo);
      }
    } catch (error) {
      console.error("Application error:", error);
    }
  };
  return (
    <Box
      sx={{
        ...bgGradient({
          color: alpha(theme.palette.grey[900], 0.8),
          imgUrl: '/assets/background/overlay_2.jpg',
        }),
        pt: 5,
        pb: 10,
      }}
    >
      <Container>
        <CustomBreadcrumbs
          links={[
            { name: 'Home', href: '/' },
            { name: 'Jobs', href: paths.career.jobs },
            { name: job.title },
          ]}
          sx={{
            mb: { xs: 5, md: 8 },
            '& a': {
              color: 'common.white',
            },
          }}
        />

        <Stack
          spacing={5}
          direction={{ xs: 'column', md: 'row' }}
          justifyContent={{ md: 'space-between' }}
        >
          <Stack spacing={{ xs: 3, md: 2 }} sx={{ color: 'common.white' }}>
            <Typography variant="h3" component="h1">
              {job.title}
            </Typography>

            <Stack spacing={3} direction={{ xs: 'column', md: 'row' }} sx={{ opacity: 0.48 }}>
              <Stack direction="row" alignItems="center" sx={{ typography: 'body2' }}>
                <Iconify icon="carbon:baggage-claim" sx={{ mr: 1 }} />
                <Link color="inherit" underline="always">
                  {job?.company?.sector?.sectorName}
                </Link>
              </Stack>

              <Stack direction="row" alignItems="center" sx={{ typography: 'body2' }}>
                {/* <Iconify icon="carbon:view" sx={{ mr: 1 }} /> {`${job.totalViews} views`} */}
              </Stack>

              <Stack direction="row" alignItems="center" sx={{ typography: 'body2' }}>
                <Iconify icon="carbon:location" sx={{ mr: 1 }} /> {job.location}
              </Stack>
            </Stack>
          </Stack>

          <Stack
            spacing={2}
            direction="row"
            alignItems="flex-start"
            sx={{ width: 1, maxWidth: 340 }}
          >
            <Stack spacing={2} alignItems="center" sx={{ width: 1 }}>
              <Button onClick={handleApply} fullWidth variant="contained" size="large" color="primary">
                Apply Now
              </Button>

              <Typography variant="body2" sx={{ color: 'common.white' }}>
                {`Expiration date: `}
                <Box component="span" sx={{ color: 'primary.main' }}>
                  {fDate(job.expirationDate)}
                </Box>
              </Typography>
            </Stack>

            {/* <Box sx={{ pt: 0.75 }}>
              <Checkbox
                color="error"
                checked={favorite}
                onChange={handleChangeFavorite}
                icon={<Iconify icon="carbon:favorite" width={24} />}
                checkedIcon={<Iconify icon="carbon:favorite-filled" width={24} />}
              />
            </Box> */}
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
}
