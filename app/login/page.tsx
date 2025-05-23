"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PhoneIcon, MailIcon } from "lucide-react"

// Import the PhoneInput component
import PhoneInput from "@/components/phone-input"

export default function LoginPage() {
  const router = useRouter()
  const [phoneNumber, setPhoneNumber] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [activeTab, setActiveTab] = useState("phone")

  const handlePhoneLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate sending OTP
    setTimeout(() => {
      setIsLoading(false)
      // Store phone number in session storage for verification page
      sessionStorage.setItem("phoneNumber", phoneNumber)
      router.push("/verify-otp")
    }, 1000)
  }

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate email authentication
    setTimeout(() => {
      // In a real app, you would validate credentials with your backend
      console.log("Logging in with:", { email, password })
      setIsLoading(false)

      // For email login with OTP, redirect to verification page
      if (!password) {
        sessionStorage.setItem("email", email)
        router.push("/verify-otp?method=email")
      } else {
        // For password login, go directly to chat
        router.push("/chat")
      }
    }, 1000)
  }

  return (
    <div className="flex min-h-screen items-center justify-center p-4 bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl text-center">Login to ChatApp</CardTitle>
          <CardDescription className="text-center">Choose your preferred login method</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="phone" className="w-full" onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="phone" className="flex items-center gap-2">
                <PhoneIcon className="h-4 w-4" />
                <span>Phone</span>
              </TabsTrigger>
              <TabsTrigger value="email" className="flex items-center gap-2">
                <MailIcon className="h-4 w-4" />
                <span>Email</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="phone">
              <form onSubmit={handlePhoneLogin} className="space-y-4 mt-4">
                {/* Replace the phone number input with the PhoneInput component */}
                <div className="space-y-2">
                  <PhoneInput value={phoneNumber} onChange={setPhoneNumber} required />
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    We'll send a verification code to this number
                  </p>
                </div>
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? "Sending OTP..." : "Send OTP"}
                </Button>
              </form>
            </TabsContent>

            <TabsContent value="email">
              <form onSubmit={handleEmailLogin} className="space-y-4 mt-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="name@example.co.in"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password">Password (Optional)</Label>
                    <Link href="/forgot-password" className="text-sm text-primary hover:underline">
                      Forgot password?
                    </Link>
                  </div>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Leave empty to receive OTP"
                  />
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {password ? "Login with password" : "We'll send a verification code to your email"}
                  </p>
                </div>

                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? (password ? "Logging in..." : "Sending OTP...") : password ? "Login" : "Send OTP"}
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter className="flex justify-center">
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Don&apos;t have an account?{" "}
            <Link href="/register" className="text-primary hover:underline">
              Register
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}

