import React from "react";
import { SocialShareWrapper } from "./SocialShareWrapper";
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { alpha } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Iconify from "src/components/iconify";

interface CustomShareButtonProps {
  platform: any;
  styling: any;
  url: string;
  title: string;
  description?: string;
}

export const CustomShareButton: React.FC<CustomShareButtonProps> = ({
  platform,
  url,
  title,
  description,
  styling,
}) => {
  return (
    <SocialShareWrapper platform={platform} url={url} title={title} description={description}>
          <Button
            key={platform}
            size="small"
            variant="outlined"
            startIcon={<Iconify icon={styling.icon} />}
            sx={{
              m: 0.5,
              flexShrink: 0,
              color: styling.color,
              borderColor: styling.color,
              '&:hover': {
                borderColor: styling.color,
                bgcolor: alpha(styling.color, 0.08),
            },
          }}
        >
        {platform}
      </Button>
    </SocialShareWrapper>
  );
};
