import { api } from '@/lib/api';
import type { LoginRequest, LoginResponse } from '@/types/auth';

export async function loginUser(credentials: LoginRequest): Promise<LoginResponse> {
  const { data } = await api.post<LoginResponse>('/auth/login', credentials);
  return data;
}
