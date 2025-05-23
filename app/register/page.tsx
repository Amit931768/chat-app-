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

// Import the NameSuggestion component
import NameSuggestion from "@/components/name-suggestion"

export default function RegisterPage() {
  const router = useRouter()
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [phoneNumber, setPhoneNumber] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [activeTab, setActiveTab] = useState("phone")

  const handlePhoneRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    // Simulate registration
    setTimeout(() => {
      // In a real app, you would register the user with your backend
      console.log("Registering with:", { name, phoneNumber })
      setIsLoading(false)

      // Store phone number for verification
      sessionStorage.setItem("phoneNumber", phoneNumber)
      router.push("/verify-otp")
    }, 1000)
  }

  const handleEmailRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (password !== confirmPassword) {
      setError("Passwords do not match")
      return
    }

    setIsLoading(true)

    // Simulate registration
    setTimeout(() => {
      // In a real app, you would register the user with your backend
      console.log("Registering with:", { name, email, password })
      setIsLoading(false)

      // Store email for verification
      sessionStorage.setItem("email", email)
      router.push("/verify-otp?method=email")
    }, 1000)
  }

  return (
    <div className="flex min-h-screen items-center justify-center p-4 bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl text-center">Create an account</CardTitle>
          <CardDescription className="text-center">Choose your preferred registration method</CardDescription>
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
              <form onSubmit={handlePhoneRegister} className="space-y-4 mt-4">
                {/* Add the NameSuggestion component after the name input in the phone tab */}
                <div className="space-y-2">
                  <Label htmlFor="name-phone">Full Name</Label>
                  <Input
                    id="name-phone"
                    placeholder="Rajesh Kumar"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                  <NameSuggestion onSelect={setName} />
                </div>
                {/* Replace the phone number input with the PhoneInput component */}
                <div className="space-y-2">
                  <PhoneInput value={phoneNumber} onChange={setPhoneNumber} required />
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    We'll send a verification code to this number
                  </p>
                </div>
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? "Creating account..." : "Continue"}
                </Button>
              </form>
            </TabsContent>

            <TabsContent value="email">
              <form onSubmit={handleEmailRegister} className="space-y-4 mt-4">
                {/* Add the NameSuggestion component after the name input in the email tab */}
                <div className="space-y-2">
                  <Label htmlFor="name-email">Full Name</Label>
                  <Input
                    id="name-email"
                    placeholder="Rajesh Kumar"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                  <NameSuggestion onSelect={setName} />
                </div>
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
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                </div>
                {error && <p className="text-sm text-red-500">{error}</p>}
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? "Creating account..." : "Register"}
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter className="flex justify-center">
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Already have an account?{" "}
            <Link href="/login" className="text-primary hover:underline">
              Login
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}

