import { redirect } from "next/navigation"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function Home() {
  // In a real app, you would check for authentication here
  // and redirect to the chat page if the user is already logged in
  const isAuthenticated = false

  if (isAuthenticated) {
    redirect("/chat")
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <div className="w-full max-w-md p-8 space-y-8 bg-white dark:bg-slate-950 rounded-xl shadow-lg">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">ChatApp</h1>
          <p className="mt-2 text-slate-600 dark:text-slate-400">Connect with friends and family in real-time</p>
        </div>

        <div className="space-y-4">
          <Button asChild className="w-full">
            <Link href="/login">Login</Link>
          </Button>

          <Button asChild variant="outline" className="w-full">
            <Link href="/register">Register</Link>
          </Button>
        </div>

        <div className="mt-6 text-center text-sm text-slate-500 dark:text-slate-400">
          <p>Experience seamless communication with end-to-end encryption</p>
        </div>
      </div>
    </main>
  )
}

