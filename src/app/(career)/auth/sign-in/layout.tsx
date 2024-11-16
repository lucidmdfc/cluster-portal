'use client';

import AuthCoverLayout from 'src/layouts/auth/cover';

// ----------------------------------------------------------------------

type Props = {
  children: React.ReactNode;
};

export default function Layout({ children }: Props) {
  return (
    <AuthCoverLayout
      title="Créez votre profil et découvrez l'offre qui vous correspond le mieux!"
      images={['/assets/images/cluster/cluster01.jpg']}
    >
      {children}
    </AuthCoverLayout>
  );
}
