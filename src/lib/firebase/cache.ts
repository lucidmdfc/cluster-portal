import { unstable_cache } from 'next/cache';

export async function cacheMiddleware(userId: string) {
  // Step 1: Generate a unique cache key based on user ID
  const cacheKey = `jobs:${userId}`;

  // Step 2: Retrieve cached data from Next.js cache
  const cachedJobs = await unstable_cache(() => Promise.resolve(null), [cacheKey], {
    revalidate: 0,
  });

  // Step 3: If cached data is found, return it
  if (cachedJobs) {
    console.log('Using cached data:', cachedJobs);
    return cachedJobs;
  }

  // Step 4: If no cached data found, return null
  console.log('No cached data, returning null.');
  return null;
}
