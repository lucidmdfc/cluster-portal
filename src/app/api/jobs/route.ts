import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server'; // Added NextRequest import
import { middleware } from 'src/middleware'; // Verify user token
import { cacheMiddleware } from 'src/lib/firebase/cache'; // Check for cached jobs
import { redirectMiddleware } from 'src/data/redirect'; // Redirect unauthorized users
import { unstable_cache } from 'next/cache'; // Import unstable_cache function

export async function GET(req: NextRequest) {
  // Step 1: Authenticate user
  const authResult = await middleware(req);
  if (!authResult?.user) return authResult; // Return error if not authenticated

  const { user } = authResult;

  // Step 2: Check for cached jobs
  const cachedJobs = cacheMiddleware(user.id);
  if (cachedJobs) {
    return NextResponse.json(cachedJobs, { status: 200 }); // Return cached data
  }

  // Step 3: Handle redirection based on user role
  const redirectResult = redirectMiddleware(user, req);
  if (redirectResult) return redirectResult;

  try {
    // Step 4: Fetch jobs for authenticated user
    const jobs = await fetchJobsForUser(user.id);

    // Step 5: Cache jobs for future requestq
    const jobsUser = await unstable_cache(() => Promise.resolve(jobs), [`jobs:${user.id}`], {
      revalidate: 60 * 60 * 2,
    }); // Cache for 2 hours
    // Step 6: Return the job listings
    return NextResponse.json(jobs, { status: 200 });
  } catch (error) {
    // Step 7: Handle errors during data fetching
    console.error('Error fetching jobs:', error.message);
    return NextResponse.json(
      { message: 'Internal Server Error', error: error.message },
      { status: 500 }
    );
  }
}
