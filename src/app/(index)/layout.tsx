'use client';

import { useState, useEffect } from 'react';

import MainLayout from 'src/layouts/main';
// ----------------------------------------------------------------------

type Props = {
  children: React.ReactNode;
};

export default function Layout({ children }: Props) {
  const [footerData, setFooterData] = useState(null);

  useEffect(() => {
    // Fetch footer data from the API route
    async function fetchFooterData() {
      const res = await fetch('/api/footer');
      const data = await res.json();
      setFooterData(data);
    }

    fetchFooterData();
  }, []);
  return (
        <MainLayout footerContent={footerData} headerOnDark>
          {children}
        </MainLayout>
  );
}
