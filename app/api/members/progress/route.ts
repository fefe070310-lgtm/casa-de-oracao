import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyAuth } from '@/lib/auth';

export async function GET(req: Request) {
  try {
    const user = await verifyAuth(req);
    if (!user) {
      return NextResponse.json({ error: 'Não autorizado' }, { status: 401 });
    }

    const progress = await prisma.userProgress.findMany({
      where: { userId: user.id as string },
      include: { lesson: true },
    });

    return NextResponse.json({ progress });
  } catch (error) {
    return NextResponse.json({ error: 'Erro ao buscar progresso' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const user = await verifyAuth(req);
    if (!user) {
      return NextResponse.json({ error: 'Não autorizado' }, { status: 401 });
    }

    const { lessonId } = await req.json();

    if (!lessonId) {
      return NextResponse.json({ error: 'lessonId é obrigatório' }, { status: 400 });
    }

    const progress = await prisma.userProgress.upsert({
      where: {
        userId_lessonId: {
          userId: user.id as string,
          lessonId,
        },
      },
      update: {
        completed: true,
      },
      create: {
        userId: user.id as string,
        lessonId,
        completed: true,
      },
    });

    return NextResponse.json({ success: true, progress });
  } catch (error) {
    console.error('Erro ao salvar progresso:', error);
    return NextResponse.json({ error: 'Erro ao salvar progresso' }, { status: 500 });
  }
}
