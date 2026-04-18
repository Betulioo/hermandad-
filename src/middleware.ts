import { NextRequest, NextResponse } from 'next/server';

const TOKEN_COOKIE = 'auth_token';
const ROLE_COOKIE = 'auth_role';

export function middleware(request: NextRequest): NextResponse {
  const token = request.cookies.get(TOKEN_COOKIE)?.value;

  if (!token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  const role = request.cookies.get(ROLE_COOKIE)?.value;

  if (role !== 'ADMIN') {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
