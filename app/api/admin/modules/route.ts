import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(req: Request) {
  try {
    const { title, description, courseId, order } = await req.json();

    if (!title || !courseId) {
      return NextResponse.json(
        { error: 'Título e ID do curso são obrigatórios.' },
        { status: 400 }
      );
    }

    const module = await prisma.module.create({
      data: { title, description: description || '', courseId, order: order || 0 },
    });

    return NextResponse.json({ success: true, module }, { status: 201 });
  } catch (error: any) {
    console.error('Erro ao criar módulo:', error);
    return NextResponse.json(
      { error: 'Erro interno ao criar módulo.', details: error.message },
      { status: 500 }
    );
  }
}
