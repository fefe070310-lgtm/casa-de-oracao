import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyAuth } from '@/lib/auth';

export async function GET(
  req: Request,
  { params }: { params: Promise<{ lessonId: string }> }
) {
  try {
    const { lessonId } = await params;
    const user = await verifyAuth(req);
    if (!user) {
      return NextResponse.json({ error: 'Não autorizado' }, { status: 401 });
    }

    const lesson = await prisma.lesson.findUnique({
      where: { id: lessonId },
      include: {
        module: {
          include: {
            lessons: {
              orderBy: { order: 'asc' },
            }
          }
        }
      }
    });

    if (!lesson) {
      return NextResponse.json({ error: 'Aula não encontrada' }, { status: 404 });
    }

    // Buscar progresso do usuário
    const progress = await prisma.userProgress.findMany({
      where: { userId: user.id as string },
    });

    return NextResponse.json({ lesson, progress });
  } catch (error) {
    console.error('Erro ao buscar aula:', error);
    return NextResponse.json({ error: 'Erro interno' }, { status: 500 });
  }
}
