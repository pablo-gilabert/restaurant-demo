import Footer from "../../components/Footer/Footer"
import Navbar from "../../components/Navbar/Navbar"

import "./_login.scss"

const Login = () => {
  return (
    <>
      <Navbar/>

      <main className="login">

        <form className="loginForm">

          <h1 className="loginTitle">Iniciar sesión</h1>

          <div className="mb-3">

            <label className="form-label" htmlFor="username">Nombre de usuario</label>

            <input
              className="form-control loginInput"
              type="text"
              id="username"
              placeholder="Ingresá tu usuario"/>

          </div>

          <div className="mb-3">

            <label className="form-label" htmlFor="password">Contraseña</label>

            <input
              className="form-control loginInput"
              type="password"
              id="password"
              placeholder="Ingresá tu contraseña"
            />

          </div>

          <button className="btn loginButton" type="submit">Ingresar</button>
        </form>
      </main>
      <Footer/>
    </>
  )
}

export default Login