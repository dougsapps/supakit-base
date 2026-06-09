"use client"

// Default: shadcn/ui (no provider wrapper needed — it uses CSS variables only)
//
// To switch to HeroUI, replace this file with:
// import { HeroUIProvider } from "@heroui/react"
// export function Providers({ children }: { children: React.ReactNode }) {
//   return <HeroUIProvider>{children}</HeroUIProvider>
// }
//
// To switch to Chakra UI, replace this file with:
// import { ChakraProvider } from "@chakra-ui/react"
// export function Providers({ children }: { children: React.ReactNode }) {
//   return <ChakraProvider>{children}</ChakraProvider>
// }

export function Providers({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
