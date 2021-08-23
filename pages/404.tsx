import Link from "next/link";
import { Header } from "../components/Header";
import { Icon } from "../components/Icon";

export default function NotFound() {
  return (
    <>
      <Header />
      <main className="relative flex flex-col items-center justify-center mt-64">
        <h1 className="z-30 font-ibm text-9xl select-none pointer-events-none">
          404
        </h1>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/kitty.svg"
          alt="Decorative kitty"
          className="z-10 absolute cursor-pointer transition translate-y-0 hover:translate-y-6 pt-8"
          style={{ top: "-2.75rem" }}
        />
        <div
          className="z-20 absolute bg-white dark:bg-gray-800 w-[3rem] h-[3rem] rounded-full"
          style={{
            borderRadius: "1.2rem",
            top: "1.4rem",
          }}
        ></div>
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
