import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyAuth } from '@/lib/auth';

// Admin: Get all messages/comments
export async function GET(request: Request) {
  try {
    const payload = await verifyAuth(request);
    if (!payload || payload.role !== 'ADMIN') {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const filterRead = searchParams.get('read'); // optional: 'true', 'false'

    const comments = await prisma.comment.findMany({
      where: filterRead !== null ? { isRead: filterRead === 'true' } : {},
      orderBy: { createdAt: 'desc' },
      include: {
        user: { select: { name: true, email: true } },
        lesson: { 
          select: { 
            title: true, 
            module: { select: { course: { select: { title: true } } } } 
          } 
        },
      },
    });

    return NextResponse.json(comments);
  } catch (error) {
    console.error('Error fetching admin messages:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}

// Admin: Mark as read or reply
export async function PATCH(request: Request) {
  try {
    const payload = await verifyAuth(request);
    if (!payload || payload.role !== 'ADMIN') {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const { id, adminReply, isRead } = await request.json();

    if (!id) {
      return new NextResponse('Missing message ID', { status: 400 });
    }

    const updateData: any = {};
    if (adminReply !== undefined) updateData.adminReply = adminReply;
    if (isRead !== undefined) updateData.isRead = isRead;

    // If admin replies, automatically mark as read if not specified
    if (adminReply && isRead === undefined) {
      updateData.isRead = true;
    }

    const updatedComment = await prisma.comment.update({
      where: { id },
      data: updateData,
      include: {
        user: { select: { name: true } },
      },
    });

    return NextResponse.json(updatedComment);
  } catch (error) {
    console.error('Error updating comment/reply:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
