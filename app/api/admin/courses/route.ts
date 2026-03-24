import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const courses = await prisma.course.findMany({
      include: {
        modules: {
          include: {
            lessons: true,
          },
          orderBy: { order: 'asc' },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json({ success: true, courses }, { status: 200 });
  } catch (error: any) {
    console.error('Erro ao buscar cursos:', error);
    return NextResponse.json(
      { error: 'Erro interno ao buscar cursos.', details: error.message },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const { title, description, image } = await req.json();

    if (!title || !description) {
      return NextResponse.json(
        { error: 'Título e descrição são obrigatórios.' },
        { status: 400 }
      );
    }

    const course = await prisma.course.create({
      data: { title, description, image: image || null },
    });

    return NextResponse.json({ success: true, course }, { status: 201 });
  } catch (error: any) {
    console.error('Erro ao criar curso:', error);
    return NextResponse.json(
      { error: 'Erro interno ao criar curso.', details: error.message },
      { status: 500 }
    );
  }
}
