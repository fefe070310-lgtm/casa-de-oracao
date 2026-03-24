import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(req: Request) {
  try {
    const { title, description, videoUrl, moduleId, order, allowDownload, pdfUrl, materialsUrl } = await req.json();

    if (!title || !moduleId) {
      return NextResponse.json(
        { error: 'Título e ID do módulo são obrigatórios.' },
        { status: 400 }
      );
    }

    const lesson = await prisma.lesson.create({
      data: {
        title,
        description: description || '',
        videoUrl: videoUrl || '',
        moduleId,
        order: order || 0,
        allowDownload: allowDownload || false,
        pdfUrl: pdfUrl || '',
        materialsUrl: materialsUrl || '',
      },
    });

    return NextResponse.json({ success: true, lesson }, { status: 201 });
  } catch (error: any) {
    console.error('Erro ao criar aula:', error);
    return NextResponse.json(
      { error: 'Erro interno ao criar aula.', details: error.message },
      { status: 500 }
    );
  }
}
