import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="gutter flex min-h-[100svh] flex-col justify-center">
      <p className="meta text-bone-faint">404</p>
      <h1 className="display display-md mt-5">This page doesn’t exist.</h1>
      <Link
        href="/"
        className="meta link-draw text-bone-muted hover:text-bone mt-10 self-start transition-colors duration-500"
      >
        Back to the films
      </Link>
    </main>
  );
}
