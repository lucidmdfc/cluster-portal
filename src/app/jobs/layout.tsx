'use client';

import { useState, useEffect } from 'react';
// import { useRouter } from 'next/navigation';
// import { onAuthStateChanged } from 'firebase/auth';

import MainLayout from 'src/layouts/main';
// import { auth } from 'src/lib/firebase/firebaseSdk'; // Import your Firebase config
// import { paths } from 'src/routes/paths';
// ----------------------------------------------------------------------

type Props = {
  children: React.ReactNode;
};

export default function Layout({ children }: Props) {
  const [footerData, setFooterData] = useState(null);
  // const router = useRouter();

  // useEffect(() => {
  //   // Set up the onAuthStateChanged listener
  //   const unsubscribe = onAuthStateChanged(auth, (user) => {
  //     if (user) {
  //       console.log('User is signed in:', user);
  //       // You could fetch user data or set user state here
  //     } else {
  //       console.log('No user is signed in');
  //       // Redirect to login if user is not authenticated
  //       router.push(paths.loginCover);
  //     }
  //   });

  //   // Cleanup function to unsubscribe from the listener
  //   return () => unsubscribe();
  // }, [router]);

  useEffect(() => {
    // Fetch footer data from the API route
    async function fetchFooterData() {
      const res = await fetch('/api/footer');
      const data = await res.json();
      setFooterData(data);
    }

    fetchFooterData();
  }, []);

  return <MainLayout footerContent={footerData}>{children}</MainLayout>;
}
