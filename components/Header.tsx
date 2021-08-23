import dynamic from "next/dynamic";
import Link from "next/link";
import { Icon } from "../components/Icon";

const ThemeSwitch = dynamic(() => import("../components/ThemeSwitch"));

export function Header() {
  return (
    <header className="flex items-center justify-between my-16">
      <div className="flex items-center">
        <Link href="https://github.com/madebysid">
          <a title="Visit my GitHub profile">
            <Icon name="github" />
          </a>
        </Link>
        <Link href="mailto:me@madebysid.com">
          <a title="Email me" className="mx-8">
            <Icon name="mail" />
          </a>
        </Link>
      </div>
      <ThemeSwitch />
    </header>
  );
}
