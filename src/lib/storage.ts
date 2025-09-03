export interface UserData {
  name: string
  email: string
  picture: string
  phone: string
}

export function saveUser(user: UserData): void {
  if (typeof window !== "undefined") {
    localStorage.setItem("user", JSON.stringify(user))
  }
}


export function getUser(): UserData | null {
  if (typeof window !== "undefined") {
    const data = localStorage.getItem("user")
    return data ? (JSON.parse(data) as UserData) : null
  }
  return null
}


export function clearUser(): void {
  if (typeof window !== "undefined") {
    localStorage.removeItem("user")
  }
}
