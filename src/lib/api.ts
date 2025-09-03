import { UserData } from "@/types/user"

export async function fetchUser(phone: string): Promise<UserData> {
  const res = await fetch("https://randomuser.me/api/?results=1&nat=us")
  if (!res.ok) {
    throw new Error("failed")
  }

  const data = await res.json()
  const user = data.results[0]

  return {
    name: `${user.name.first} ${user.name.last}`,
    email: user.email,
    picture: user.picture.medium,
    phone,
  }
}
