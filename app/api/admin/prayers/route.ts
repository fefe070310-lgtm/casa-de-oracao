import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const prayers = await prisma.prayerRequest.findMany({
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json(prayers);
  } catch (error: any) {
    console.error('Erro ao buscar pedidos de oração:', error);
    return NextResponse.json(
      { error: 'Erro interno ao buscar pedidos de oração.' },
      { status: 500 }
    );
  }
}
