import {
  createContext,
  useEffect,
  useState,
} from "react"

import {
  onAuthStateChanged,
  type User,
} from "firebase/auth"

import {
  doc,
  getDoc,
} from "firebase/firestore"

import { auth, db } from "../firebase/config"

type AuthContextType = {
  user: User | null
  role: string | null
  loading: boolean
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  role: null,
  loading: true,
})

type AuthProviderProps = {
  children: React.ReactNode
}

export const AuthProvider = ({ children }: AuthProviderProps) => {

  const [user, setUser] = useState<User | null>(null)
  const [role, setRole] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {

    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {

      setUser(currentUser)

      if (!currentUser) {

        setRole(null)
        setLoading(false)

        return
      }

      try {

        const userDocument = await getDoc(
          doc(db, "users", currentUser.uid)
        )

        if (userDocument.exists()) {

          setRole(userDocument.data().role)

        } else {

          setRole(null)

        }

      } catch (error) {

        console.error("Error al obtener el rol:", error)

        setRole(null)

      }

      setLoading(false)

    })

    return () => {
      unsubscribe()
    }

  }, [])

  return (
    <AuthContext.Provider value={{ user, role, loading }}>
      {children}
    </AuthContext.Provider>
  )
}