import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { fDate } from 'src/utils/format-time';
import { fCurrency } from 'src/utils/format-number';

import Iconify from 'src/components/iconify';

import { IJobProps } from 'src/types/job';
import { Job } from 'src/types/cluster_Types/sanity.types';

// ----------------------------------------------------------------------

type Props = {
  job: Job;
};
// type Props = {
//   job: IJobProps;
// };

export default function CareerJobDetailsInfo({ job }: Props) {
  const { publicationDate, salary, experience, expirationDate, level, salaryDetails } = job;
  // console.log(job)

  return (
    <Card sx={{ p: 3 }}>
      <Stack spacing={2}>
        <Stack spacing={2} direction="row" alignItems="flex-start">
          <Iconify icon="carbon:calendar" width={24} />
          <Stack>
            <Typography variant="subtitle2"> Date de publication </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              {fDate(publicationDate)}
            </Typography>
          </Stack>
        </Stack>

        <Stack spacing={2} direction="row" alignItems="flex-start">
          <Iconify icon="carbon:hourglass" width={24} />
          <Stack>
            <Typography variant="subtitle2"> Date d'expiration </Typography>
            <Typography variant="body2" sx={{ color: 'error.main' }}>
              {fDate(expirationDate)}
            </Typography>
          </Stack>
        </Stack>

        <Stack spacing={2} direction="row" alignItems="flex-start">
          <Iconify icon="carbon:money" width={24} />
          <Stack>
            {salary === "competitive" ? 
              <>
                <Typography variant="subtitle2"> Salaire </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  compétitive
                </Typography>
              </>
              :
              <>
                <Typography variant="subtitle2"> Salaire offert (mois) </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  {salaryDetails?.minSalary + "-" + salaryDetails?.maxSalary}
                </Typography>
              </>
          }
          </Stack>
        </Stack>

        <Stack spacing={2} direction="row" alignItems="flex-start">
          <Iconify icon="carbon:increase-level" width={24} />
          <Stack>
            <Typography variant="subtitle2"> Expérience </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              {`${experience} année d'exp`}
            </Typography>
          </Stack>
        </Stack>

        <Stack spacing={2} direction="row" alignItems="flex-start">
          <Iconify icon="carbon:user" width={24} />
          <Stack>
            <Typography variant="subtitle2"> Niveau </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              {level}
            </Typography>
          </Stack>
        </Stack>
      </Stack>
    </Card>
  );
}
