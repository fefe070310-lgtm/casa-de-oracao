import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';
import { signToken } from '@/lib/auth';

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: 'E-mail e senha são obrigatórios.' },
        { status: 400 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return NextResponse.json(
        { error: 'Credenciais inválidas.' },
        { status: 401 }
      );
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return NextResponse.json(
        { error: 'Credenciais inválidas.' },
        { status: 401 }
      );
    }

    // Criar payload
    const payload = {
      id: user.id,
      email: user.email,
      role: user.role,
      name: user.name,
    };

    const token = await signToken(payload);

    const response = NextResponse.json(
      { success: true, user: payload },
      { status: 200 }
    );

    // Salvar token num cookie
    response.cookies.set({
      name: 'auth_token',
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60, // 7 days
      path: '/',
    });

    return response;
  } catch (error: any) {
    console.error('Erro ao fazer login:', error);
    return NextResponse.json(
      { error: 'Erro interno ao tentar fazer login.' },
      { status: 500 }
    );
  }
}
