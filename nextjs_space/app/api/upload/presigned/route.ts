export const dynamic = 'force-dynamic';

import { NextResponse } from 'next/server';
import { generatePresignedUploadUrl } from '@/lib/supabase-storage';
import { generatePresignedUploadUrl as generateS3UploadUrl } from '@/lib/s3';

export async function POST(request: Request) {
  try {
    const body = await request?.json?.();
    const fileName = body?.fileName ?? 'file';
    const contentType = body?.contentType ?? 'application/octet-stream';
    const isPublic = body?.isPublic ?? false;

    let uploadUrl: string;
    let cloudStoragePath: string;

    if (process.env.SUPABASE_URL) {
      const result = await generatePresignedUploadUrl(fileName, contentType, isPublic);
      uploadUrl = result.uploadUrl;
      cloudStoragePath = result.cloudStoragePath;
    } else {
      const result = await generateS3UploadUrl(fileName, contentType, isPublic);
      uploadUrl = result.uploadUrl;
      cloudStoragePath = result.cloud_storage_path;
    }

    return NextResponse.json({ uploadUrl, cloud_storage_path: cloudStoragePath });
  } catch (error: any) {
    console.error('Presigned URL error:', error);
    return NextResponse.json(
      { error: error?.message ?? 'Failed to generate upload URL' },
      { status: 500 }
    );
  }
}
