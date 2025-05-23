"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface PhoneInputProps {
  value: string
  onChange: (value: string) => void
  label?: string
  required?: boolean
  className?: string
}

// Common Indian country codes
const countryCodes = [
  { code: "+91", country: "India" },
  { code: "+1", country: "USA" },
  { code: "+44", country: "UK" },
  { code: "+971", country: "UAE" },
  { code: "+65", country: "Singapore" },
  { code: "+61", country: "Australia" },
]

export default function PhoneInput({
  value,
  onChange,
  label = "Phone Number",
  required = false,
  className,
}: PhoneInputProps) {
  const [countryCode, setCountryCode] = useState("+91")
  const [phoneNumber, setPhoneNumber] = useState("")

  // Parse initial value if provided
  useEffect(() => {
    if (value) {
      // Check if value starts with any of the country codes
      const matchedCode = countryCodes.find((c) => value.startsWith(c.code))
      if (matchedCode) {
        setCountryCode(matchedCode.code)
        setPhoneNumber(value.substring(matchedCode.code.length).trim())
      } else {
        // Default to just setting the phone number part
        setPhoneNumber(value)
      }
    }
  }, [])

  // Update the combined value when either part changes
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPhone = e.target.value
    setPhoneNumber(newPhone)
    onChange(`${countryCode} ${newPhone}`)
  }

  const handleCountryCodeChange = (newCode: string) => {
    setCountryCode(newCode)
    onChange(`${newCode} ${phoneNumber}`)
  }

  return (
    <div className={className}>
      {label && (
        <Label htmlFor="phone-input">
          {label}
          {required && <span className="text-red-500">*</span>}
        </Label>
      )}
      <div className="flex mt-1.5">
        <Select value={countryCode} onValueChange={handleCountryCodeChange}>
          <SelectTrigger className="w-[100px] rounded-r-none">
            <SelectValue placeholder="+91" />
          </SelectTrigger>
          <SelectContent>
            {countryCodes.map((country) => (
              <SelectItem key={country.code} value={country.code}>
                {country.code} {country.country}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Input
          id="phone-input"
          type="tel"
          value={phoneNumber}
          onChange={handlePhoneChange}
          className="rounded-l-none"
          placeholder="98765 43210"
          required={required}
        />
      </div>
    </div>
  )
}

