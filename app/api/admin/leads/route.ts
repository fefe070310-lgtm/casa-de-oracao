import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const leads = await prisma.lead.findMany({
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json({ success: true, leads }, { status: 200 });
  } catch (error: any) {
    console.error('Erro ao buscar leads:', error);
    return NextResponse.json(
      { error: 'Erro interno ao tentar buscar leads.' },
      { status: 500 }
    );
  }
}
