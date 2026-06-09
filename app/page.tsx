import Link from "next/link"
import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"
import { Button } from "@/components/ui/button"

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex flex-1 flex-col items-center justify-center px-4 text-center">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
          Your SaaS name here
        </h1>
        <p className="mt-4 max-w-prose text-lg text-muted-foreground">
          A short description of what your product does and who it is for.
        </p>
        <Button asChild className="mt-8" size="lg">
          <Link href="/login">Get started</Link>
        </Button>
      </main>
      <Footer />
    </div>
  )
}
