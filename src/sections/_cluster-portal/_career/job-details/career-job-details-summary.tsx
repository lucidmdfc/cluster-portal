import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import Markdown from 'src/components/markdown';
import RichText from 'src/components/rich-text/rich-text';
import { JOB_QUERY } from 'src/lib/queries';

// import { IJobProps } from 'src/types/job';
import { Job } from 'src/types/cluster_Types/sanity.types';

// ----------------------------------------------------------------------

type Props = {
  job: Job;
};
// type Props = {
//   job: IJobProps;
// };

export default function CareerJobDetailsSummary({ job }: Props) {
  const { body } = job;
  console.log(body)
  return (
    <Stack spacing={5}>
      <RichText content={body} />

      {/* //TODO to be replaced by rich text  */}
      <Stack spacing={3}>
        <Typography variant="h5">Job Skills</Typography>

        {/* <Stack direction="row" flexWrap="wrap" spacing={1}>
          {skills.map((skill) => (
            <Chip key={skill} label={skill} size="small" variant="soft" onClick={() => {}} />
          ))}
        </Stack> */}
      </Stack>
    </Stack>
  );
}
