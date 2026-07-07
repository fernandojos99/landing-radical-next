export const dynamic = 'force-dynamic';

import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getFileUrl } from '@/lib/s3';
import { getPublicUrl, createSignedUrl } from '@/lib/supabase-storage';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const url = new URL(request?.url ?? 'http://localhost:3000');
    const password = url?.searchParams?.get?.('password') ?? '';

    if (password !== 'RadicalAdmin2026') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const registration = await prisma.registration.findUnique({
      where: { id: params?.id ?? '' },
    });

    if (!registration?.fileCloudStoragePath) {
      return NextResponse.json({ error: 'No file' }, { status: 404 });
    }

    let fileUrl: string;
    const isPublic = registration?.fileIsPublic ?? false;

    if (process.env.SUPABASE_URL) {
      fileUrl = isPublic
        ? getPublicUrl(registration.fileCloudStoragePath)
        : await createSignedUrl(registration.fileCloudStoragePath);
    } else {
      fileUrl = await getFileUrl(registration.fileCloudStoragePath, isPublic);
    }

    return NextResponse.json({ fileUrl });
  } catch (error: any) {
    console.error('File URL error:', error);
    return NextResponse.json(
      { error: error?.message ?? 'Failed to get file URL' },
      { status: 500 }
    );
  }
}
