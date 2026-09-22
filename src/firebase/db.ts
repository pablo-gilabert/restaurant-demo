import { getFirestore } from "firebase/firestore"

import { app } from "./app"

// Exposes Firestore only to modules that actually need database access.
export const db = getFirestore(app)
