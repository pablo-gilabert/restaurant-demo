import { useContext } from "react"

import { AuthContext } from "./AuthContext"

// Provides a typed shortcut for components that consume authentication state.
export const useAuth = () => useContext(AuthContext)
