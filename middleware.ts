import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifyToken } from './lib/auth';

export async function middleware(request: NextRequest) {
  const adminPanelPaths = ['/admin', '/admin/usuarios', '/admin/leads', '/admin/cursos', '/admin/eventos', '/admin/financeiro', '/admin/configuracoes'];
  const { pathname } = request.nextUrl;

  // Se o usuário está tentando acessar o painel de admin, mas não em rotas públicas do admin como /admin/login
  if (adminPanelPaths.some(path => pathname === path || pathname.startsWith(`${path}/`)) && pathname !== '/admin/login') {
    const token = request.cookies.get('auth_token')?.value;

    if (!token) {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }

    try {
      const payload = await verifyToken(token);
      
      if (!payload || payload.role !== 'ADMIN') {
        return NextResponse.redirect(new URL('/admin/login', request.url));
      }
    } catch (error) {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
  }

  // Se o usuário tentar acessar areas dos membros
  if (pathname.startsWith('/membros') && pathname !== '/membros/login' && pathname !== '/membros/registro') {
    const token = request.cookies.get('auth_token')?.value;

    if (!token) {
      return NextResponse.redirect(new URL('/membros/login', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/membros/:path*'],
};
