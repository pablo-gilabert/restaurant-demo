import { useEffect, useState, type ReactNode } from "react"
import { onAuthStateChanged, type User } from "firebase/auth"

import { auth } from "../firebase/auth"
import { AuthContext, type UserRole } from "./AuthContext"

type AuthProviderProps = {
  children: ReactNode
}

// Keeps Firebase authentication and the application role synchronized for the full app tree.
const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null)
  const [role, setRole] = useState<UserRole | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Listens for session changes and loads Firestore only when a signed-in user needs a role lookup.
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser)

      if (!currentUser) {
        setRole(null)
        setLoading(false)
        return
      }

      try {
        const [{ doc, getDoc }, { db }] = await Promise.all([
          import("firebase/firestore"),
          import("../firebase/db")
        ])
        const userDocument = await getDoc(doc(db, "users", currentUser.uid))
        const userRole = userDocument.exists() ? userDocument.data().role : null

        setRole(userRole === "admin" ? "admin" : null)
      } catch (error) {
        console.error("Failed to resolve the authenticated user role:", error)
        setRole(null)
      } finally {
        setLoading(false)
      }
    })

    return unsubscribe
  }, [])

  return (
    <AuthContext.Provider value={{ user, role, loading }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider
