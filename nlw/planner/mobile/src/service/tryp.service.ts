import { api } from './api'

export type TripDetails = {
  id: string
  destination: string
  starts_at: string
  ends_at: string
  is_confirmed: boolean
}

type TripCreate = Omit<TripDetails, 'id' | 'is_confirmed'> & {
  emails_to_invite: string[]
}

async function getById(id: string) {
  try {
    const {
      data: { trip },
    } = await api.get<{ trip: TripDetails }>(`/trips/${id}`)
    return trip
  } catch (error) {
    throw error
  }
}

async function create({
  destination,
  starts_at,
  ends_at,
  emails_to_invite,
}: TripCreate) {
  try {
    const { data } = await api.post<{ tripId: string }>('/trips', {
      destination,
      starts_at,
      ends_at,
      emails_to_invite,
      owner_name: 'Chrystian Santos',
      owner_email: 'chrystian_santos_silva@hotmail.com',
    })
    return data
  } catch (error) {
    throw error
  }
}

async function update({
  id,
  destination,
  starts_at,
  ends_at,
}: Omit<TripDetails, 'is_confirmed'>) {
  try {
    await api.put(`/trips/${id}`, {
      destination,
      starts_at,
      ends_at,
    })
  } catch (error) {
    throw error
  }
}

export const tripService = { getById, create, update }
