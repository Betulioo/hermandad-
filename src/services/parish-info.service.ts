import { api } from '@/lib/api';
import type { ParishInfo } from '@/types/parish-info';

export async function getParishInfo(): Promise<ParishInfo | null> {
  const { data } = await api.get<ParishInfo>('/parish-info');
  return data;
}

export interface UpdateParishInfoDto {
  name?: string;
  address?: string | null;
  contactEmail?: string | null;
  contactPhone?: string | null;
  officeHours?: string | null;
  massSchedulesSummary?: string | null;
  facebookUrl?: string | null;
  instagramUrl?: string | null;
  youtubeUrl?: string | null;
}

export async function updateParishInfo(dto: UpdateParishInfoDto): Promise<ParishInfo> {
  const { data } = await api.patch<ParishInfo>('/parish-info', dto);
  return data;
}
