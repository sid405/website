import Link from "next/link";
import { Header } from "../components/Header";
import { Icon } from "../components/Icon";

export default function NotFound() {
  return (
    <>
      <Header />
      <main className="flex flex-col items-center justify-center mt-64 relative">
        <h1 className="font-ibm text-9xl">404</h1>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/kitty.svg"
          alt="Decorative kitty"
          className="absolute"
          style={{ zIndex: -1, top: "-0.75rem" }}
        />
        <h3 className="text-xl mt-4">There&apos;s nothing here</h3>
        <Link href="/">
          <a title="Back to home" className="mt-32">
            <Icon name="arrow-left" />
          </a>
        </Link>
      </main>
    </>
  );
}
