import { paths } from 'src/routes/paths';

// ----------------------------------------------------------------------

export const pageLinks = [
  {
    subheader: 'Cluster',
    cover: '/assets/images/menu/menu_career.jpg',
    items: [
      { title: 'Landing', path: paths.career.root },
      { title: 'Jobs', path: paths.career.jobs },
      { title: 'Job', path: paths.career.job },
      // { title: 'Blog Posts', path: paths.career.posts },
      // { title: 'Blog Post', path: paths.career.post },
      // { title: 'About', path: paths.career.about },
      { title: 'Contact', path: paths.career.contact },
    ],
  },
];

export const navConfig = [
  { title: 'Accueil ', path: '/' },
  { title: 'Le Cluster', path: paths.career.presentation },
  { title: 'Idées', path: paths.career.blog },
  { title: 'Le Studio', path: '/' },
  { title: 'Carrières', path: paths.career.jobs },
  // { title: 'Contact', path: paths.career.contact },
  // { title: 'jobs', path: paths.career.jobs },
  // { title: 'job', path: paths.career.job },
  // { title: 'Docs', path: paths.docs },
];
