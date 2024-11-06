'use client';

import AuthCoverLayout from 'src/layouts/auth/cover';

// ----------------------------------------------------------------------

type Props = {
  children: React.ReactNode;
};

export default function Layout({ children }: Props) {
  return (
    <AuthCoverLayout
      title={`Manage The Job \n More Effectively`}
      images={['/assets/images/cluster/cluster01.jpg', '/assets/images/cluster/cluster02.jpg']}
    >
      {children}
    </AuthCoverLayout>
  );
}
