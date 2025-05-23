// A collection of common Indian names for generating random users

export const indianFirstNames = [
  "Aarav",
  "Vivaan",
  "Aditya",
  "Vihaan",
  "Arjun",
  "Reyansh",
  "Ayaan",
  "Atharva",
  "Krishna",
  "Ishaan",
  "Shaurya",
  "Advait",
  "Dhruv",
  "Kabir",
  "Ritvik",
  "Aadhya",
  "Ananya",
  "Diya",
  "Kavya",
  "Aanya",
  "Aarohi",
  "Anvi",
  "Myra",
  "Sara",
  "Pari",
  "Aisha",
  "Riya",
  "Ira",
  "Ahana",
  "Divya",
  "Neha",
  "Priya",
  "Saanvi",
  "Aria",
  "Shreya",
]

export const indianLastNames = [
  "Sharma",
  "Verma",
  "Patel",
  "Gupta",
  "Singh",
  "Kumar",
  "Joshi",
  "Shah",
  "Mehta",
  "Chauhan",
  "Agarwal",
  "Malhotra",
  "Kapoor",
  "Yadav",
  "Reddy",
  "Nair",
  "Menon",
  "Iyer",
  "Pillai",
  "Desai",
  "Patil",
  "Jain",
  "Chowdhury",
  "Banerjee",
  "Mukherjee",
  "Das",
  "Chatterjee",
  "Bose",
  "Sengupta",
  "Roy",
]

export function getRandomIndianName(): string {
  const firstName = indianFirstNames[Math.floor(Math.random() * indianFirstNames.length)]
  const lastName = indianLastNames[Math.floor(Math.random() * indianLastNames.length)]
  return `${firstName} ${lastName}`
}

export function generateIndianNames(count: number): string[] {
  const names: string[] = []
  for (let i = 0; i < count; i++) {
    names.push(getRandomIndianName())
  }
  return names
}

