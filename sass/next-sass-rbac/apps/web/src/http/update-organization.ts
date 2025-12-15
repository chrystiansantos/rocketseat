import { api } from './api-client'

interface UpdateOrganizationRequest {
  org: string
  name: string
  domain: string | null
  shouldAttachUsersByDomain: boolean
}

interface UpdateOrganizationResponse {}

export async function updateOrganization({
  org,
  name,
  domain,
  shouldAttachUsersByDomain,
}: UpdateOrganizationRequest) {
  await api
    .put(`organizations/${org}`, {
      json: {
        name,
        domain,
        shouldAttachUsersByDomain,
      },
    })
    .json<UpdateOrganizationResponse>()
}
