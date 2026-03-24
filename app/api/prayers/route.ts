import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, telefone, pedido, isPublic } = body;

    if (!pedido) {
      return NextResponse.json(
        { error: 'O pedido de oração é obrigatório' },
        { status: 400 }
      );
    }

    const prayerRequest = await prisma.prayerRequest.create({
      data: {
        name: name || 'Anônimo',
        request: pedido,
        isPublic: isPublic || false,
        status: 'PENDING'
      },
    });

    return NextResponse.json(prayerRequest);
  } catch (error) {
    console.error('Error creating prayer request:', error);
    return NextResponse.json(
      { error: 'Erro ao enviar pedido de oração' },
      { status: 500 }
    );
  }
}
