import { default as NextLink } from "next/link";
import React from "react";

type Props = React.PropsWithChildren<{
  href: string;
  title: string;
  newTab?: boolean;
}>;

export function Link({ href, children, newTab = true }: Props) {
  return (
    <NextLink href={href}>
      <a
        target={newTab ? "_blank" : "_self"}
        rel="noreferer noopener"
        className="text-red-500 dark:text-red-500 underline"
      >
        {children}
      </a>
    </NextLink>
  );
}
