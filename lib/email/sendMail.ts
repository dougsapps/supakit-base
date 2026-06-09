import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

export async function sendMail(to: string, subject: string, html: string) {
  const { data, error } = await resend.emails.send({
    from: `SupaKit <noreply@dougsapps.com>`,
    to,
    subject,
    html,
  })

  if (error) {
    console.error("[sendMail] Resend error:", error)
    throw new Error(error.message)
  }

  console.log("[sendMail] Sent:", data?.id, "→", to)
}
