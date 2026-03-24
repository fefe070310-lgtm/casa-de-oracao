import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const totalMembers = await prisma.user.count({ where: { role: 'USER' } });
    const totalLeads = await prisma.lead.count();
    const pendingLeads = await prisma.lead.count({ where: { responded: false } });
    
    const donations = await prisma.donation.findMany();
    const totalRevenue = donations.reduce((sum: number, d: any) => sum + d.amount, 0);

    // Pedidos de oração
    const prayerCount = await prisma.prayerRequest.count();

    const recentUsers = await prisma.user.findMany({
      take: 3,
      orderBy: { createdAt: 'desc' },
      select: { id: true, name: true, createdAt: true }
    });

    const recentLeads = await prisma.lead.findMany({
      take: 3,
      orderBy: { createdAt: 'desc' },
      select: { id: true, name: true, interest: true, createdAt: true }
    });

    const activities = [
      ...recentUsers.map(u => ({ id: u.id, type: 'USER', title: 'Novo Membro', desc: `${u.name} se registrou`, time: u.createdAt })),
      ...recentLeads.map(l => ({ id: l.id, type: 'LEAD', title: 'Novo Lead', desc: `${l.name} - ${l.interest}`, time: l.createdAt }))
    ].sort((a, b) => new Date(b.time).getTime() - new Date(a.time).getTime()).slice(0, 5);

    return NextResponse.json({
      success: true,
      stats: {
        totalMembers,
        totalLeads,
        pendingLeads,
        totalRevenue,
        prayerCount
      },
      activities
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Erro ao buscar estatísticas' }, { status: 500 });
  }
}
