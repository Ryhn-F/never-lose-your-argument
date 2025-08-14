"use client";

import { usePathname } from "next/navigation";
import { Navigation } from ".";

export function ConditionalLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // Check if current path is an auth page or app page
  const isAuthPage =
    pathname?.startsWith("/sign-in") || pathname?.startsWith("/sign-up");
  const isAppPage = pathname?.startsWith("/app");

  if (isAuthPage) {
    // Render only children for auth pages (no header, nav, footer)
    return <>{children}</>;
  }

  if (isAppPage) {
    // App pages have their own layout with sidebar
    return <>{children}</>;
  }

  // Render full layout for landing page and other pages
  return (
    <>
      <Navigation />
      {children}
    </>
  );
}
