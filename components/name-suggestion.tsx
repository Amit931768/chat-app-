"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { indianFirstNames, indianLastNames } from "@/lib/indian-names"

interface NameSuggestionProps {
  onSelect: (name: string) => void
}

export default function NameSuggestion({ onSelect }: NameSuggestionProps) {
  const [suggestions, setSuggestions] = useState<string[]>([])

  useEffect(() => {
    // Generate 3 random name suggestions
    generateSuggestions()
  }, [])

  const generateSuggestions = () => {
    const newSuggestions: string[] = []

    for (let i = 0; i < 3; i++) {
      const firstName = indianFirstNames[Math.floor(Math.random() * indianFirstNames.length)]
      const lastName = indianLastNames[Math.floor(Math.random() * indianLastNames.length)]
      newSuggestions.push(`${firstName} ${lastName}`)
    }

    setSuggestions(newSuggestions)
  }

  return (
    <div className="mt-2">
      <p className="text-xs text-slate-500 dark:text-slate-400 mb-2">Suggested names:</p>
      <div className="flex flex-wrap gap-2">
        {suggestions.map((name, index) => (
          <Button key={index} variant="outline" size="sm" onClick={() => onSelect(name)} className="text-xs">
            {name}
          </Button>
        ))}
        <Button variant="ghost" size="sm" onClick={generateSuggestions} className="text-xs">
          More
        </Button>
      </div>
    </div>
  )
}

