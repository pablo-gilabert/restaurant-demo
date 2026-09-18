import { Routes } from "react-router-dom"
import { Route } from "react-router-dom"

import Home from "./pages/Home/Home"
import Carta from "./pages/Carta/Carta"

const App = () => {
  return (
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/carta" element={<Carta/>}/>
      </Routes>
  )
}

export default App