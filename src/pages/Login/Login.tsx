import {
  useContext,
  useState,
} from "react"

import {
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth"

import Footer from "../../components/Footer/Footer"
import Navbar from "../../components/Navbar/Navbar"
import SEO from "../../components/SEO/SEO"

import {
  AuthContext,
} from "../../context/AuthContext"

import { auth } from "../../firebase/config"

import "./_login.scss"

const Login = () => {

  const {
    user,
    role,
  } = useContext(AuthContext)

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleLogin = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {

    event.preventDefault()

    if (loading) {
      return
    }

    setError("")
    setLoading(true)

    try {

      await signInWithEmailAndPassword(auth, email, password)

      console.log("Inicio de sesión correcto")

    } catch (error) {

      console.error(error)

      setError("Correo o contraseña incorrectos")

    } finally {

      setLoading(false)

    }
  }

  const handleLogout = async () => {

    if (loading) {
      return
    }

    setError("")
    setLoading(true)

    try {

      await signOut(auth)

      console.log("Sesión cerrada")

    } catch (error) {

      console.error(error)

      setError("No se pudo cerrar la sesión. Intentá nuevamente.")

    } finally {

      setLoading(false)

    }
  }

  return (
    <>

      <SEO
        title="Iniciar sesión | Mathilde Resto"
        description="Iniciá sesión en Mathilde Resto."
      />

      <Navbar/>

      <main className="login">

        {!user ? (

          <form
            className="loginForm"
            onSubmit={handleLogin}
            aria-labelledby="loginTitle"
          >

            <h1
              className="loginTitle"
              id="loginTitle"
            >
              Iniciar sesión
            </h1>

            <div className="mb-3">

              <label
                className="form-label"
                htmlFor="email"
              >
                Correo electrónico
              </label>

              <input
                className="form-control loginInput"
                type="email"
                id="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="Ingresá tu correo"
                autoComplete="email"
                required
                aria-invalid={Boolean(error)}
                aria-describedby={error ? "loginError" : undefined}
              />

            </div>

            <div className="mb-3">

              <label
                className="form-label"
                htmlFor="password"
              >
                Contraseña
              </label>

              <input
                className="form-control loginInput"
                type="password"
                id="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="Ingresá tu contraseña"
                autoComplete="current-password"
                required
                aria-invalid={Boolean(error)}
                aria-describedby={error ? "loginError" : undefined}
              />

            </div>

            {error && (
              <p
                className="loginError"
                id="loginError"
                role="alert"
              >
                {error}
              </p>
            )}

            <button
              className="btn loginButton"
              type="submit"
              disabled={loading}
              aria-busy={loading}
            >
              {loading ? "Ingresando..." : "Ingresar"}
            </button>

          </form>

        ) : (

          <section
            className="loginForm"
            aria-labelledby="sessionTitle"
          >

            <h1
              className="loginTitle"
              id="sessionTitle"
            >
              Sesión iniciada
            </h1>

            <p className="loginUser">
              {user.email}
            </p>

            <p className="loginUser">
              Rol: {role}
            </p>

            {error && (
              <p
                className="loginError"
                role="alert"
              >
                {error}
              </p>
            )}

            <button
              className="btn loginButton"
              type="button"
              onClick={handleLogout}
              disabled={loading}
              aria-busy={loading}
            >
              {loading ? "Cerrando sesión..." : "Cerrar sesión"}
            </button>

          </section>

        )}

      </main>

      <Footer/>
    </>
  )
}

export default Login