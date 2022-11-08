import { BrowserRouter, Route, Routes } from "react-router-dom"
import { AuthProvider } from "./components/auth_context"
import Home from "./pages/Home"
import Login from "./pages/Login"
import Menu from "./pages/Menu"
import Pay from "./pages/Pay"
import Register from "./pages/Register"
import "./styles/globals.css"

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/pay" element={<Pay />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
