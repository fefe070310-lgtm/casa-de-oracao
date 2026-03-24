import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const course = await prisma.course.findUnique({
      where: { id },
      include: {
        modules: {
          include: {
            lessons: true,
          },
          orderBy: { order: 'asc' },
        },
      },
    });

    if (!course) {
      return NextResponse.json({ error: 'Curso não encontrado.' }, { status: 404 });
    }

    return NextResponse.json({ success: true, course }, { status: 200 });
  } catch (error: any) {
    console.error('Erro ao buscar curso:', error);
    return NextResponse.json(
      { error: 'Erro interno ao buscar curso.', details: error.message },
      { status: 500 }
    );
  }
}

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const { title, description, image } = await req.json();

    const course = await prisma.course.update({
      where: { id },
      data: { title, description, image },
    });

    return NextResponse.json({ success: true, course }, { status: 200 });
  } catch (error: any) {
    console.error('Erro ao atualizar curso:', error);
    return NextResponse.json(
      { error: 'Erro interno ao atualizar curso.', details: error.message },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await prisma.course.delete({ where: { id } });
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error: any) {
    console.error('Erro ao deletar curso:', error);
    return NextResponse.json(
      { error: 'Erro interno ao deletar curso.', details: error.message },
      { status: 500 }
    );
  }
}
