import { Route, Routes } from "react-router-dom"

import Home from "./pages/Home/Home"
import Menu from "./pages/Menu/Menu"
import Reservations from "./pages/Reservations/Reservations"
import About from "./pages/About/About"

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/menu" element={<Menu />} />
      <Route path="/reservations" element={<Reservations />} />
      <Route path="/about" element={<About />} />
    </Routes>
  )
}

export default App