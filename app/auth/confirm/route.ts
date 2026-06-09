import { NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl
  const tokenHash = searchParams.get("token_hash")
  const type = searchParams.get("type") as "magiclink" | "email" | null
  const next = searchParams.get("next") ?? "/dashboard"

  if (!tokenHash || !type) {
    return NextResponse.redirect(
      new URL("/login?error=missing_token", request.url)
    )
  }

  const supabase = await createClient()
  const { error } = await supabase.auth.verifyOtp({ token_hash: tokenHash, type })

  if (error) {
    console.error("[auth/confirm] OTP verification failed:", error.message)
    return NextResponse.redirect(
      new URL("/login?error=invalid_token", request.url)
    )
  }

  return NextResponse.redirect(new URL(next, request.url))
}
