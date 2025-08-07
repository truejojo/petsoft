// import { NextResponse } from 'next/server';

// tmp
import { auth } from './lib/auth';

// export const middleware = (request: Request) => {
//   console.log(request.url);

//   return NextResponse.next();
// };

// tmp
export default auth;

// import { NextResponse } from 'next/server';
// import type { NextRequest } from 'next/server';

// export async function middleware(request: NextRequest) {
//   const { pathname } = request.nextUrl;

//   // Erlaube immer den Zugriff auf /login (und ggf. /signup)
//   if (
//     pathname.startsWith('/login') ||
//     pathname.startsWith('/signup') ||
//     pathname.startsWith('/api/auth')
//   ) {
//     return NextResponse.next();
//   }

//   const token =
//     request.cookies.get('next-auth.session-token')?.value ||
//     request.cookies.get('__Secure-next-auth.session-token')?.value;

//   // Zugriffsschutz für /app
//   if (!token && pathname.startsWith('/app')) {
//     return NextResponse.redirect(new URL('/login', request.url));
//   }

//   return NextResponse.next();
// }

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
  ],
};
