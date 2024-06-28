import prisma from '@/db';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    return NextResponse.json(null, { status: 401 });
  }

  const count = await prisma.like.count({
    where: {
      userId: session.user.id,
    },
  });
  const { searchParams } = new URL(req.url);
  const page = searchParams.get('page') as string;
  const limit = searchParams.get('limit') as string;
  const skipPage = parseInt(page) - 1;

  const likes = await prisma.like.findMany({
    orderBy: { createdAt: 'desc' },
    where: {
      userId: session.user.id,
    },
    include: {
      store: true,
    },
    skip: skipPage * parseInt(limit),
    take: parseInt(limit),
  });

  return NextResponse.json(
    {
      data: likes,
      page: parseInt(page),
      totalPage: Math.ceil(count / parseInt(limit)),
    },
    {
      status: 200,
    },
  );
}

export async function POST(req: Request) {
  const formData = await req.json();

  const session = await getServerSession(authOptions);

  if (!session?.user) {
    return NextResponse.json(null, { status: 401 });
  }

  let like = await prisma.like.findFirst({
    where: {
      storeId: formData.storeId,
      userId: session?.user?.id,
    },
  });

  if (like) {
    like = await prisma.like.delete({
      where: { id: like.id },
    });

    return NextResponse.json(like, { status: 200 });
  } else {
    like = await prisma.like.create({
      data: {
        storeId: formData.storeId,
        userId: session?.user?.id,
      },
    });

    return NextResponse.json(like, { status: 201 });
  }
}
