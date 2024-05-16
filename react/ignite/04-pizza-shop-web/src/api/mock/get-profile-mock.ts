import { http, HttpResponse } from 'msw'

import { GetProfileResponse } from '../get-profile'

export const getProfileMock = http.get<never, never, GetProfileResponse>(
  '/me',
  () => {
    return HttpResponse.json({
      id: 'custom-user-id',
      name: 'Fulano da Silva',
      email: 'fulano@hotmail.com',
      phone: '1289371239',
      role: 'manager',
      createdAt: new Date(),
      updatedAt: null,
    })
  },
)
