import { NextResponse } from 'next/server';

export function middleware(request) {
  const isLoggedIn = request.cookies.get('token'); // ganti 'token' sesuai nama cookie auth kamu
  const { pathname } = request.nextUrl;

  // Jika user sudah login, redirect dari /login ke /dashboard
  if (pathname === '/' && isLoggedIn) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  // Jika user belum login, redirect dari /dashboard ke /login
  if (pathname.startsWith('/dashboard') && !isLoggedIn) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  // Lanjutkan ke halaman yang diminta
  return NextResponse.next();
}