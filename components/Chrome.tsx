import dynamic from "next/dynamic";
import Link from "next/link";
import React from "react";
import { Icon } from "./Icon";

const ThemeSwitch = dynamic(() => import("./ThemeSwitch"));

function Content() {
  return (
    <>
      <div className="flex items-center space-x-8">
        <Link href="https://github.com/madebysid">
          <a title="Visit my GitHub profile">
            <Icon name="github" />
          </a>
        </Link>
        <Link href="mailto:me@madebysid.com">
          <a title="Email me">
            <Icon name="mail" />
          </a>
        </Link>
        <Link href="https://dietcode.io/rss.xml">
          <a title="RSS feed">
            <Icon name="rss" />
          </a>
        </Link>
      </div>
      <ThemeSwitch />
    </>
  );
}

export function Header() {
  return (
    <header className="flex items-center justify-between my-16">
      <Content />
    </header>
  );
}

export function Footer() {
  return (
    <footer className="flex items-center justify-between my-16">
      <Content />
    </footer>
  );
}
