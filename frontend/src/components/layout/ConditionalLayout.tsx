'use client'

import { usePathname } from 'next/navigation'
import { SignedIn, UserButton } from '@clerk/nextjs'

export function ConditionalLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  
  // Check if current path is an auth page
  const isAuthPage = pathname?.startsWith('/sign-in') || pathname?.startsWith('/sign-up')
  
  if (isAuthPage) {
    // Render only children for auth pages (no header, nav, footer)
    return <>{children}</>
  }
  
  // Render full layout for other pages
  return (
    <>
      <header className="flex justify-end items-center p-4 gap-4 h-16">
        <SignedIn>
          <UserButton />
        </SignedIn>
      </header>
      {children}
    </>
  )
}