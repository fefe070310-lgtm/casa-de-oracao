import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, phone, city, interest, message } = body;

    // A validação de nome, email e interesse como obrigatórios
    if (!name || !email || !interest) {
      return NextResponse.json(
        { error: 'Nome, E-mail e Assunto são obrigatórios.' },
        { status: 400 }
      );
    }

    const lead = await prisma.lead.create({
      data: {
        name,
        email,
        phone: phone || null,
        city: city || null,
        interest,
        message: message || null,
      },
    });

    return NextResponse.json({ success: true, lead }, { status: 201 });
  } catch (error: any) {
    console.error('Erro ao salvar lead:', error);
    return NextResponse.json(
      { error: 'Erro interno ao tentar salvar a mensagem.' },
      { status: 500 }
    );
  }
}
