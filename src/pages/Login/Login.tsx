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

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {

    event.preventDefault()

    setError("")

    try {

      await signInWithEmailAndPassword(auth, email, password)

      console.log("Inicio de sesión correcto")

    } catch (error) {

      console.error(error)

      setError("Correo o contraseña incorrectos")

    }
  }

  const handleLogout = async () => {

    try {

      await signOut(auth)

      console.log("Sesión cerrada")

    } catch (error) {

      console.error(error)

    }
  }

  return (
    <>
      <Navbar/>

      <main className="login">

        {!user ? (

          <form
            className="loginForm"
            onSubmit={handleLogin}
          >

            <h1 className="loginTitle">
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
              />

            </div>

            {error && (
              <p className="loginError">
                {error}
              </p>
            )}

            <button
              className="btn loginButton"
              type="submit"
            >
              Ingresar
            </button>

          </form>

        ) : (

          <section className="loginForm">

            <h1 className="loginTitle">
              Sesión iniciada
            </h1>

            <p className="loginUser">
              {user.email}
            </p>

            <p className="loginUser">
              Rol: {role}
            </p>

            <button
              className="btn loginButton"
              type="button"
              onClick={handleLogout}
            >
              Cerrar sesión
            </button>

          </section>

        )}

      </main>
    </>
  )
}

export default Login