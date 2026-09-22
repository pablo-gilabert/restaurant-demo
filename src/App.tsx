import { lazy, Suspense } from "react"
import { Route, Routes } from "react-router-dom"

import ScrollToTop from "./components/ScrollToTop/ScrollToTop"

const Home = lazy(() => import("./pages/Home/Home"))
const Menu = lazy(() => import("./pages/Menu/Menu"))
const Reservations = lazy(() => import("./pages/Reservations/Reservations"))
const About = lazy(() => import("./pages/About/About"))
const Login = lazy(() => import("./pages/Login/Login"))
const Admin = lazy(() => import("./pages/Admin/Admin"))
const NotFound = lazy(() => import("./pages/NotFound/NotFound"))

// Defines the application routes and lazy-loads each page to reduce the initial bundle.
const App = () => {
  return (
    <>
      <ScrollToTop/>

      <Suspense fallback={<p role="status">Cargando...</p>}>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/menu" element={<Menu/>}/>
          <Route path="/reservations" element={<Reservations/>}/>
          <Route path="/about" element={<About/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/admin" element={<Admin/>}/>
          <Route path="*" element={<NotFound/>}/>
        </Routes>
      </Suspense>
    </>
  )
}

export default App
