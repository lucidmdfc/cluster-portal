import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import Markdown from 'src/components/markdown';

import { IJobProps } from 'src/types/job';

// ----------------------------------------------------------------------

type Props = {
  job: IJobProps;
};

export default function CareerJobDetailsSummary({ job }: Props) {
  const { skills, content } = job;

  return (
    <Stack spacing={5}>
      <Markdown content={content} />
      {/* //TODO to be replaced by rich text  */}
      <Stack spacing={3}>
        <Typography variant="h5">Job Skills</Typography>

        <Stack direction="row" flexWrap="wrap" spacing={1}>
          {skills.map((skill) => (
            <Chip key={skill} label={skill} size="small" variant="soft" onClick={() => {}} />
          ))}
        </Stack>
      </Stack>
    </Stack>
  );
}
