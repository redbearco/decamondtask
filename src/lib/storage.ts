import { UserData } from "@/types/user";

const USER_KEY = "user";

export function saveUser(user: UserData): void {
  if (typeof window !== "undefined") {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  }
}

export function getUser(): UserData | null {
  if (typeof window !== "undefined") {
    const data = localStorage.getItem(USER_KEY);
    return data ? (JSON.parse(data) as UserData) : null;
  }
  return null;
}

export function clearUser(): void {
  if (typeof window !== "undefined") {
    localStorage.removeItem(USER_KEY);
  }
}
