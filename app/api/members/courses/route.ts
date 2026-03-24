import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    // Para simplificar, estamos retornando todos os cursos para qualquer usuário logado.
    // Futuramente, isto pode ser filtrado por progresso ou assinaturas específicas.
    const courses = await prisma.course.findMany({
      include: {
        modules: {
          include: {
            lessons: {
              orderBy: { order: 'asc' }
            }
          },
          orderBy: { order: 'asc' }
        }
      },
      orderBy: { createdAt: 'desc' }
    });

    return NextResponse.json({ success: true, courses }, { status: 200 });
  } catch (error: any) {
    console.error('Erro ao buscar cursos para membros:', error);
    return NextResponse.json(
      { error: 'Erro interno ao buscar cursos.', details: error.message },
      { status: 500 }
    );
  }
}
