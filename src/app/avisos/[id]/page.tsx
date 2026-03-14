import type { Metadata } from 'next';
import Link from 'next/link';
import { getAnnouncementById } from '@/services/announcements.service';
import { PageShell } from '@/components/layout/page-shell/PageShell';
import { Section } from '@/components/layout/section/Section';
import { Container } from '@/components/layout/container/Container';
import { PageHeading } from '@/components/ui/typography/PageHeading';
import { Badge } from '@/components/ui/data-display/Badge';
import { MetaRow } from '@/components/ui/data-display/MetaRow';
import { Button } from '@/components/ui/buttons/Button';
import { CalendarIcon } from '@/components/ui/icons';
import { mockAvisos, avísoCategoryLabels } from '@/content/avisos';
import {
  announcementToView,
  mockAvisoToView,
  type AnnouncementView,
} from '@/lib/mappers/announcement.mapper';

export const dynamic = 'force-dynamic';

async function getAviso(id: string): Promise<AnnouncementView | null> {
  try {
    const data = await getAnnouncementById(id);
    return announcementToView(data);
  } catch {
    const mock = mockAvisos.find((a) => a.id === id);
    return mock ? mockAvisoToView(mock) : null;
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const aviso = await getAviso(id);
  const title = aviso
    ? `${aviso.title} — Santa María la Antigua`
    : 'Aviso — Santa María la Antigua';
  return {
    title,
    description: aviso
      ? `Aviso de la Parroquia: ${aviso.title}`
      : 'Aviso de la Parroquia Santa María la Antigua',
  };
}

export default async function AvisoDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const aviso = await getAviso(id);

  if (!aviso) {
    return (
      <PageShell>
        <Section>
          <Container size="md">
            <div className="space-y-6">
              <Link
                href="/avisos"
                className="inline-flex items-center gap-1 text-body-sm text-text-muted transition-colors hover:text-text-primary"
              >
                ← Volver a avisos
              </Link>
              <p className="text-body-md text-text-secondary">
                Este aviso no está disponible o ha sido retirado.
              </p>
              <Button href="/avisos" variant="secondary" size="sm">
                Ver todos los avisos
              </Button>
            </div>
          </Container>
        </Section>
      </PageShell>
    );
  }

  return (
    <PageShell>
      <Section>
        <Container size="md">
          <div className="space-y-8">
            <Link
              href="/avisos"
              className="inline-flex items-center gap-1 text-body-sm text-text-muted transition-colors hover:text-text-primary"
            >
              ← Volver a avisos
            </Link>

            <div className="space-y-4">
              {(aviso.isImportant || aviso.category) && (
                <div className="flex flex-wrap items-center gap-2">
                  {aviso.isImportant && (
                    <Badge variant="important">Destacado</Badge>
                  )}
                  {aviso.category && (
                    <Badge variant="default">
                      {avísoCategoryLabels[aviso.category as keyof typeof avísoCategoryLabels] ??
                        aviso.category}
                    </Badge>
                  )}
                </div>
              )}
              <PageHeading title={aviso.title} />
              <MetaRow icon={<CalendarIcon />}>{aviso.date}</MetaRow>
            </div>

            <div className="space-y-4">
              {aviso.content.split('\n\n').map((paragraph, i) => (
                <p key={i} className="text-body-md leading-relaxed text-text-secondary">
                  {paragraph}
                </p>
              ))}
            </div>

            <div className="border-t border-border-soft pt-6">
              <Button href="/avisos" variant="secondary" size="sm">
                ← Ver todos los avisos
              </Button>
            </div>
          </div>
        </Container>
      </Section>
    </PageShell>
  );
}
