import { paths } from 'src/routes/paths';

// ----------------------------------------------------------------------

export const pageLinks = [
  {
    subheader: 'Cluster',
    cover: '/assets/images/menu/menu_career.jpg',
    items: [
      { title: 'Landing', path: paths.career.root },
      { title: 'Le Cluster', path: paths.clusterPortal.presentation },
      { title: 'Idées', path: paths.clusterPortal.blog },
      { title: 'Le Studio', path: paths.clusterPortal.studio },
      { title: 'Carrières', path: paths.clusterPortal.jobs },
      // { title: 'Blog Posts', path: paths.career.posts },
      // { title: 'Blog Post', path: paths.career.post },
      // { title: 'About', path: paths.career.about },
    ],
  },
];

export const navConfig = [
  { title: 'Accueil ', path: '/' },
  { title: 'Le Cluster', path: paths.clusterPortal.presentation },
  { title: 'Idées', path: paths.clusterPortal.blog },
  { title: 'Le Studio', path: paths.clusterPortal.studio },
  { title: 'Carrières', path: paths.clusterPortal.jobs },
  // { title: 'Contact', path: paths.career.contact },
  // { title: 'jobs', path: paths.career.jobs },
  // { title: 'job', path: paths.career.job },
  // { title: 'Docs', path: paths.docs },
];
