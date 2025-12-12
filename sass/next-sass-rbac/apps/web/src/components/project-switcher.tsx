'use client'
import { useQuery } from '@tanstack/react-query'
import { ChevronsUpDown, PlusCircle } from 'lucide-react'
import Link from 'next/link'
import { useParams } from 'next/navigation'

import { getProjects } from '@/http/get-projects'
import { getInitial } from '@/lib/utils'

import { Avatar, AvatarFallback } from './ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu'

export function ProjectSwitcher() {
  const { slug: orgSlug } = useParams<{
    slug: string
  }>()

  const { data } = useQuery({
    queryKey: [orgSlug, 'projects'],
    queryFn: () => getProjects(orgSlug),
    enabled: !!orgSlug,
  })

  console.log(data, 'data')

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="focus-visible:ring-primary flex w-[168px] items-center gap-2 rounded p-1 text-sm font-medium outline-none focus-visible:ring-2">
        {/* {currentOrganization ? (
          <>
            <Avatar className="mr-2 size-4">
              {currentOrganization.avatar && (
                <AvatarImage src={currentOrganization.avatar}></AvatarImage>
              )}
              {currentOrganization.name && (
                <AvatarFallback>
                  {getInitial(currentOrganization.name)}
                </AvatarFallback>
              )}
            </Avatar>
            <span className="truncate text-left">
              {currentOrganization.name}
            </span>
          </>
        ) : ( */}
        <span className="text-muted-foreground">Select project</span>
        {/* )} */}
        <ChevronsUpDown className="text-muted-foreground ml-auto size-4" />
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        alignOffset={-16}
        sideOffset={12}
        className="w-[200px]"
      >
        <DropdownMenuGroup>
          <DropdownMenuLabel>Organizations</DropdownMenuLabel>
          {/* {organizations.map((organization) => ( */}
          <DropdownMenuItem asChild>
            <Link href={``}>
              <Avatar className="mr-2 size-4">
                {/* {organization.avatar && <AvatarImage src={''}></AvatarImage>} */}
                {/* {organization.name && ( */}
                <AvatarFallback>{getInitial('Projeto teste')}</AvatarFallback>
                {/* )} */}
              </Avatar>
              <span className="line-clamp-1">Projeto teste</span>
            </Link>
          </DropdownMenuItem>
          {/* ))} */}
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href="">
            <PlusCircle className="mr-2 size-4" />
            Create new
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

// import { ChevronsUpDown, PlusCircle } from 'lucide-react'
// import Link from 'next/link'

// import { getCurrentOrg } from '@/auth/auth'
// import { getOrganizations } from '@/http/get-organizations'
// import { getInitial } from '@/lib/utils'

// import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuGroup,
//   DropdownMenuItem,
//   DropdownMenuLabel,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from './ui/dropdown-menu'

// export async function OrganizationSwitcher() {
//   const currentOrg = await getCurrentOrg()
//   const { organizations } = await getOrganizations()

//   const currentOrganization = organizations.find(
//     (organization) => organization.slug === currentOrg,
//   )

//   return (

//   )
// }
