import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    if (!id) {
      return NextResponse.json({ error: 'ID do módulo é obrigatório.' }, { status: 400 });
    }

    await prisma.module.delete({
      where: { id },
    });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error: any) {
    console.error('Erro ao deletar módulo:', error);
    return NextResponse.json(
      { error: 'Erro interno ao deletar módulo.', details: error.message },
      { status: 500 }
    );
  }
}
