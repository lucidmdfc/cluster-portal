import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

import { paths } from 'src/routes/paths';

import { adminAuth } from 'src/lib/firebase/firebaseAdmin';
// Import the admin auth
// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  console.log('Middleware running for:', request.url);
  const { cookies } = request;
  // Check for a session cookie
  const sessionCookie = cookies.get('session')?.value;

  if (!sessionCookie) {
    console.log('No session cookie found');
    return NextResponse.redirect(new URL(paths.loginCover, request.url)); // Redirect to login if no session
  }
  try {
    // Verify the session cookie using Firebase Admin SDK
    const decodedClaims = await adminAuth.verifySessionCookie(sessionCookie, true);
    console.log('Session verified:', decodedClaims);
    // Proceed with the request
    return NextResponse.next();
  } catch (error) {
    console.log('Session invalid or expired:', error);
    // If the session cookie is invalid, redirect to login
    return NextResponse.redirect(new URL(paths.loginCover, request.url));
  }
}

//  See "Matching Paths" below to learn more
export const config = {
  matcher: '/jobs',
};
