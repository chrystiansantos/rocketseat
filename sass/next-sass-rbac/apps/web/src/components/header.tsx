import { Slash } from 'lucide-react'
import Image from 'next/image'

import rocketseatIcom from '@/assets/rocketseat-icon.svg'

import { OrganizationSwitcher } from './organization-switcher'
import { ProfileButton } from './profile-button'

export function Header() {
  return (
    <div className="mx-auto flex max-w-[1200px] items-center justify-between px-4">
      <div className="flex flex-1 items-center gap-3">
        <Image
          src={rocketseatIcom}
          alt="Rocketseat"
          className="size-6 dark:invert"
        />

        <Slash className="text-border size-3 -rotate-24" />

        <OrganizationSwitcher />
      </div>

      <div className="flex items-center gap-4">
        <ProfileButton />
      </div>
    </div>
  )
}
