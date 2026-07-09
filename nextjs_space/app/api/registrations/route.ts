export const dynamic = 'force-dynamic';

import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    const body = await request?.json?.();

    // Validate required fields
    const requiredFields = [
      'projectName', 'country', 'participationCategory', 'founders',
      'northStar', 'statusQuoChallenge', 'whatBuilding', 'whatMakesRadical',
      'keyMetric', 'demoLink', 'frontierQuestion', 'eventFit', 'contactEmail'
    ];

    for (const field of requiredFields) {
      if (!(body?.[field] ?? '')?.toString?.()?.trim?.()) {
        return NextResponse.json({ error: `Missing field: ${field}` }, { status: 400 });
      }
    }

    // Create registration
    const registration = await prisma.registration.create({
      data: {
        projectName: (body?.projectName ?? '')?.trim?.() ?? '',
        country: (body?.country ?? '')?.trim?.() ?? '',
        participationCategory: body?.participationCategory ?? '',
        founders: (body?.founders ?? '')?.trim?.() ?? '',
        northStar: (body?.northStar ?? '')?.trim?.() ?? '',
        statusQuoChallenge: (body?.statusQuoChallenge ?? '')?.trim?.() ?? '',
        whatBuilding: (body?.whatBuilding ?? '')?.trim?.() ?? '',
        whatMakesRadical: (body?.whatMakesRadical ?? '')?.trim?.() ?? '',
        hasMvp: !!body?.hasMvp,
        hasUsers: !!body?.hasUsers,
        hasPilot: !!body?.hasPilot,
        hasRevenue: !!body?.hasRevenue,
        hasCommunity: !!body?.hasCommunity,
        hasResearch: !!body?.hasResearch,
        keyMetric: (body?.keyMetric ?? '')?.trim?.() ?? '',
        demoLink: (body?.demoLink ?? '')?.trim?.() ?? '',
        frontierQuestion: (body?.frontierQuestion ?? '')?.trim?.() ?? '',
        eventFit: (body?.eventFit ?? '')?.trim?.() ?? '',
        contactEmail: (body?.contactEmail ?? '')?.trim?.()?.toLowerCase?.() ?? '',
        fileCloudStoragePath: body?.fileCloudStoragePath ?? null,
        fileIsPublic: !!body?.fileIsPublic,
        fileName: body?.fileName ?? null,
      },
    });

    // Send email notification (non-blocking)
    sendNotification(registration).catch((err: any) => {
      console.error('Notification error (non-blocking):', err);
    });

    return NextResponse.json({ success: true, id: registration?.id ?? '' });
  } catch (error: any) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { error: error?.message ?? 'Failed to save registration' },
      { status: 500 }
    );
  }
}

async function sendNotification(reg: any) {
  try {
    const appUrl = process.env.NEXTAUTH_URL ?? 'http://localhost:3000';
    let appName = 'Radical Innovation';
    try { appName = new URL(appUrl)?.hostname?.split?.('.')?.[0] ?? 'Radical Innovation'; } catch {}

    const htmlBody = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #0a0e1a; color: #e2e8f0; padding: 30px; border-radius: 12px;">
        <h2 style="color: #22d3ee; border-bottom: 2px solid #22d3ee; padding-bottom: 12px; margin-bottom: 20px;">
          Nueva Aplicaci\u00f3n: ${reg?.projectName ?? 'Unknown'}
        </h2>
        <div style="background: #111827; padding: 20px; border-radius: 8px; margin: 15px 0;">
          <p style="margin: 8px 0;"><strong style="color: #22d3ee;">Proyecto:</strong> ${reg?.projectName ?? ''}</p>
          <p style="margin: 8px 0;"><strong style="color: #22d3ee;">Categor\u00eda:</strong> ${reg?.participationCategory ?? ''}</p>
          <p style="margin: 8px 0;"><strong style="color: #22d3ee;">Pa\u00eds:</strong> ${reg?.country ?? ''}</p>
          <p style="margin: 8px 0;"><strong style="color: #22d3ee;">Email:</strong> <a href="mailto:${reg?.contactEmail ?? ''}" style="color: #a78bfa;">${reg?.contactEmail ?? ''}</a></p>
          <p style="margin: 8px 0;"><strong style="color: #22d3ee;">Fundadores:</strong> ${reg?.founders ?? ''}</p>
          <p style="margin: 8px 0;"><strong style="color: #22d3ee;">Demo:</strong> <a href="${reg?.demoLink ?? '#'}" style="color: #a78bfa;">${reg?.demoLink ?? ''}</a></p>
        </div>
        <div style="background: #111827; padding: 20px; border-radius: 8px; margin: 15px 0;">
          <h3 style="color: #22d3ee; margin-top: 0;">North Star</h3>
          <p style="margin: 8px 0;">${reg?.northStar ?? ''}</p>
          <h3 style="color: #22d3ee;">M\u00e9trica clave</h3>
          <p style="margin: 8px 0;">${reg?.keyMetric ?? ''}</p>
        </div>
        <p style="color: #64748b; font-size: 12px; margin-top: 20px;">Enviado: ${new Date().toLocaleString('es-MX')}</p>
      </div>
    `;

    let senderEmail = 'noreply@mail.abacusai.app';
    try { senderEmail = `noreply@${new URL(appUrl)?.hostname}`; } catch {}

    await fetch('https://apps.abacus.ai/api/sendNotificationEmail', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        deployment_token: process.env.ABACUSAI_API_KEY ?? '',
        app_id: process.env.WEB_APP_ID ?? '',
        notification_id: process.env.NOTIF_ID_NEW_REGISTRATION_SUBMISSION ?? '',
        subject: `[Radical Innovation] Nueva aplicaci\u00f3n: ${reg?.projectName ?? 'Unknown'}`,
        body: htmlBody,
        is_html: true,
        recipient_email: 'amayaandres95@gmail.com',
        reply_to: reg?.contactEmail ?? '',
        sender_email: senderEmail,
        sender_alias: 'Radical Innovation',
      }),
    });
  } catch (err: any) {
    console.error('Send notification error:', err);
  }
}

export async function GET(request: Request) {
  try {
    const url = new URL(request?.url ?? 'http://localhost:3000');
    const password = url?.searchParams?.get?.('password') ?? '';

    if (password !== 'RadicalAdmin2026') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const search = url?.searchParams?.get?.('search') ?? '';
    const type = url?.searchParams?.get?.('type') ?? '';
    const page = parseInt(url?.searchParams?.get?.('page') ?? '1', 10) || 1;
    const limit = parseInt(url?.searchParams?.get?.('limit') ?? '20', 10) || 20;

    const where: any = {};
    if (type && type !== 'all') {
      where.participationCategory = type;
    }
    if (search) {
      where.OR = [
        { projectName: { contains: search } },
        { country: { contains: search } },
        { contactEmail: { contains: search } },
        { founders: { contains: search } },
      ];
    }

    const [registrations, total] = await Promise.all([
      prisma.registration.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.registration.count({ where }),
    ]);

    return NextResponse.json({
      registrations: registrations ?? [],
      total: total ?? 0,
      page,
      totalPages: Math.ceil((total ?? 0) / limit),
    });
  } catch (error: any) {
    console.error('GET registrations error:', error);
    return NextResponse.json(
      { error: error?.message ?? 'Failed to fetch registrations' },
      { status: 500 }
    );
  }
}
