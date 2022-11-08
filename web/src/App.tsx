import { AuthProvider } from "./components/auth_context"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Login from "./pages/Login"
import Menu from "./pages/Menu"
import "./styles/globals.css"
import Home from "./pages/Home"
import About from "./pages/About"
import Pay from "./pages/Pay"
import Footer from "./components/footer"
import Register from "./pages/Register"

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/about" element={<About />} />
          <Route path="/pay" element={<Pay />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
