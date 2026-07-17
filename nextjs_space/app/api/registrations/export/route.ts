export const dynamic = 'force-dynamic';

import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: Request) {
  try {
    const url = new URL(request?.url ?? 'http://localhost:3000');
    const password = url?.searchParams?.get?.('password') ?? '';

    if (password !== 'RadicalAdmin2026') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const registrations = await prisma.registration.findMany({
      orderBy: { createdAt: 'desc' },
    });

    const headers = [
      'ID', 'Created At', 'Project Name', 'Country', 'Participation Category', 'Founders',
      'North Star', 'Status Quo Challenge', 'What Building', 'What Makes Radical',
      'Has MVP', 'Has Users', 'Has Pilot', 'Has Revenue', 'Has Community', 'Has Research',
      'Key Metric', 'Demo Link', 'Frontier Question', 'Event Fit', 'How Did You Hear', 'How Did You Hear (Other)', 'How Did You Hear (Recommendation)', 'Contact Email', 'Contact Phone', 'File Names'
    ];

    const escapeCsv = (val: any): string => {
      const str = String(val ?? '');
      if (str?.includes?.(',') || str?.includes?.('"') || str?.includes?.('\n')) {
        return `"${str?.replace?.(/"/g, '""') ?? ''}"` ;
      }
      return str;
    };

    const rows = (registrations ?? [])?.map?.((r: any) => [
      r?.id ?? '',
      r?.createdAt ? new Date(r.createdAt).toISOString() : '',
      r?.projectName ?? '',
      r?.country ?? '',
      r?.participationCategory ?? '',
      r?.founders ?? '',
      r?.northStar ?? '',
      r?.statusQuoChallenge ?? '',
      r?.whatBuilding ?? '',
      r?.whatMakesRadical ?? '',
      r?.hasMvp ? 'Yes' : 'No',
      r?.hasUsers ? 'Yes' : 'No',
      r?.hasPilot ? 'Yes' : 'No',
      r?.hasRevenue ? 'Yes' : 'No',
      r?.hasCommunity ? 'Yes' : 'No',
      r?.hasResearch ? 'Yes' : 'No',
      r?.keyMetric ?? '',
      r?.demoLink ?? '',
      r?.frontierQuestion ?? '',
      r?.eventFit ?? '',
      Array.isArray(r?.howDidYouHear) ? r.howDidYouHear.join('; ') : '',
      r?.howDidYouHearOther ?? '',
      r?.howDidYouHearRecommendationDetail ?? '',
      r?.contactEmail ?? '',
      r?.contactPhone ?? '',
      Array.isArray(r?.evidenceFiles) ? r.evidenceFiles.map((f: any) => `${f?.docType ?? ''}: ${f?.fileName ?? ''}`).join('; ') : '',
    ]?.map?.(escapeCsv)?.join?.(',')) ?? [];

    const csv = [headers?.join?.(','), ...(rows ?? [])]?.join?.('\n');

    return new NextResponse(csv, {
      headers: {
        'Content-Type': 'text/csv; charset=utf-8',
        'Content-Disposition': `attachment; filename="radical-innovation-registrations-${new Date().toISOString()?.split?.('T')?.[0] ?? 'export'}.csv"`,
      },
    });
  } catch (error: any) {
    console.error('CSV export error:', error);
    return NextResponse.json(
      { error: error?.message ?? 'Export failed' },
      { status: 500 }
    );
  }
}
