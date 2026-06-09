import Link from "next/link"
import { Button } from "@/components/ui/button"

export function Navbar() {
  return (
    <header className="border-b">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4">
        <Link href="/" className="text-sm font-semibold">
          Your app name
        </Link>
        <Button asChild size="sm" variant="outline">
          <Link href="/login">Log in</Link>
        </Button>
      </div>
    </header>
  )
}
