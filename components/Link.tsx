import { default as NextLink } from "next/link"
import React from "react"

type Props = React.PropsWithChildren<{
  href: string
  title: string
}>

export function Link({ href, children }: Props) {
  return (
    <NextLink href={href}>
      <a
        target="_blank"
        rel="noreferer noopener"
        className="text-red-500 dark:text-red-500 underline"
      >
        {children}
      </a>
    </NextLink>
  )
}
