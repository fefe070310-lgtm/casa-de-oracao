import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyAuth } from '@/lib/auth';

export async function GET(request: Request) {
  try {
    const payload = await verifyAuth(request);
    if (!payload || !payload.userId) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const userId = payload.userId as string;

    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      return new NextResponse('User not found', { status: 404 });
    }

    const { searchParams } = new URL(request.url);
    const lessonId = searchParams.get('lessonId');

    if (!lessonId) {
      return new NextResponse('Lesson ID is required', { status: 400 });
    }

    // Alunos só podem ver seus próprios comentários daquela aula (é um chat com o admin)
    const comments = await prisma.comment.findMany({
      where: {
        lessonId,
        userId: user.id,
      },
      orderBy: {
        createdAt: 'asc',
      },
      include: {
        user: {
          select: { name: true },
        },
      },
    });

    return NextResponse.json(comments);
  } catch (error) {
    console.error('Error fetching comments:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const payload = await verifyAuth(request);
    if (!payload || !payload.userId) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const userId = payload.userId as string;

    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      return new NextResponse('User not found', { status: 404 });
    }

    const body = await request.json();
    const { text, lessonId } = body;

    if (!text || !lessonId) {
      return new NextResponse('Missing required fields', { status: 400 });
    }

    const comment = await prisma.comment.create({
      data: {
        text,
        lessonId,
        userId: user.id,
        isRead: false,
      },
      include: {
        user: {
          select: { name: true },
        },
      },
    });

    return NextResponse.json(comment);
  } catch (error) {
    console.error('Error creating comment:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
