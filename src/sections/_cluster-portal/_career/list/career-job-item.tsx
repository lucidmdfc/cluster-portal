import { useState, useCallback } from 'react';

import Card from '@mui/material/Card';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';

import { fDate } from 'src/utils/format-time';
import { fCurrency } from 'src/utils/format-number';

import Label from 'src/components/label';
import Image from 'src/components/image';
import Iconify from 'src/components/iconify';
import TextMaxLine from 'src/components/text-max-line';
import urlFor from 'src/lib/sanity';

// import { IJobProps } from 'src/types/job';
import { Job } from 'src/types/cluster_Types/sanity.types';

// ----------------------------------------------------------------------

type Props = {
  job: Job;
};
// type Props = {
//   job: IJobProps;
// };

export default function CareerJobItem({ job }: Props) {
  const { title, level, salary, location,  publicationDate, experience, company, contract } =
    job;
  
  console.log(job)
  // console.log(publicationDate)
  // console.log(company?.illustrations)
  // src={urlFor(coverImage?.imageAsset?.image?.asset)?.url() ?? ''}
  // const [favorite, setFavorite] = useState(favorited);
  // const handleChangeFavorite = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
  //   setFavorite(event.target.checked);
  // }, []);



  return (
    <Card
      sx={{
        '&:hover': {
          boxShadow: (theme) => theme.customShadows.z24,
        },
      }}
    >
      {/* <Checkbox
        color="error"
        checked={favorite}
        onChange={handleChangeFavorite}
        icon={<Iconify icon="carbon:favorite" />}
        checkedIcon={<Iconify icon="carbon:favorite-filled" />}
        sx={{ position: 'absolute', right: 16, top: 16 }}
      /> */}

      <Stack sx={{ p: 3, pb: 0 }}>
        <Stack direction="row" alignItems="center" spacing={2.5}>
          <Image
            src={
              company?.illustrations?.[0]?.imageAsset?.image?.asset
                ? urlFor(company.illustrations[0].imageAsset.image.asset)?.url()
                : ''
            }
            alt={company?.name}
            sx={{ width: 48, height: 48, borderRadius: 1 }}
          />

          {/* {urgent && <Label color="error">Urgent</Label>} */}
        </Stack>

        <Stack spacing={0.5} sx={{ mt: 3, mb: 2 }}>
          <Link
            component={RouterLink}
            href={`${paths.clusterPortal.jobs}/${job._id}`}
            color="inherit"
          >
            <TextMaxLine variant="h6" line={1}>
              {title}
            </TextMaxLine>
          </Link>

          <Typography variant="body2" sx={{ color: 'info.main' }}>
            {company?.name}
          </Typography>

          <Stack
            direction="row"
            alignItems="center"
            sx={{ typography: 'body2', color: 'text.secondary' }}
          >
            <Iconify icon="carbon:location" width={18} sx={{ mr: 0.5 }} />
            {location}
          </Stack>
        </Stack>

        <Typography variant="caption" sx={{ color: 'text.disabled' }}>
          Posted day: {fDate(publicationDate)} 
        </Typography>
      </Stack>

      <Divider sx={{ borderStyle: 'dashed', my: 2 }} />

      <Grid
        container
        spacing={1.5}
        sx={{
          p: 3,
          pt: 0,
          typography: 'body2',
          color: 'text.secondary',
          textTransform: 'capitalize',
        }}
      >
        <Grid xs={6}>
          <Stack direction="row" alignItems="center" sx={{ typography: 'body2' }}>
            <Iconify icon="carbon:increase-level" sx={{ mr: 1 }} />
            {`${experience} year exp`}
          </Stack>
        </Grid>

        <Grid xs={6}>
          <Stack direction="row" alignItems="center" sx={{ typography: 'body2' }}>
            <Iconify icon="carbon:time" sx={{ mr: 1 }} />
            {contract}
          </Stack>
        </Grid>

        <Grid xs={6}>
          <Stack direction="row" alignItems="center" sx={{ typography: 'body2' }}>
            <Iconify icon="carbon:money" sx={{ mr: 1 }} />
            {typeof salary === 'number' ? fCurrency(salary) : salary}
          </Stack>
        </Grid>

        <Grid xs={6}>
          <Stack direction="row" alignItems="center" sx={{ typography: 'body2' }}>
            <Iconify icon="carbon:user" sx={{ mr: 1 }} />
            {level}
          </Stack>
        </Grid>
      </Grid>
    </Card>
  );
}
