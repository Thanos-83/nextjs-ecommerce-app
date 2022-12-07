import { NextRequest } from 'next/server';
import { NextResponse, userAgent } from 'next/server';

export async function middleware(req, res) {
  //   console.log(NextRequest.nextUrl);
  // const response = new NextResponse();
  // console.log(req.cookies);
  //   console.log(userAgent(req));
  //   const { device } = userAgent(req);
  //   console.log(device);
  //   return NextResponse.redirect(new URL('/v1/dashboard', req.url));
}

export const config = {
  matcher: ['/account', '/v1/dashboard'],
};
