import { NextRequest } from 'next/server';
import { NextResponse, userAgent } from 'next/server';
import nextSession from 'next-session';
export default async function middleware(req) {
  const res = NextResponse.next();
  const getSession = nextSession();

  const x = await getSession(req, res);
  x.user = {
    name: 'thanos',
    cart: { items: [] },
  };
  console.log('next session: ', x);

  const COOKIE_NAME = 'ecommerce_guest_cart_id';
  const AUTH_USER_SESSION = 'next-auth.session-token';
  // const AUTH_USER_SESSION = 'next-auth.csrf-token';
  const auth_user = req.cookies.get(AUTH_USER_SESSION);
  res.cookies.set('test cookie', 'this is a test cookie...');
  // console.log('request middleware: ', res);
  if (req.nextUrl.pathname.startsWith('/v1/dashboard')) {
    console.log('iam in the dashboard...');
    console.log(req.cookies);
  }

  if (auth_user) {
    res.cookies.set(COOKIE_NAME, 'some-gest-user-session-id', {
      path: '/',
      maxAge: 0,
      httpOnly: true,
      sameSite: 'strict',
    });
  }

  if (!auth_user) {
    res.cookies.set(COOKIE_NAME, 'gest-user-session-id', {
      path: '/',
      maxAge: 10,
      httpOnly: true,
      sameSite: 'strict',
    });
  }

  // console.log('Auth User: ', auth_user);
  console.log('Gest User: ', res.cookies.get(COOKIE_NAME));
  return res;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|favicon.ico).*)',
    // '/v1/dashboard',
  ],
};
