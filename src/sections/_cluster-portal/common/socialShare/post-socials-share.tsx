// import Stack from '@mui/material/Stack';
// import Button from '@mui/material/Button';
// import { alpha } from '@mui/material/styles';
// import Typography from '@mui/material/Typography';

// import { _socials } from 'src/_mock';

// import Iconify from 'src/components/iconify';

// // ----------------------------------------------------------------------

// export default function PostSocialsShare() {
//   return (
//     <Stack direction="row" sx={{ mt: 5 }}>
//       <Typography variant="subtitle2" sx={{ mt: 0.75, mr: 1.5 }}>
//         Share:
//       </Typography>

//       <Stack direction="row" alignItems="center" flexWrap="wrap">
//         {_socials.map((social) => (
//           <Button
//             key={social.value}
//             size="small"
//             variant="outlined"
//             startIcon={<Iconify icon={social.icon} />}
//             sx={{
//               m: 0.5,
//               flexShrink: 0,
//               color: social.color,
//               borderColor: social.color,
//               '&:hover': {
//                 borderColor: social.color,
//                 bgcolor: alpha(social.color, 0.08),
//               },
//             }}
//           >
//             {social.label}
//           </Button>
//         ))}
//       </Stack>
//     </Stack>
//   );
// }


import React from 'react';
import { Stack, Typography } from '@mui/material';
import { PrimaryShareButton } from './buttonsUI/PrimaryShareButton';
import { useParams } from 'next/navigation';
import { SecondaryShareButton } from './buttonsUI/SecondaryShareButton';
import { buttonTypeMap } from './buttonTypeMap';

interface PostSocialsShareProps {
  buttonType: 'primary' | 'secondary';
  route?: string;
}
const PostSocialsShare = ({buttonType, route} : PostSocialsShareProps) => {
  const { slug } = useParams();

  const shareUrl = `https://mdfc.ma/${route}/${slug}`;
  const shareTitle = 'Share';
  const socials = [
    {
      value: 'facebook',
      label: 'FaceBook',
      icon: 'carbon:logo-facebook',
      color: '#1877F2',
    },
    {
      value: 'linkedin',
      label: 'Linkedin',
      icon: 'carbon:logo-linkedin',
      color: '#007EBB',
    },
    {
      value: 'twitter',
      label: 'Twitter',
      icon: 'carbon:logo-twitter',
      color: '#00AAEC',
    },
  ];
  
  // Dynamically get the correct button component
  const ShareButton = buttonTypeMap[buttonType];
  

  return (
    <Stack direction="row" >
      {/* <Typography variant="subtitle2" sx={{ mt: 0.75, mr: 1.5 }}>
        Share:
      </Typography> */}
      <Stack direction="row" alignItems="center" flexWrap="wrap">
      {socials.map((social) => (
          <ShareButton
            key={social.value}
            platform={social.value}
            url={shareUrl}
            title={shareTitle}
            styling={social}
          />
        ))}
      </Stack>
    </Stack>
  );
};

export default PostSocialsShare;

