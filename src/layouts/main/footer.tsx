'use client';

import Link from '@mui/material/Link';
import Masonry from '@mui/lab/Masonry';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import Collapse from '@mui/material/Collapse';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';

import { usePathname } from 'src/routes/hooks';
import { RouterLink } from 'src/routes/components';

import { useBoolean } from 'src/hooks/use-boolean';
import { useResponsive } from 'src/hooks/use-responsive';

import Logo from 'src/components/logo';
import Iconify from 'src/components/iconify';
import RichText from 'src/components/rich-text/rich-text';

import { pageLinks, navConfig } from './config-navigation';

// ----------------------------------------------------------------------
type Props = {
  footer: any;
};
//
export default function Footer({ footer }: Props) {
  const mdUp = useResponsive('up', 'md');

  const pathname = usePathname();

  const socials = [
    { key: 'twitter', url: footer?.socialLinks?.twitter ?? '' },
    { key: 'facebook', url: footer?.socialLinks?.facebook ?? '' },
    { key: 'linkedin', url: footer?.socialLinks?.linkedin ?? '' },
  ];
  const socialIcons = [
    {
      key: 'facebook',
      icon: 'carbon:logo-facebook',
      color: '#1877f2',
    },
    {
      key: 'twitter',
      icon: 'carbon:logo-twitter',
      color: '#1da1f2',
    },
    {
      key: 'linkedin',
      icon: 'carbon:logo-linkedin',
      color: '#0a66c2',
    },
    {
      key: 'instagram',
      icon: 'carbon:logo-instagram',
      color: '#c13584',
    },
  ];
  const mobileList = [
    {
      subheader: 'Cluster',
      cover: '/assets/images/menu/menu_career.jpg',
      items: navConfig.map((item) => ({
        title: item.title,
        path: item.path,
      })),
    },
  ] as Array<{
    subheader: string;
    cover: string;
    items: Array<{
      title: string;
      path: string;
    }>;
  }>;

  const desktopList = [pageLinks.find((i) => i.subheader === 'Cluster') || {}];

  const renderList = mdUp ? desktopList : mobileList;
  const isHome = pathname === '/';

  const simpleFooter = (
    <Container sx={{ py: 8, textAlign: 'center' }}>
      <Logo single />

      <Typography variant="caption" component="div" sx={{ color: 'text.secondary' }}>
        {/* © 2023. All rights reserved */}
        {footer?.copyrightText}
      </Typography>
    </Container>
  );

  const mainFooter = (
    <>
      <Divider />

      <Container
        sx={{
          overflow: 'hidden',
          py: { xs: 8, md: 10 },
        }}
      >
        <Grid container spacing={3} justifyContent={{ md: 'space-between' }}>
          <Grid xs={12} md={4}>
            <Stack spacing={{ xs: 3, md: 5 }}>
              <Stack alignItems="flex-start" spacing={3}>
                <Logo />
                {footer?.extraSections.map((section: any) => (
                  <Stack spacing={1} alignItems="flex-start">
                    <Typography variant="h6">{section?.title}</Typography>
                    <RichText content={section?.content} />
                  </Stack>
                ))}
              </Stack>
              {footer?.socialLink ?? (
                <Stack spacing={2}>
                  <Typography variant="h6">Social</Typography>
                  <Stack direction="row" alignItems="center">
                    {/* Begin by filtering and mapping over the socials array to generate icon buttons
                  for each social link. */}
                    {socials
                      .filter((social) => social.url) // Step 1: Filter out social items that don't have a URL. Only include social platforms with a valid URL.
                      .map((social) => {
                        // Step 2: Find the icon for each social network by matching the key in the socialIcons array.
                        const socialIcon = socialIcons.find((icon) => icon.key === social.key);

                        // Step 3: Check if an icon exists for the social network. If it does, create an IconButton with the social media link.
                        return (
                          socialIcon && ( // Only proceed if there is a matching icon.
                            <IconButton key={social.key}>
                              {' '}
                              {/* Create an IconButton component for the social media link. */}
                              <Link
                                href={social.url} // Set the URL for the link. This URL comes from the socials array.
                                target="_blank" // Open the link in a new tab.
                                rel="noopener noreferrer" // Improve security by preventing the new page from accessing the window.opener property.
                                color="inherit" // Inherit the color of the link from its parent element.
                                underline="none" // Remove the underline styling from the link.
                              >
                                {/* Display the icon using Iconify, with the icon and color based on the social network */}
                                <Iconify icon={socialIcon.icon} sx={{ color: socialIcon.color }} />
                              </Link>
                            </IconButton>
                          )
                        );
                      })}
                  </Stack>
                </Stack>
              )}
            </Stack>
          </Grid>

          <Grid xs={12} md={6}>
            {mdUp ? (
              <Masonry columns={4} spacing={2} defaultColumns={4} defaultSpacing={2}>
                <ListDesktop list={renderList[0]} />
              </Masonry>
            ) : (
              <Stack spacing={1.5}>
                <ListMobile list={renderList[0]} />
              </Stack>
            )}
          </Grid>
        </Grid>
      </Container>

      <Divider />

      <Container>
        <Stack
          spacing={2.5}
          direction={{ xs: 'column', md: 'row' }}
          justifyContent="space-between"
          sx={{ py: 3, textAlign: 'center' }}
        >
          <Typography variant="caption" sx={{ color: 'text.secondary' }}>
            {/* © 2023. All rights reserved */}
            {footer?.copyrightText}
          </Typography>
        </Stack>
      </Container>
    </>
  );

  return <footer>{isHome ? simpleFooter : mainFooter}</footer>;
}

// ----------------------------------------------------------------------

export function ListDesktop({ list }: { list: any }) {
  const pathname = usePathname();

  return (
    <Stack spacing={1.5} alignItems="flex-start">
      <Typography variant="subtitle2">{list?.subheader}</Typography>

      {list.items?.map((link: any) => {
        const active = pathname === link.path || pathname === `${link.path}/`;

        return (
          <Link
            component={RouterLink}
            key={link.title}
            href={link.path}
            variant="caption"
            sx={{
              color: 'text.secondary',
              '&:hover': {
                color: 'text.primary',
              },
              ...(active && {
                color: 'text.primary',
                fontWeight: 'fontWeightSemiBold',
              }),
            }}
          >
            {link.title}
          </Link>
        );
      })}
    </Stack>
  );
}

// ----------------------------------------------------------------------

export function ListMobile({ list }: { list: any }) {
  const pathname = usePathname();

  const listExpand = useBoolean();

  return (
    <Stack spacing={1.5} alignItems="flex-start">
      <Typography
        variant="subtitle2"
        onClick={listExpand.onToggle}
        sx={{
          cursor: 'pointer',
          display: 'inline-flex',
          alignItems: 'center',
        }}
      >
        {list?.subheader}
        <Iconify
          width={16}
          icon={listExpand.value ? 'carbon:chevron-down' : 'carbon:chevron-right'}
          sx={{ ml: 0.5 }}
        />
      </Typography>

      <Collapse in={listExpand.value} unmountOnExit sx={{ width: 1 }}>
        <Stack spacing={1.5} alignItems="flex-start">
          {list.items?.map((link: any) => (
            <Link
              component={RouterLink}
              key={link.title}
              href={link.path}
              variant="caption"
              sx={{
                color: 'text.secondary',
                '&:hover': {
                  color: 'text.primary',
                },
                ...(pathname === `${link.path}/` && {
                  color: 'text.primary',
                  fontWeight: 'fontWeightSemiBold',
                }),
              }}
            >
              {link.title}
            </Link>
          ))}
        </Stack>
      </Collapse>
    </Stack>
  );
}
