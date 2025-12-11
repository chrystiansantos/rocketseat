import { api } from "./api-client";

interface GetOrganizationResponse {
  organizations: {
    id: string,
    name: string,
    slug: String,
    avatar: string | null
  }[]
}

export async function getOrganizations() {
  const result = await api.get('organizations').json<GetOrganizationResponse>()

  return result
}