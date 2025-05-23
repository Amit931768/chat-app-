"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

interface OtpInputProps {
  value: string
  onChange: (value: string) => void
  length?: number
  onComplete?: () => void
  className?: string
}

export default function OtpInput({ value, onChange, length = 6, onComplete, className }: OtpInputProps) {
  const inputRefs = useRef<(HTMLInputElement | null)[]>([])
  const [activeInput, setActiveInput] = useState(0)

  // Initialize refs array
  useEffect(() => {
    inputRefs.current = inputRefs.current.slice(0, length)
  }, [length])

  // Focus on first input on mount
  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus()
    }
  }, [])

  // Handle value changes
  useEffect(() => {
    // If value is complete, call onComplete
    if (value.length === length && onComplete) {
      onComplete()
    }
  }, [value, length, onComplete])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const newValue = e.target.value

    // Only accept single digit
    if (newValue.length > 1) return

    // Update the value
    const newOtp = value.split("")
    newOtp[index] = newValue
    onChange(newOtp.join(""))

    // Move to next input if value is entered
    if (newValue && index < length - 1) {
      inputRefs.current[index + 1]?.focus()
      setActiveInput(index + 1)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    // Move to previous input on backspace if current input is empty
    if (e.key === "Backspace" && !value[index] && index > 0) {
      inputRefs.current[index - 1]?.focus()
      setActiveInput(index - 1)
    }

    // Move to next input on right arrow
    if (e.key === "ArrowRight" && index < length - 1) {
      inputRefs.current[index + 1]?.focus()
      setActiveInput(index + 1)
    }

    // Move to previous input on left arrow
    if (e.key === "ArrowLeft" && index > 0) {
      inputRefs.current[index - 1]?.focus()
      setActiveInput(index - 1)
    }
  }

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault()
    const pastedData = e.clipboardData.getData("text/plain").trim()

    // Only accept digits
    const digits = pastedData.replace(/\D/g, "")

    // Only use up to the required length
    const pastedOtp = digits.substring(0, length)

    if (pastedOtp) {
      onChange(pastedOtp.padEnd(length, ""))

      // Focus on the next empty input or the last one
      const focusIndex = Math.min(pastedOtp.length, length - 1)
      inputRefs.current[focusIndex]?.focus()
      setActiveInput(focusIndex)
    }
  }

  const handleFocus = (index: number) => {
    setActiveInput(index)
  }

  return (
    <div className={cn("flex gap-2 justify-between", className)}>
      {Array.from({ length }, (_, index) => (
        <Input
          key={index}
          ref={(el) => (inputRefs.current[index] = el)}
          type="text"
          inputMode="numeric"
          pattern="[0-9]*"
          maxLength={1}
          value={value[index] || ""}
          onChange={(e) => handleChange(e, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          onPaste={handlePaste}
          onFocus={() => handleFocus(index)}
          className={cn("w-12 h-12 text-center text-lg font-medium", activeInput === index ? "border-primary" : "")}
        />
      ))}
    </div>
  )
}

