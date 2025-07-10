'use client'
import { cn } from "@/lib/utils";
import Link, { LinkProps } from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

type ActiveLink = {
  children: ReactNode
} & LinkProps

export function ActiveLink({ children, href, ...rest }: ActiveLink) {
  const linkPath = (typeof href === 'string' ? href : href.pathname) ?? ''
  const pathName = usePathname()

  const isCurrentPath = pathName === linkPath || pathName?.startsWith(`${linkPath}/`)

  return (
    <Link
      href={href}
      className={cn("text-action-sm transition-colors hover:text-blue-200", isCurrentPath ? "text-blue-200" : "text-gray-100")}
      {...rest}
    >
      {children}
    </Link>
  )

}