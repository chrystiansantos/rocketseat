import { api } from '@/lib/api'

export interface GetProfileResponse {
  name: string
  id: string
  email: string
  phone: string | null
  role: 'manager' | 'customer'
  createdAt: Date | null
  updatedAt: Date | null
}

export async function getProfile() {
  const { data } = await api.get<GetProfileResponse>('/me')
  return data
}
