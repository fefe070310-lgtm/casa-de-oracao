import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const donations = await prisma.donation.findMany({
      include: {
        user: {
          select: { name: true, email: true },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    // Calcular totais
    const totalAmount = donations.reduce((sum: number, d) => sum + d.amount, 0);
    const thisMonth = donations.filter((d) => {
      const now = new Date();
      const donationDate = new Date(d.createdAt);
      return donationDate.getMonth() === now.getMonth() && donationDate.getFullYear() === now.getFullYear();
    });
    const monthlyTotal = thisMonth.reduce((sum: number, d) => sum + d.amount, 0);

    // Calcular estatísticas mensais (últimos 6 meses) para o gráfico
    const chartData = [];
    const now = new Date();
    for (let i = 5; i >= 0; i--) {
      const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const monthLabel = d.toLocaleString('pt-BR', { month: 'short' });
      const monthVal = d.getMonth();
      const yearVal = d.getFullYear();

      const monthAmount = donations
        .filter(don => {
          const donDate = new Date(don.createdAt);
          return donDate.getMonth() === monthVal && donDate.getFullYear() === yearVal;
        })
        .reduce((sum: number, don) => sum + don.amount, 0);

      chartData.push({ month: monthLabel.charAt(0).toUpperCase() + monthLabel.slice(1).replace('.', ''), value: monthAmount });
    }

    return NextResponse.json({
      success: true,
      donations,
      chartData,
      stats: {
        totalAmount,
        monthlyTotal,
        totalDonations: donations.length,
        monthlyDonations: thisMonth.length,
      },
    }, { status: 200 });
  } catch (error: any) {
    console.error('Erro ao buscar doações:', error);
    return NextResponse.json(
      { error: 'Erro interno ao buscar doações.' },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const { amount, type, donorName, userId } = await req.json();

    if (!amount || !type) {
      return NextResponse.json(
        { error: 'Valor e tipo de doação são obrigatórios.' },
        { status: 400 }
      );
    }

    const donation = await prisma.donation.create({
      data: {
        amount: parseFloat(amount),
        type,
        donorName: donorName || null,
        userId: userId || null,
      },
    });

    return NextResponse.json({ success: true, donation }, { status: 201 });
  } catch (error: any) {
    console.error('Erro ao registrar doação:', error);
    return NextResponse.json(
      { error: 'Erro interno ao registrar doação.' },
      { status: 500 }
    );
  }
}
