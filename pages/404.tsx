import { Header } from "../components/Header";
import { Icon } from "../components/Icon";

export default function NotFound() {
  return (
    <>
      <Header />
      <main className="flex flex-col items-center justify-center mt-64 relative">
        <h1 className="font-ibm text-9xl">404</h1>
        <img
          src="/kitty.svg"
          title="kitty"
          className="absolute"
          style={{ zIndex: -1, top: "-0.75rem" }}
        />
        <h3 className="text-xl mt-4">There's nothing here</h3>
        <a title="Back to home" href="/" className="mt-32">
          <Icon name="arrow-left" />
        </a>
      </main>
    </>
  );
}
