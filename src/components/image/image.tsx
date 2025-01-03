import { forwardRef } from 'react';
import Image from 'next/image';

import Box from '@mui/material/Box';
import { alpha, useTheme } from '@mui/material/styles';

import { getRatio } from './utils';
import { ImageProps } from './types';

// ----------------------------------------------------------------------

const CustomImage = forwardRef<HTMLSpanElement, ImageProps>(
  (
    {
      ratio,
      overlay,
      disabledEffect = false,
      alt,
      src,
      placeholder,
      wrapperProps,
      sx,
      ...other
    },
    ref
  ) => {
    const theme = useTheme();

    const overlayStyles = !!overlay && {
      '&:before': {
        content: "''",
        top: 0,
        left: 0,
        width: 1,
        height: 1,
        zIndex: 1,
        position: 'absolute',
        background: overlay || alpha(theme.palette.grey[900], 0.48),
      },
    };

    // The image content box will fill the parent container
    const content = (
      <Box
        component="span"
      >
        <Image
          src={src || "/assets/placeholder.svg"}
          alt={alt || "image"}
          layout="fill"
          objectFit="cover"
          placeholder="blur"
          blurDataURL="/assets/placeholder.svg"
        />
      </Box>
    );

    return (
      <Box
        ref={ref}
        component="span"
        className="component-image"
        sx={{
          overflow: 'hidden',
          position: 'relative', 
          verticalAlign: 'bottom',
          display: 'inline-block',
          ...(!!ratio && {
            width: '100%', 
            pt: getRatio(ratio),
          }),
          '& span.component-image-wrapper': {
            width: '100%',
            height: '100%',
            verticalAlign: 'bottom',
            backgroundSize: 'cover !important',
          },
          ...overlayStyles,
          ...sx,
        }}
        {...other}
      >
        {content}
      </Box>
    );
  }
);

export default CustomImage;
