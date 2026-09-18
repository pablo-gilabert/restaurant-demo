import { Routes } from "react-router-dom"
import { Route } from "react-router-dom"

import Inicio from "./pages/Inicio/Inicio"
import Carta from "./pages/Carta/Carta"
import Reservaciones from "./pages/Reservaciones/Reservaciones"
import Nosotros from "./pages/Nosotros/Nosotros"

const App = () => {
  return (
      <Routes>
        <Route path="/" element={<Inicio/>}/>
        <Route path="/carta" element={<Carta/>}/>
        <Route path="/reservaciones" element={<Reservaciones/>}/>
        <Route path="/nosotros" element={<Nosotros/>}/>
      </Routes>
  )
}

export default App