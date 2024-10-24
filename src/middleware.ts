import { NextRequest, NextResponse } from 'next/server';
import { authMiddleware, redirectToHome, redirectToLogin } from 'next-firebase-auth-edge';

import { clientConfig, serverConfig } from 'src/lib/firebase/config';

const PUBLIC_PATHS = ['/auth/sign-in', '/auth/sign-up'];
export async function middleware(request: NextRequest) {
  console.log('Middleware', { pathname: request.nextUrl.pathname });
  const cleanPath = request.nextUrl.pathname.replace(/\/$/, ''); // Normalize the path
  console.log('Clean Path:', cleanPath);

  // Check if the current path is in the public paths list
  if (PUBLIC_PATHS.includes(cleanPath)) {
    return NextResponse.next(); // Let the request through, no redirection needed
  }
  return authMiddleware(request, {
    loginPath: '/api/login',
    logoutPath: '/api/logout',
    apiKey: clientConfig.apiKey,
    cookieName: serverConfig.cookieName,
    cookieSignatureKeys: serverConfig.cookieSignatureKeys,
    cookieSerializeOptions: serverConfig.cookieSerializeOptions,
    serviceAccount: serverConfig.serviceAccount,
    handleValidToken: async ({ token, decodedToken }, headers) => {
      if (PUBLIC_PATHS.includes(cleanPath)) {
        return redirectToHome(request);
      }
      return NextResponse.next({ request: { headers } });
    },
    handleInvalidToken: async (reason) => {
      console.info('Missing or malformed credentials', { reason });
      return redirectToLogin(request, { path: '/auth/sign-in', publicPaths: PUBLIC_PATHS });
    },
    handleError: async (error) => {
      console.error('Unhandled authentication error', { error });

      return redirectToLogin(request, { path: '/auth/sign-in', publicPaths: PUBLIC_PATHS });
    },
  });
}
export const config = { matcher: ['/', '/((?!_next|api|.*\\.).*)', '/api/login', '/api/logout'] };
