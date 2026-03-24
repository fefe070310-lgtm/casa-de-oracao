import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';
import { signToken } from '@/lib/auth';

export async function POST(req: Request) {
  try {
    const { name, email, password, phone, city } = await req.json();

    if (!name || !email || !password) {
      return NextResponse.json(
        { error: 'Nome, e-mail e senha são obrigatórios.' },
        { status: 400 }
      );
    }

    // Verificar se o usuário já existe
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: 'Este e-mail já está em uso.' },
        { status: 400 }
      );
    }

    // Hash da senha
    const hashedPassword = await bcrypt.hash(password, 10);

    // Criar usuário
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        phone,
        city,
        role: 'USER', // Padrão para novos registros
      },
    });

    // Criar payload para o token
    const payload = {
      id: user.id,
      email: user.email,
      role: user.role,
      name: user.name,
    };

    const token = await signToken(payload);

    const response = NextResponse.json(
      { success: true, user: payload },
      { status: 201 }
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
    console.error('Erro ao registrar usuário:', error);
    return NextResponse.json(
      { error: 'Erro interno ao tentar criar conta.' },
      { status: 500 }
    );
  }
}
