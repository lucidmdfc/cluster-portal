'use client';

import { useState, useCallback } from 'react';

import Stack from '@mui/material/Stack';
import Accordion from '@mui/material/Accordion';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary, { accordionSummaryClasses } from '@mui/material/AccordionSummary';

import { useResponsive } from 'src/hooks/use-responsive';

import Image from 'src/components/image';
import Iconify from 'src/components/iconify';

// ----------------------------------------------------------------------

type props = {
  // roj: any;
  Faqs: any;
};

export default function ClusterFaqs({ Faqs }: props) {
  const mdUp = useResponsive('up', 'md');

  const [expanded, setExpanded] = useState<string | false>(false);

  const handleChangeExpanded = useCallback(
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    },
    []
  );
  // const Faqs = roj.faqs;
  // console.log('faqs', Faqs);

  return (
    <Container
      sx={{
        pt: { xs: 5, md: 10 },
        pb: { xs: 10, md: 15 },
      }}
    >
      <Grid container spacing={3} justifyContent="space-between" alignItems="center">
        <Grid xs={12} md={6} lg={6}>
          <Stack spacing={2} sx={{ mb: 5, textAlign: { xs: 'center', md: 'left' } }}>
            <Typography variant="overline" color="text.disabled">
              FAQS
            </Typography>

            <Typography variant="h2">Le CLUSTER en questions</Typography>
          </Stack>

          {Faqs.map((faq: any) => (
            <Accordion
              key={faq._id}
              expanded={expanded === faq.question}
              onChange={handleChangeExpanded(faq.question)}
            >
              <AccordionSummary
                sx={{
                  minHeight: 64,
                  [`& .${accordionSummaryClasses.content}`]: {
                    p: 0,
                    m: 0,
                  },
                  [`&.${accordionSummaryClasses.expanded}`]: {
                    bgcolor: 'action.selected',
                  },
                }}
              >
                <Typography variant="h6" sx={{ flexGrow: 1 }}>
                  {faq.question}
                </Typography>

                <Iconify
                  width={24}
                  icon={expanded === faq.question ? 'carbon:subtract' : 'carbon:add'}
                />
              </AccordionSummary>

              <AccordionDetails>{faq.answer}</AccordionDetails>
            </Accordion>
          ))}
        </Grid>

        {mdUp && (
          <Grid xs={12} md={6} lg={5}>
            <Image alt="faqs" src="/assets/illustrations/illustration_faqs.svg" />
          </Grid>
        )}
      </Grid>
    </Container>
  );
}
