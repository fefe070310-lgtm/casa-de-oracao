import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const totalLessons = await prisma.lesson.count();
    
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        city: true,
        role: true,
        createdAt: true,
        _count: {
          select: {
            progress: {
              where: { completed: true }
            }
          }
        }
      },
      orderBy: { createdAt: 'desc' },
    });

    const usersWithStats = users.map(user => ({
      ...user,
      totalLessons,
      completedLessons: user._count.progress,
    }));

    return NextResponse.json({ success: true, users: usersWithStats, totalPlatformLessons: totalLessons }, { status: 200 });
  } catch (error: any) {
    console.error('Erro ao buscar usuários:', error);
    return NextResponse.json(
      { error: 'Erro interno ao tentar buscar usuários.' },
      { status: 500 }
    );
  }
}
