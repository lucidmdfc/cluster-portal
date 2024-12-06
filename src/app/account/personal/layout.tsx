'use client';


import AccountLayout from 'src/layouts/account';
// import MainLayout from 'src/layouts/main';
// ----------------------------------------------------------------------

type Props = {
  children: React.ReactNode;
};

export default function Layout({ children }: Props) {

  return <AccountLayout>{children}</AccountLayout>

}
