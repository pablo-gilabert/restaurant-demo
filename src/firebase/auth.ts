import { getAuth } from "firebase/auth"

import { app } from "./app"

// Exposes the authentication service without eagerly importing Firestore.
export const auth = getAuth(app)
