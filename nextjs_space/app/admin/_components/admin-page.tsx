'use client';

import { useState, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Container } from '@/components/layouts/container';
import { FadeIn } from '@/components/ui/animate';
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from '@/components/ui/table';
import {
  Shield,
  Search,
  Download,
  ChevronLeft,
  ChevronRight,
  FileText,
  ExternalLink,
  Lock,
  Eye,
  EyeOff,
} from 'lucide-react';
import { toast } from 'sonner';

interface Registration {
  id: string;
  createdAt: string;
  projectName: string;
  country: string;
  participationCategory: string;
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
  contactPhone: string;
  evidenceFiles: { cloudStoragePath: string; fileName: string; isPublic: boolean; docType?: string }[];
}

export function AdminPage() {
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [loading, setLoading] = useState(false);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    if (!authenticated) return;
    setLoading(true);
    try {
      const params = new URLSearchParams({
        password: 'RadicalAdmin2026',
        page: String(page ?? 1),
        limit: '20',
      });
      if (search) params?.set?.('search', search);
      if (typeFilter && typeFilter !== 'all') params?.set?.('type', typeFilter);

      const res = await fetch(`/api/registrations?${params?.toString?.() ?? ''}`);
      const data = await res?.json?.();

      if (!res?.ok) throw new Error(data?.error ?? 'Failed to fetch');

      setRegistrations(data?.registrations ?? []);
      setTotal(data?.total ?? 0);
      setTotalPages(data?.totalPages ?? 1);
    } catch (err: any) {
      console.error(err);
      toast.error(err?.message ?? 'Error loading data');
    } finally {
      setLoading(false);
    }
  }, [authenticated, page, search, typeFilter]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleLogin = () => {
    if (password === 'RadicalAdmin2026') {
      setAuthenticated(true);
    } else {
      toast.error('Contraseña incorrecta');
    }
  };

  const handleExport = () => {
    const a = document.createElement('a');
    a.href = `/api/registrations/export?password=RadicalAdmin2026`;
    a.download = 'registrations.csv';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const handleFileDownload = async (regId: string, index: number = 0) => {
    try {
      const res = await fetch(`/api/registrations/${regId}/file?password=RadicalAdmin2026&index=${index}`);
      const data = await res?.json?.();
      if (data?.fileUrl) {
        const a = document.createElement('a');
        a.href = data.fileUrl;
        a.download = 'evidence';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      }
    } catch (err: any) {
      console.error(err);
      toast.error('Error downloading file');
    }
  };

  const categoryLabels: Record<string, string> = {
    visionaries: 'Visionarios tecnológicos',
    decentralizedArchitects: 'Arquitectos de sistemas descentralizados',
    humanExperience: 'Constructores de la experiencia humana',
    pioneerScientists: 'Científicos pioneros',
    radicalChange: 'Agentes de cambio radical',
  };

  const docTypeLabels: Record<string, string> = {
    onePager: 'One pager',
    pitchDeck: 'Pitch deck',
    traction: 'Tracción/ventas',
  };

  const typeBadgeColor = (type: string) => {
    switch (type) {
      case 'visionaries': return 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20';
      case 'decentralizedArchitects': return 'bg-purple-500/10 text-purple-400 border-purple-500/20';
      case 'humanExperience': return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
      case 'pioneerScientists': return 'bg-amber-500/10 text-amber-400 border-amber-500/20';
      case 'radicalChange': return 'bg-rose-500/10 text-rose-400 border-rose-500/20';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const evidenceTags = (reg: Registration) => {
    const tags: string[] = [];
    if (reg?.hasMvp) tags.push('MVP');
    if (reg?.hasUsers) tags.push('Users');
    if (reg?.hasPilot) tags.push('Pilot');
    if (reg?.hasRevenue) tags.push('Revenue');
    if (reg?.hasCommunity) tags.push('Community');
    if (reg?.hasResearch) tags.push('Research');
    return tags;
  };

  if (!authenticated) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <FadeIn>
          <div className="w-full max-w-sm mx-auto px-4">
            <div className="text-center mb-8">
              <div className="inline-flex rounded-full bg-primary/10 p-3 mb-4">
                <Shield className="h-8 w-8 text-primary" />
              </div>
              <h1 className="font-display text-2xl font-bold tracking-tight mb-2">Admin Panel</h1>
              <p className="text-sm text-muted-foreground">Radical Innovation 2026</p>
            </div>
            <div className="rounded-2xl border border-border/50 bg-card/30 p-6 space-y-4">
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e: any) => setPassword(e?.target?.value ?? '')}
                  onKeyDown={(e: any) => { if (e?.key === 'Enter') handleLogin(); }}
                  placeholder="Contraseña de administrador"
                  className="pl-10 pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              <Button onClick={handleLogin} className="w-full">
                Acceder
              </Button>
            </div>
          </div>
        </FadeIn>
      </main>
    );
  }

  return (
    <main className="min-h-screen">
      <div className="border-b border-border/50 bg-card/30">
        <Container size="xl">
          <div className="flex items-center justify-between py-4">
            <div className="flex items-center gap-3">
              <Shield className="h-5 w-5 text-primary" />
              <h1 className="font-display text-lg font-bold tracking-tight">
                Admin Panel
              </h1>
              <span className="text-xs font-mono text-muted-foreground bg-muted/50 px-2 py-0.5 rounded">
                {total ?? 0} registros
              </span>
            </div>
            <Button onClick={handleExport} variant="outline" size="sm" className="gap-2">
              <Download className="h-4 w-4" />
              Exportar CSV
            </Button>
          </div>
        </Container>
      </div>

      <Container size="xl" className="py-6">
        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              value={search}
              onChange={(e: any) => {
                setSearch(e?.target?.value ?? '');
                setPage(1);
              }}
              placeholder="Buscar por nombre, país, email..."
              className="pl-10"
            />
          </div>
          <div className="flex gap-2">
            {['all', 'visionaries', 'decentralizedArchitects', 'humanExperience', 'pioneerScientists', 'radicalChange']?.map?.((tp: string) => (
              <button
                key={tp}
                onClick={() => {
                  setTypeFilter(tp);
                  setPage(1);
                }}
                className={`px-3 py-2 rounded-lg text-xs font-medium transition-all border ${
                  typeFilter === tp
                    ? 'border-primary bg-primary/10 text-primary'
                    : 'border-border/50 bg-card/30 text-muted-foreground hover:text-foreground'
                }`}
              >
                {tp === 'all' ? 'Todos' : categoryLabels?.[tp] ?? tp}
              </button>
            )) ?? []}
          </div>
        </div>

        {/* Table */}
        <div className="rounded-xl border border-border/50 overflow-hidden">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-card/50">
                  <TableHead className="text-xs font-mono">Fecha</TableHead>
                  <TableHead className="text-xs font-mono">Proyecto</TableHead>
                  <TableHead className="text-xs font-mono">Categoría</TableHead>
                  <TableHead className="text-xs font-mono">País</TableHead>
                  <TableHead className="text-xs font-mono">Email</TableHead>
                  <TableHead className="text-xs font-mono">Evidencia</TableHead>
                  <TableHead className="text-xs font-mono">Demo</TableHead>
                  <TableHead className="text-xs font-mono">Archivo</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-10 text-muted-foreground">
                      Cargando...
                    </TableCell>
                  </TableRow>
                ) : (registrations?.length ?? 0) === 0 ? (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-10 text-muted-foreground">
                      No hay registros
                    </TableCell>
                  </TableRow>
                ) : (
                  registrations?.map?.((reg: Registration) => (
                    <>
                      <TableRow
                        key={reg?.id ?? ''}
                        className="cursor-pointer hover:bg-card/60 transition-colors"
                        onClick={() => setExpandedId(expandedId === reg?.id ? null : reg?.id ?? null)}
                      >
                        <TableCell className="text-xs text-muted-foreground whitespace-nowrap">
                          {reg?.createdAt ? new Date(reg.createdAt).toLocaleDateString('es-MX') : ''}
                        </TableCell>
                        <TableCell className="font-medium text-sm max-w-[200px] truncate">
                          {reg?.projectName ?? ''}
                        </TableCell>
                        <TableCell>
                          <span className={`inline-flex px-2 py-0.5 rounded-full text-[10px] font-medium border ${typeBadgeColor(reg?.participationCategory ?? '')}`}>
                            {categoryLabels?.[reg?.participationCategory ?? ''] ?? reg?.participationCategory ?? ''}
                          </span>
                        </TableCell>
                        <TableCell className="text-sm">{reg?.country ?? ''}</TableCell>
                        <TableCell className="text-xs text-muted-foreground">{reg?.contactEmail ?? ''}</TableCell>
                        <TableCell>
                          <div className="flex flex-wrap gap-1">
                            {evidenceTags(reg)?.map?.((tag: string) => (
                              <span key={tag} className="px-1.5 py-0.5 rounded bg-primary/10 text-primary text-[10px] font-medium">
                                {tag}
                              </span>
                            )) ?? []}
                          </div>
                        </TableCell>
                        <TableCell>
                          {reg?.demoLink && (
                            <a
                              href={reg.demoLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={(e: any) => e?.stopPropagation?.()}
                              className="inline-flex items-center gap-1 text-xs text-primary hover:underline"
                            >
                              <ExternalLink className="h-3 w-3" /> Link
                            </a>
                          )}
                        </TableCell>
                        <TableCell>
                          <div className="flex flex-col gap-1">
                            {(reg?.evidenceFiles ?? [])?.map?.((f: any, idx: number) => (
                              <button
                                key={`${f?.fileName ?? 'file'}-${idx}`}
                                onClick={(e: any) => {
                                  e?.stopPropagation?.();
                                  handleFileDownload(reg?.id ?? '', idx);
                                }}
                                className="inline-flex items-center gap-1 text-xs text-primary hover:underline"
                              >
                                <FileText className="h-3 w-3" /> {docTypeLabels?.[f?.docType ?? ''] ?? f?.fileName ?? 'File'}
                              </button>
                            )) ?? []}
                          </div>
                        </TableCell>
                      </TableRow>
                      {expandedId === reg?.id && (
                        <TableRow key={`${reg?.id ?? ''}-expanded`}>
                          <TableCell colSpan={8} className="bg-card/40 p-6">
                            <div className="grid md:grid-cols-2 gap-6 text-sm">
                              <div>
                                <h4 className="font-bold text-primary text-xs uppercase tracking-wider mb-2">Teléfono de contacto</h4>
                                <p className="text-muted-foreground whitespace-pre-line">{reg?.contactPhone ?? ''}</p>
                              </div>
                              <div>
                                <h4 className="font-bold text-primary text-xs uppercase tracking-wider mb-2">Fundadores</h4>
                                <p className="text-muted-foreground whitespace-pre-line">{reg?.founders ?? ''}</p>
                              </div>
                              <div>
                                <h4 className="font-bold text-primary text-xs uppercase tracking-wider mb-2">North Star</h4>
                                <p className="text-muted-foreground whitespace-pre-line">{reg?.northStar ?? ''}</p>
                              </div>
                              <div>
                                <h4 className="font-bold text-primary text-xs uppercase tracking-wider mb-2">Status Quo Challenge</h4>
                                <p className="text-muted-foreground whitespace-pre-line">{reg?.statusQuoChallenge ?? ''}</p>
                              </div>
                              <div>
                                <h4 className="font-bold text-primary text-xs uppercase tracking-wider mb-2">Qué construye</h4>
                                <p className="text-muted-foreground whitespace-pre-line">{reg?.whatBuilding ?? ''}</p>
                              </div>
                              <div>
                                <h4 className="font-bold text-primary text-xs uppercase tracking-wider mb-2">Qué lo hace radical</h4>
                                <p className="text-muted-foreground whitespace-pre-line">{reg?.whatMakesRadical ?? ''}</p>
                              </div>
                              <div>
                                <h4 className="font-bold text-primary text-xs uppercase tracking-wider mb-2">Métrica clave</h4>
                                <p className="text-muted-foreground whitespace-pre-line">{reg?.keyMetric ?? ''}</p>
                              </div>
                              <div>
                                <h4 className="font-bold text-primary text-xs uppercase tracking-wider mb-2">Frontier Thinking</h4>
                                <p className="text-muted-foreground whitespace-pre-line">{reg?.frontierQuestion ?? ''}</p>
                              </div>
                              <div>
                                <h4 className="font-bold text-primary text-xs uppercase tracking-wider mb-2">Fit con el evento</h4>
                                <p className="text-muted-foreground whitespace-pre-line">{reg?.eventFit ?? ''}</p>
                              </div>
                            </div>
                          </TableCell>
                        </TableRow>
                      )}
                    </>
                  )) ?? []
                )}
              </TableBody>
            </Table>
          </div>
        </div>

        {/* Pagination */}
        {(totalPages ?? 1) > 1 && (
          <div className="flex items-center justify-between mt-4">
            <p className="text-xs text-muted-foreground">
              Página {page ?? 1} de {totalPages ?? 1}
            </p>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                disabled={(page ?? 1) <= 1}
                onClick={() => setPage((p: number) => Math.max(1, p - 1))}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                disabled={(page ?? 1) >= (totalPages ?? 1)}
                onClick={() => setPage((p: number) => p + 1)}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}
      </Container>
    </main>
  );
}
