import React from "react";
import { SocialShareWrapper } from "../SocialShareWrapper";
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { alpha } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Iconify from "src/components/iconify";
import { MenuItem } from "@mui/material";
import { margin } from "@mui/system";

interface SecondaryShareButtonProps {
  platform: any;
  styling: any;
  url: string;
  title: string;
  description?: string;
}

export const SecondaryShareButton: React.FC<SecondaryShareButtonProps> = ({
  platform,
  url,
  title,
  description,
  styling,
}) => {
  return (
    <SocialShareWrapper platform={platform} url={url} title={title} description={description}>
          <MenuItem >
            <Iconify icon={styling.icon} width={24} sx={{ mr: 1, color: styling.color }} />
            Share via {platform}
          </MenuItem>
    </SocialShareWrapper>
  );
};
