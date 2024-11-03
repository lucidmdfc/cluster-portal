import { NextRequest, NextResponse } from 'next/server';
import { authMiddleware, redirectToLogin } from 'next-firebase-auth-edge';

import { clientConfig, serverConfig } from 'src/lib/firebase/config';

const PUBLIC_PATHS = ['/auth/sign-in/', '/auth/sign-up/', '/'];
// always pay attention to the route you are trying to access they all end with '/'
// so you have to add '/' to the end of the route you are trying to access
export async function middleware(request: NextRequest) {
  console.log('Middleware', { pathname: request.nextUrl.pathname });
  return authMiddleware(request, {
    loginPath: '/api/login/',
    logoutPath: '/api/logout/',
    apiKey: clientConfig.apiKey,
    cookieName: serverConfig.cookieName,
    cookieSignatureKeys: serverConfig.cookieSignatureKeys,
    cookieSerializeOptions: serverConfig.cookieSerializeOptions,
    serviceAccount: serverConfig.serviceAccount,
    handleValidToken: async ({ token, decodedToken }, headers) => {
      // if (PUBLIC_PATHS.includes(request.nextUrl.pathname)) {
      //   return redirectToHome(request);
      // }
      console.log('Token is valid', { token, decodedToken });
      console.log('Headers', { headers });
      return NextResponse.next({ request: { headers } });
    },
    handleInvalidToken: async (reason) => {
      console.info('Missing or malformed credentials', { reason });
      return redirectToLogin(request, { path: '/auth/sign-in/', publicPaths: PUBLIC_PATHS });
    },
    handleError: async (error) => {
      console.error('Unhandled authentication error', { error });

      return redirectToLogin(request, { path: '/auth/sign-in/', publicPaths: PUBLIC_PATHS });
    },
  });
}
export const config = {
  matcher: ['/api/login/', '/api/logout/', '/jobs', '/((?!_next|api|.*\\.).*)'],
};
