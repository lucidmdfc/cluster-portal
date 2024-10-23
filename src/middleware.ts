import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { auth } from 'src/lib/firebase/firebaseSdk'; // Client SDK

export async function middleware(req: NextRequest) {
  try {
    // Step 1: Extract the Firebase token from the Authorization header
    const token = req.headers.get('authorization')?.split('Bearer ')[1];

    if (!token) {
      return NextResponse.json({ message: 'No token provided' }, { status: 401 });
    }

    // Step 2: Verify the token using Firebase Auth Client SDK
    const userCredential = await auth.signInWithCustomToken(token);
    const user = userCredential.user;

    if (!user) {
      throw new Error('User not authenticated');
    }

    // Step 3: Create a new NextResponse object and set a cookie with the user ID
    const response = NextResponse.next();
    response.cookies.set('user', ${user.uid}; Expires=${new Date(Date.now() + 2 * 60 * 60 * 1000).toUTCString()}; HttpOnly; Secure; SameSite=Lax);

    console.log('Authenticated User:', user.uid);

    return response;
  } catch (error) {
    console.error('Authentication Error:', error.message);
    return NextResponse.json({ message: 'Unauthorized', error: error.message }, { status: 401 });
  }
}

// Configuration for the middleware to specify which paths to match
export const config = {
  matcher: '/jobs', // Apply the middleware to /jobs
};
