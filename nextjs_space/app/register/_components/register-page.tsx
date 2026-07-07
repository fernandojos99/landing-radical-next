'use client';

import { useState } from 'react';
import { useLocale } from '@/lib/locale-context';
import { Navbar } from '@/app/_components/navbar';
import { Footer } from '@/app/_components/footer';
import { Container } from '@/components/layouts/container';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { FadeIn, SlideIn } from '@/components/ui/animate';
import { toast } from 'sonner';
import {
  ArrowLeft,
  ArrowRight,
  Upload,
  CheckCircle2,
  Sparkles,
  Lightbulb,
  Wrench,
  FlaskConical,
  Brain,
  Handshake,
  User,
  X,
} from 'lucide-react';
import Link from 'next/link';

interface FormData {
  projectName: string;
  country: string;
  projectType: string;
  founders: string;
  northStar: string;
  statusQuoChallenge: string;
  whatBuilding: string;
  whatMakesRadical: string;
  hasMvp: boolean;
  hasUsers: boolean;
  hasPilot: boolean;
  hasRevenue: boolean;
  hasCommunity: boolean;
  hasResearch: boolean;
  keyMetric: string;
  demoLink: string;
  frontierQuestion: string;
  eventFit: string;
  contactEmail: string;
}

const initialFormData: FormData = {
  projectName: '',
  country: '',
  projectType: '',
  founders: '',
  northStar: '',
  statusQuoChallenge: '',
  whatBuilding: '',
  whatMakesRadical: '',
  hasMvp: false,
  hasUsers: false,
  hasPilot: false,
  hasRevenue: false,
  hasCommunity: false,
  hasResearch: false,
  keyMetric: '',
  demoLink: '',
  frontierQuestion: '',
  eventFit: '',
  contactEmail: '',
};

export function RegisterPage() {
  const { t } = useLocale();
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [file, setFile] = useState<File | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const totalSteps = 6;

  const updateField = (field: keyof FormData, value: any) => {
    setFormData((prev: FormData) => ({ ...(prev ?? {}), [field]: value }));
    setErrors((prev: Record<string, string>) => {
      const next = { ...(prev ?? {}) };
      delete next[field];
      return next;
    });
  };

  const validateStep = (stepIdx: number): boolean => {
    const newErrors: Record<string, string> = {};
    const req = t?.form?.required ?? 'Required';

    switch (stepIdx) {
      case 0:
        if (!(formData?.projectName ?? '')?.trim?.()) newErrors.projectName = req;
        if (!(formData?.country ?? '')?.trim?.()) newErrors.country = req;
        if (!(formData?.projectType ?? '')) newErrors.projectType = req;
        if (!(formData?.founders ?? '')?.trim?.()) newErrors.founders = req;
        break;
      case 1:
        if (!(formData?.northStar ?? '')?.trim?.()) newErrors.northStar = req;
        if (!(formData?.statusQuoChallenge ?? '')?.trim?.()) newErrors.statusQuoChallenge = req;
        break;
      case 2:
        if (!(formData?.whatBuilding ?? '')?.trim?.()) newErrors.whatBuilding = req;
        if (!(formData?.whatMakesRadical ?? '')?.trim?.()) newErrors.whatMakesRadical = req;
        break;
      case 3: {
        const hasAny = formData?.hasMvp || formData?.hasUsers || formData?.hasPilot || formData?.hasRevenue || formData?.hasCommunity || formData?.hasResearch;
        if (!hasAny) newErrors.evidence = t?.form?.selectEvidence ?? 'Select at least one';
        if (!(formData?.keyMetric ?? '')?.trim?.()) newErrors.keyMetric = req;
        if (!(formData?.demoLink ?? '')?.trim?.()) newErrors.demoLink = req;
        else {
          try { new URL(formData?.demoLink ?? ''); } catch { newErrors.demoLink = t?.form?.invalidUrl ?? 'Invalid URL'; }
        }
        break;
      }
      case 4:
        if (!(formData?.frontierQuestion ?? '')?.trim?.()) newErrors.frontierQuestion = req;
        break;
      case 5:
        if (!(formData?.eventFit ?? '')?.trim?.()) newErrors.eventFit = req;
        if (!(formData?.contactEmail ?? '')?.trim?.()) newErrors.contactEmail = req;
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData?.contactEmail ?? '')) {
          newErrors.contactEmail = t?.form?.invalidEmail ?? 'Invalid email';
        }
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors ?? {})?.length === 0;
  };

  const nextStep = () => {
    if (validateStep(step)) {
      setStep((s: number) => Math.min(s + 1, totalSteps - 1));
    }
  };

  const prevStep = () => setStep((s: number) => Math.max(s - 1, 0));

  const handleSubmit = async () => {
    if (!validateStep(step)) return;
    setSubmitting(true);
    try {
      let fileCloudStoragePath: string | null = null;
      let fileIsPublic = false;
      let uploadedFileName: string | null = null;

      // Upload file if present
      if (file) {
        const presignRes = await fetch('/api/upload/presigned', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            fileName: file?.name ?? 'file',
            contentType: file?.type ?? 'application/octet-stream',
            isPublic: false,
          }),
        });
        const presignData = await presignRes?.json?.();
        if (!presignData?.uploadUrl) throw new Error('Upload init failed');

        // Check signed headers to determine if Content-Disposition header is needed
        const uploadUrl = presignData?.uploadUrl ?? '';
        const signedHeadersMatch = uploadUrl?.match?.(/X-Amz-SignedHeaders=([^&]*)/);
        const signedHeaders = signedHeadersMatch?.[1] ? decodeURIComponent(signedHeadersMatch[1]) : 'host';
        const needsContentDisposition = signedHeaders?.includes?.('content-disposition');

        const uploadHeaders: Record<string, string> = {
          'Content-Type': file?.type ?? 'application/octet-stream',
        };
        if (needsContentDisposition) {
          uploadHeaders['Content-Disposition'] = 'attachment';
        }

        const uploadRes = await fetch(uploadUrl, {
          method: 'PUT',
          headers: uploadHeaders,
          body: file,
        });
        if (!uploadRes?.ok) throw new Error('File upload failed');

        fileCloudStoragePath = presignData?.cloud_storage_path ?? null;
        fileIsPublic = false;
        uploadedFileName = file?.name ?? null;
      }

      // Submit registration
      const res = await fetch('/api/registrations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...(formData ?? {}),
          fileCloudStoragePath,
          fileIsPublic,
          fileName: uploadedFileName,
        }),
      });

      const result = await res?.json?.();
      if (!res?.ok) throw new Error(result?.error ?? 'Submission failed');

      setSubmitted(true);
    } catch (err: any) {
      console.error('Submission error:', err);
      toast.error(err?.message ?? 'Error submitting application');
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <main className="min-h-screen bg-background">
        <Navbar />
        <div className="pt-32 pb-24 flex items-center justify-center">
          <FadeIn>
            <div className="text-center max-w-md mx-auto px-4">
              <div className="inline-flex rounded-full bg-primary/10 p-4 mb-6">
                <CheckCircle2 className="h-12 w-12 text-primary" />
              </div>
              <h1 className="font-display text-3xl font-bold tracking-tight mb-4">
                {t?.form?.successTitle ?? 'Submitted!'}
              </h1>
              <p className="text-muted-foreground mb-8">
                {t?.form?.successMsg ?? ''}
              </p>
              <Link href="/">
                <Button variant="outline" className="gap-2">
                  <ArrowLeft className="h-4 w-4" />
                  {t?.form?.backHome ?? 'Back'}
                </Button>
              </Link>
            </div>
          </FadeIn>
        </div>
        <Footer />
      </main>
    );
  }

  const sectionIcons = [User, Lightbulb, Wrench, FlaskConical, Brain, Handshake];
  const sectionNames = [
    t?.form?.section1 ?? '',
    t?.form?.section2 ?? '',
    t?.form?.section3 ?? '',
    t?.form?.section4 ?? '',
    t?.form?.section5 ?? '',
    t?.form?.section6 ?? '',
  ];

  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-28 pb-24">
        <Container size="md">
          <FadeIn>
            <div className="text-center mb-10">
              <h1 className="font-display text-3xl sm:text-4xl font-bold tracking-tight mb-3">
                {t?.form?.pageTitle ?? 'Registration'}
              </h1>
              <p className="text-muted-foreground">{t?.form?.pageSubtitle ?? ''}</p>
            </div>
          </FadeIn>

          {/* Step indicator */}
          <div className="flex items-center justify-center gap-2 mb-10">
            {Array.from({ length: totalSteps })?.map?.((_: any, i: number) => {
              const Icon = sectionIcons?.[i];
              return (
                <button
                  key={i}
                  onClick={() => {
                    if (i < step) setStep(i);
                  }}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                    i === step
                      ? 'bg-primary text-primary-foreground'
                      : i < step
                      ? 'bg-primary/10 text-primary cursor-pointer hover:bg-primary/20'
                      : 'bg-muted text-muted-foreground'
                  }`}
                >
                  {Icon && <Icon className="h-3.5 w-3.5" />}
                  <span className="hidden sm:inline">{sectionNames?.[i] ?? ''}</span>
                  <span className="sm:hidden">{i + 1}</span>
                </button>
              );
            }) ?? []}
          </div>

          <SlideIn from="bottom" key={step}>
            <div className="rounded-2xl border border-border/50 bg-card/30 p-6 sm:p-8">
              <h2 className="font-display text-xl font-bold tracking-tight mb-6 flex items-center gap-2">
                <span className="font-mono text-primary text-sm">0{step + 1}</span>
                {sectionNames?.[step] ?? ''}
              </h2>

              {/* Step 0: Identification */}
              {step === 0 && (
                <div className="space-y-5">
                  <div>
                    <Label htmlFor="projectName">{t?.form?.projectName ?? 'Project name'} *</Label>
                    <Input
                      id="projectName"
                      value={formData?.projectName ?? ''}
                      onChange={(e: any) => updateField('projectName', e?.target?.value ?? '')}
                      className="mt-1.5"
                      variant={errors?.projectName ? 'error' : 'default'}
                    />
                    {errors?.projectName && <p className="text-xs text-red-400 mt-1">{errors.projectName}</p>}
                  </div>
                  <div>
                    <Label htmlFor="country">{t?.form?.country ?? 'Country'} *</Label>
                    <Input
                      id="country"
                      value={formData?.country ?? ''}
                      onChange={(e: any) => updateField('country', e?.target?.value ?? '')}
                      className="mt-1.5"
                      variant={errors?.country ? 'error' : 'default'}
                    />
                    {errors?.country && <p className="text-xs text-red-400 mt-1">{errors.country}</p>}
                  </div>
                  <div>
                    <Label>{t?.form?.projectType ?? 'Type'} *</Label>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-1.5">
                      {[
                        { value: 'startup', label: t?.form?.typeStartup ?? 'Startup' },
                        { value: 'artist', label: t?.form?.typeArtist ?? 'Artist' },
                        { value: 'research', label: t?.form?.typeResearch ?? 'Research' },
                      ]?.map?.((opt: any) => (
                        <button
                          key={opt?.value}
                          type="button"
                          onClick={() => updateField('projectType', opt?.value ?? '')}
                          className={`rounded-xl border p-4 text-left transition-all text-sm ${
                            formData?.projectType === opt?.value
                              ? 'border-primary bg-primary/5 text-foreground'
                              : 'border-border/50 bg-card/30 text-muted-foreground hover:border-primary/30'
                          }`}
                        >
                          {opt?.label ?? ''}
                        </button>
                      )) ?? []}
                    </div>
                    {errors?.projectType && <p className="text-xs text-red-400 mt-1">{errors.projectType}</p>}
                  </div>
                  <div>
                    <Label htmlFor="founders">{t?.form?.founders ?? 'Founders'} *</Label>
                    <Textarea
                      id="founders"
                      value={formData?.founders ?? ''}
                      onChange={(e: any) => updateField('founders', e?.target?.value ?? '')}
                      placeholder={t?.form?.foundersPlaceholder ?? ''}
                      className="mt-1.5"
                      rows={3}
                      variant={errors?.founders ? 'error' : 'default'}
                    />
                    {errors?.founders && <p className="text-xs text-red-400 mt-1">{errors.founders}</p>}
                  </div>
                </div>
              )}

              {/* Step 1: Radical Idea */}
              {step === 1 && (
                <div className="space-y-5">
                  <div>
                    <Label htmlFor="northStar">{t?.form?.northStar ?? 'North Star'} *</Label>
                    <Textarea
                      id="northStar"
                      value={formData?.northStar ?? ''}
                      onChange={(e: any) => updateField('northStar', e?.target?.value ?? '')}
                      placeholder={t?.form?.northStarPlaceholder ?? ''}
                      className="mt-1.5"
                      rows={4}
                      variant={errors?.northStar ? 'error' : 'default'}
                    />
                    {errors?.northStar && <p className="text-xs text-red-400 mt-1">{errors.northStar}</p>}
                  </div>
                  <div>
                    <Label htmlFor="statusQuo">{t?.form?.statusQuo ?? 'Status quo'} *</Label>
                    <Textarea
                      id="statusQuo"
                      value={formData?.statusQuoChallenge ?? ''}
                      onChange={(e: any) => updateField('statusQuoChallenge', e?.target?.value ?? '')}
                      placeholder={t?.form?.statusQuoPlaceholder ?? ''}
                      className="mt-1.5"
                      rows={4}
                      variant={errors?.statusQuoChallenge ? 'error' : 'default'}
                    />
                    {errors?.statusQuoChallenge && <p className="text-xs text-red-400 mt-1">{errors.statusQuoChallenge}</p>}
                  </div>
                </div>
              )}

              {/* Step 2: Solution */}
              {step === 2 && (
                <div className="space-y-5">
                  <div>
                    <Label htmlFor="whatBuilding">{t?.form?.whatBuilding ?? ''} *</Label>
                    <Textarea
                      id="whatBuilding"
                      value={formData?.whatBuilding ?? ''}
                      onChange={(e: any) => updateField('whatBuilding', e?.target?.value ?? '')}
                      placeholder={t?.form?.whatBuildingPlaceholder ?? ''}
                      className="mt-1.5"
                      rows={4}
                      variant={errors?.whatBuilding ? 'error' : 'default'}
                    />
                    {errors?.whatBuilding && <p className="text-xs text-red-400 mt-1">{errors.whatBuilding}</p>}
                  </div>
                  <div>
                    <Label htmlFor="whatRadical">{t?.form?.whatRadical ?? ''} *</Label>
                    <Textarea
                      id="whatRadical"
                      value={formData?.whatMakesRadical ?? ''}
                      onChange={(e: any) => updateField('whatMakesRadical', e?.target?.value ?? '')}
                      placeholder={t?.form?.whatRadicalPlaceholder ?? ''}
                      className="mt-1.5"
                      rows={4}
                      variant={errors?.whatMakesRadical ? 'error' : 'default'}
                    />
                    {errors?.whatMakesRadical && <p className="text-xs text-red-400 mt-1">{errors.whatMakesRadical}</p>}
                  </div>
                </div>
              )}

              {/* Step 3: Evidence */}
              {step === 3 && (
                <div className="space-y-5">
                  <div>
                    <Label>{t?.form?.evidenceLabel ?? 'Evidence'} *</Label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-2">
                      {[
                        { key: 'hasMvp' as const, label: t?.form?.mvp ?? 'MVP' },
                        { key: 'hasUsers' as const, label: t?.form?.users ?? 'Users' },
                        { key: 'hasPilot' as const, label: t?.form?.pilot ?? 'Pilot' },
                        { key: 'hasRevenue' as const, label: t?.form?.revenue ?? 'Revenue' },
                        { key: 'hasCommunity' as const, label: t?.form?.community ?? 'Community' },
                        { key: 'hasResearch' as const, label: t?.form?.research ?? 'Research' },
                      ]?.map?.((ev: any) => (
                        <label
                          key={ev?.key}
                          className={`flex items-center gap-2 rounded-xl border p-3 cursor-pointer transition-all text-sm ${
                            formData?.[ev?.key as keyof FormData]
                              ? 'border-primary bg-primary/5 text-foreground'
                              : 'border-border/50 bg-card/30 text-muted-foreground hover:border-primary/30'
                          }`}
                        >
                          <Checkbox
                            checked={!!formData?.[ev?.key as keyof FormData]}
                            onCheckedChange={(checked: any) => updateField(ev?.key as keyof FormData, !!checked)}
                          />
                          {ev?.label ?? ''}
                        </label>
                      )) ?? []}
                    </div>
                    {errors?.evidence && <p className="text-xs text-red-400 mt-1">{errors.evidence}</p>}
                  </div>
                  <div>
                    <Label htmlFor="keyMetric">{t?.form?.keyMetric ?? 'Key metric'} *</Label>
                    <Textarea
                      id="keyMetric"
                      value={formData?.keyMetric ?? ''}
                      onChange={(e: any) => updateField('keyMetric', e?.target?.value ?? '')}
                      placeholder={t?.form?.keyMetricPlaceholder ?? ''}
                      className="mt-1.5"
                      rows={2}
                      variant={errors?.keyMetric ? 'error' : 'default'}
                    />
                    {errors?.keyMetric && <p className="text-xs text-red-400 mt-1">{errors.keyMetric}</p>}
                  </div>
                  <div>
                    <Label htmlFor="demoLink">{t?.form?.demoLink ?? 'Demo link'} *</Label>
                    <Input
                      id="demoLink"
                      value={formData?.demoLink ?? ''}
                      onChange={(e: any) => updateField('demoLink', e?.target?.value ?? '')}
                      placeholder={t?.form?.demoLinkPlaceholder ?? 'https://'}
                      className="mt-1.5"
                      variant={errors?.demoLink ? 'error' : 'default'}
                    />
                    {errors?.demoLink && <p className="text-xs text-red-400 mt-1">{errors.demoLink}</p>}
                  </div>
                </div>
              )}

              {/* Step 4: Frontier Thinking */}
              {step === 4 && (
                <div className="space-y-5">
                  <div>
                    <Label htmlFor="frontier">{t?.form?.frontierQuestion ?? ''} *</Label>
                    <Textarea
                      id="frontier"
                      value={formData?.frontierQuestion ?? ''}
                      onChange={(e: any) => updateField('frontierQuestion', e?.target?.value ?? '')}
                      placeholder={t?.form?.frontierPlaceholder ?? ''}
                      className="mt-1.5"
                      rows={5}
                      variant={errors?.frontierQuestion ? 'error' : 'default'}
                    />
                    {errors?.frontierQuestion && <p className="text-xs text-red-400 mt-1">{errors.frontierQuestion}</p>}
                  </div>
                </div>
              )}

              {/* Step 5: Event Fit + Contact + File */}
              {step === 5 && (
                <div className="space-y-5">
                  <div>
                    <Label htmlFor="eventFit">{t?.form?.eventFit ?? ''} *</Label>
                    <Textarea
                      id="eventFit"
                      value={formData?.eventFit ?? ''}
                      onChange={(e: any) => updateField('eventFit', e?.target?.value ?? '')}
                      placeholder={t?.form?.eventFitPlaceholder ?? ''}
                      className="mt-1.5"
                      rows={4}
                      variant={errors?.eventFit ? 'error' : 'default'}
                    />
                    {errors?.eventFit && <p className="text-xs text-red-400 mt-1">{errors.eventFit}</p>}
                  </div>
                  <div>
                    <Label htmlFor="contactEmail">{t?.form?.contactEmail ?? 'Email'} *</Label>
                    <Input
                      id="contactEmail"
                      type="email"
                      value={formData?.contactEmail ?? ''}
                      onChange={(e: any) => updateField('contactEmail', e?.target?.value ?? '')}
                      placeholder={t?.form?.contactEmailPlaceholder ?? ''}
                      className="mt-1.5"
                      variant={errors?.contactEmail ? 'error' : 'default'}
                    />
                    {errors?.contactEmail && <p className="text-xs text-red-400 mt-1">{errors.contactEmail}</p>}
                  </div>
                  <div>
                    <Label>{t?.form?.fileUpload ?? 'File upload'}</Label>
                    <p className="text-xs text-muted-foreground mb-2">{t?.form?.fileUploadHint ?? ''}</p>
                    {file ? (
                      <div className="flex items-center gap-3 rounded-xl border border-border/50 bg-card/30 p-4">
                        <Upload className="h-4 w-4 text-primary flex-shrink-0" />
                        <span className="text-sm text-foreground truncate flex-1">{file?.name ?? 'File'}</span>
                        <button
                          type="button"
                          onClick={() => setFile(null)}
                          className="text-muted-foreground hover:text-foreground"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    ) : (
                      <label className="flex items-center justify-center gap-2 rounded-xl border-2 border-dashed border-border/50 bg-card/20 p-8 cursor-pointer hover:border-primary/30 hover:bg-card/40 transition-all">
                        <Upload className="h-5 w-5 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">
                          {t?.form?.fileUpload ?? 'Upload file'}
                        </span>
                        <input
                          type="file"
                          className="hidden"
                          accept=".pdf,.png,.jpg,.jpeg,.gif,.mp4,.mov,.doc,.docx"
                          onChange={(e: any) => {
                            const f = e?.target?.files?.[0];
                            if (f) {
                              if ((f?.size ?? 0) > 50 * 1024 * 1024) {
                                toast.error('File too large (max 50MB)');
                                return;
                              }
                              setFile(f);
                            }
                          }}
                        />
                      </label>
                    )}
                  </div>
                </div>
              )}

              {/* Navigation */}
              <div className="flex items-center justify-between mt-8 pt-6 border-t border-border/30">
                {step > 0 ? (
                  <Button variant="ghost" onClick={prevStep} className="gap-2">
                    <ArrowLeft className="h-4 w-4" />
                    {t?.form?.section1 ? (step > 0 ? sectionNames?.[step - 1] ?? '' : '') : 'Back'}
                  </Button>
                ) : (
                  <div />
                )}

                {step < totalSteps - 1 ? (
                  <Button onClick={nextStep} className="gap-2">
                    {sectionNames?.[step + 1] ?? 'Next'}
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                ) : (
                  <Button onClick={handleSubmit} loading={submitting} className="gap-2">
                    <Sparkles className="h-4 w-4" />
                    {submitting ? (t?.form?.submitting ?? 'Submitting...') : (t?.form?.submit ?? 'Submit')}
                  </Button>
                )}
              </div>
            </div>
          </SlideIn>
        </Container>
      </div>
      <Footer />
    </main>
  );
}
