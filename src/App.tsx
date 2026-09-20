import {
  Route,
  Routes,
  useLocation,
} from "react-router-dom"

import ScrollToTop from "./components/ScrollToTop/ScrollToTop"

import Home from "./pages/Home/Home"
import Menu from "./pages/Menu/Menu"
import Reservations from "./pages/Reservations/Reservations"
import About from "./pages/About/About"
import Login from "./pages/Login/Login"

const App = () => {
  const location = useLocation()

  return (
    <>
      <ScrollToTop />

      <Routes location={location} key={location.key}>

        <Route path="/" element={<Home/>}/>

        <Route path="/menu" element={<Menu/>}/>

        <Route path="/reservations" element={<Reservations/>}/>

        <Route path="/about" element={<About/>}/>

        <Route path="/login" element={<Login/>}/>

      </Routes>
    </>
  )
}

export default App