import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
// Added NextRequest import

export function redirectMiddleware(user: any, req: NextRequest) {
  // Step 1: Check if the user has the required role (e.g., "employer")
  if (user.role !== 'employer') {
    // Step 2: Redirect unauthorized users to the dashboard
    console.log('Redirecting User:', user.username);
    return NextResponse.redirect(new URL('/dashboard', req.url)); // Ensure req is passed to access URL
  }
  return NextResponse.next(); // Continue to the next middleware
}
