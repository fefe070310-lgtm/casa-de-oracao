import { NextResponse } from 'next/server';
import { signToken } from '@/lib/auth';

export async function POST() {
  // ATENÇÃO: Esta é uma rota de desenvolvimento!
  // Em produção, isso deve ser removido ou protegido.
  try {
    const payload = {
      id: 'bypass-id',
      email: 'admin@bypass.com',
      role: 'ADMIN',
      name: 'Admin Quick Access',
    };

    const token = await signToken(payload);

    const response = NextResponse.json(
      { success: true },
      { status: 200 }
    );

    response.cookies.set({
      name: 'auth_token',
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60,
      path: '/',
    });

    return response;
  } catch (error) {
    return NextResponse.json({ error: 'Erro ao pular login' }, { status: 500 });
  }
}
