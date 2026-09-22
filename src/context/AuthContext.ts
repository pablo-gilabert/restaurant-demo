import { createContext } from "react"
import type { User } from "firebase/auth"

export type UserRole = "admin"

export type AuthContextType = {
  user: User | null
  role: UserRole | null
  loading: boolean
}

// Stores the authenticated Firebase user and the application role resolved from Firestore.
export const AuthContext = createContext<AuthContextType>({
  user: null,
  role: null,
  loading: true
})
