import { IconDefinition } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import NextLink, { LinkProps as NextLinkProps } from 'next/link'

interface LinkProps extends NextLinkProps {
  content: string
  endIcon?: IconDefinition
  startIcon?: IconDefinition
}

export function Link({ content, endIcon, startIcon, ...rest }: LinkProps) {
  return (
    <NextLink
      className="flex items-center gap-2 border-b-2 border-transparent w-fit uppercase text-blue text-xs font-bold hover:border-blue ease-in duration-300"
      {...rest}
    >
      {startIcon && (
        <FontAwesomeIcon
          width={12}
          fontWeight="bold"
          height={12}
          icon={startIcon}
        />
      )}
      {content}
      {endIcon && (
        <FontAwesomeIcon
          width={12}
          fontWeight="bold"
          height={12}
          icon={endIcon}
        />
      )}
    </NextLink>
  )
}
