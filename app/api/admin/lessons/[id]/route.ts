import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    if (!id) {
      return NextResponse.json({ error: 'ID da aula é obrigatório.' }, { status: 400 });
    }

    await prisma.lesson.delete({
      where: { id },
    });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error: any) {
    console.error('Erro ao deletar aula:', error);
    return NextResponse.json(
      { error: 'Erro interno ao deletar aula.', details: error.message },
      { status: 500 }
    );
  }
}
