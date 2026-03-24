import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const events = await prisma.event.findMany({
      orderBy: { date: 'asc' },
    });

    return NextResponse.json(events);
  } catch (error: any) {
    console.error('Erro ao buscar eventos:', error);
    return NextResponse.json(
      { error: 'Erro interno ao buscar eventos.' },
      { status: 500 }
    );
  }
}
