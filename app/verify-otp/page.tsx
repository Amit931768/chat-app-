"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { ArrowLeft, CheckCircle2 } from "lucide-react"
import OtpInput from "@/components/otp-input"

export default function VerifyOtpPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const method = searchParams.get("method") || "phone"

  const [otp, setOtp] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [countdown, setCountdown] = useState(30)
  const [isVerified, setIsVerified] = useState(false)
  const [contact, setContact] = useState("")

  useEffect(() => {
    // Get contact info from session storage
    if (method === "email") {
      const email = sessionStorage.getItem("email")
      if (email) setContact(email)
    } else {
      const phoneNumber = sessionStorage.getItem("phoneNumber")
      if (phoneNumber) setContact(phoneNumber)
    }

    // Start countdown for resend
    const timer = setInterval(() => {
      setCountdown((prev) => (prev > 0 ? prev - 1 : 0))
    }, 1000)

    return () => clearInterval(timer)
  }, [method])

  const handleVerify = async () => {
    if (otp.length !== 6) return

    setIsLoading(true)

    // Simulate verification
    setTimeout(() => {
      setIsLoading(false)
      setIsVerified(true)

      // Redirect to chat after successful verification
      setTimeout(() => {
        router.push("/chat")
      }, 1500)
    }, 1000)
  }

  const handleResendOtp = () => {
    if (countdown > 0) return

    // Simulate resending OTP
    setCountdown(30)

    // Show toast or notification that OTP was resent
    console.log("Resending OTP to", contact)
  }

  const handleBack = () => {
    router.push("/login")
  }

  const maskContact = (value: string) => {
    if (method === "email") {
      // Mask email: show first 2 chars, then asterisks, then domain
      const [username, domain] = value.split("@")
      if (!username || !domain) return value

      const maskedUsername = username.substring(0, 2) + "*".repeat(Math.max(1, username.length - 2))

      return `${maskedUsername}@${domain}`
    } else {
      // Mask phone: show last 4 digits
      return value.replace(/(\d{0,}?)(\d{4})$/, "******$2")
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center p-4 bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <Card className="w-full max-w-md">
        <CardHeader>
          <div className="flex items-center mb-2">
            <Button variant="ghost" size="icon" onClick={handleBack} className="mr-2">
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <CardTitle className="text-2xl">Verify {method === "email" ? "Email" : "Phone"}</CardTitle>
          </div>
          <CardDescription>We've sent a verification code to {maskContact(contact)}</CardDescription>
        </CardHeader>
        <CardContent>
          {isVerified ? (
            <div className="flex flex-col items-center justify-center py-8">
              <CheckCircle2 className="h-16 w-16 text-green-500 mb-4" />
              <h3 className="text-xl font-medium">Verification Successful</h3>
              <p className="text-slate-500 dark:text-slate-400 mt-2">Redirecting you to the chat...</p>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="otp">Enter verification code</Label>
                <OtpInput value={otp} onChange={setOtp} length={6} onComplete={handleVerify} />
              </div>

              <div className="flex justify-between items-center">
                <Button variant="link" disabled={countdown > 0} onClick={handleResendOtp} className="p-0 h-auto">
                  Resend Code {countdown > 0 ? `(${countdown}s)` : ""}
                </Button>

                <Button onClick={handleVerify} disabled={otp.length !== 6 || isLoading}>
                  {isLoading ? "Verifying..." : "Verify"}
                </Button>
              </div>
            </div>
          )}
        </CardContent>
        <CardFooter className="flex justify-center">
          <p className="text-sm text-slate-500 dark:text-slate-400">Having trouble? Contact our support team</p>
        </CardFooter>
      </Card>
    </div>
  )
}

