import { api } from '@/lib/api';
import type { ParishInfo } from '@/types/parish-info';

export async function getParishInfo(): Promise<ParishInfo | null> {
  const { data } = await api.get<ParishInfo>('/parish-info');
  return data;
}
