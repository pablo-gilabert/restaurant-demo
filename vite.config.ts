import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

// Splits stable third-party libraries into cacheable chunks and keeps every production chunk small.
export default defineConfig({
  plugins: [react()],
  build: {
    rolldownOptions: {
      output: {
        codeSplitting: {
          groups: [
            {
              name: "react-vendor",
              test: /node_modules[\\/](react|react-dom|scheduler)[\\/]/,
              priority: 40
            },
            {
              name: "router-vendor",
              test: /node_modules[\\/](react-router|react-router-dom)[\\/]/,
              priority: 35
            },
            {
              name: "firebase-firestore",
              test: /node_modules[\\/]@firebase[\\/]firestore[\\/]/,
              priority: 30,
              maxSize: 450 * 1024
            },
            {
              name: "firebase-auth",
              test: /node_modules[\\/]@firebase[\\/](auth|app|component|logger|util)[\\/]/,
              priority: 25,
              maxSize: 450 * 1024
            },
            {
              name: "firebase-vendor",
              test: /node_modules[\\/](@firebase|firebase)[\\/]/,
              priority: 20,
              maxSize: 450 * 1024
            },
            {
              name: "vendor",
              test: /node_modules[\\/]/,
              priority: 10,
              entriesAware: true,
              maxSize: 450 * 1024
            }
          ]
        }
      }
    }
  }
})
