import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const events = await prisma.event.findMany({
      include: {
        registrations: true,
      },
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json({ success: true, events }, { status: 200 });
  } catch (error: any) {
    console.error('Erro ao buscar eventos:', error);
    return NextResponse.json(
      { error: 'Erro interno ao buscar eventos.' },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const { title, description, date, time, location, type } = await req.json();

    if (!title || !description || !date || !time || !location) {
      return NextResponse.json(
        { error: 'Título, descrição, data, horário e local são obrigatórios.' },
        { status: 400 }
      );
    }

    const event = await prisma.event.create({
      data: { title, description, date, time, location, type: type || 'Culto' },
    });

    return NextResponse.json({ success: true, event }, { status: 201 });
  } catch (error: any) {
    console.error('Erro ao criar evento:', error);
    return NextResponse.json(
      { error: 'Erro interno ao criar evento.' },
      { status: 500 }
    );
  }
}
